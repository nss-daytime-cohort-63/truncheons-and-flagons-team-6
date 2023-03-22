import { getTeams } from "./dataAccess.js";
import { sendScore, sendCompletedGame, getCompletedGames } from "./dataAccess.js";


//Initializing base values
let scoreData = {};

let currentRound = 1;
let team1Id = 0;
let team2Id = 0;
let team3Id = 0;

export const roundForm = (team1, team2, team3) => {
  //taking the teams and assigning them in the global scope after import
  team1Id = team1;
  team2Id = team2;
  team3Id = team3;


  //Get all teams, find the matching teams name from the ID
  const teams = getTeams();
  const team1Name = teams.find((team) => team.id === team1).name;
  const team2Name = teams.find((team) => team.id === team2).name;
  const team3Name = teams.find((team) => team.id === team3).name;


  //Generate the Header row of our score keeping table
  let html = `
    <table id="gameScore">
        <tr id="gameScoreHeader">
            <th>Round Number</th>
            <th>${team1Name}</th>
            <th>${team2Name}</th>
            <th>${team3Name}</th>
            <th>Submit Round</th>
        </tr>
    </table>
        `;

  //
  return html;
};

//This function creates the row that is actively editable at any given point.
export const inputRowGenerator = (round) => {
  let html = "<tr>";
  html += `<td>${round}</td>`;

  for (let i = 1; i < 4; i++) {
    html += `<td><input id="round--${round}" name="team--${i}" type="number" min="0" max="6" /></td>`;
  }

  html += `<td><input type="button" id="submitRound" /></td> `;

  html += "</tr>";
  return html;
};

//This function creates an uneditable row based on past rounds.
const pastRoundRowGenerator = (round) => {
  let html = `
    <tr>
    <td>${round}</td>
    <td>${scoreData[round]["team1"]}</td>
    <td>${scoreData[round]["team2"]}</td>
    <td>${scoreData[round]["team3"]}</td>
    <td></td>
    </tr>
    `;

  return html;
};



mainContainer.addEventListener("click", (clickEvent) => {

  //If the submit round button is pushed...
  if (clickEvent.target.id === "submitRound") {
    const renderHTML = document.querySelector("#renderedData");

    //Parse values of inputs and assign them as the proper team's score
    const team1Score = parseInt(
      document.querySelector("input[name='team--1']").value
    );
    const team2Score = parseInt(
      document.querySelector("input[name='team--2']").value
    );
    const team3Score = parseInt(
      document.querySelector("input[name='team--3']").value
    );

    // Make an object out of the user input
    const dataToSendToSavedScores = {
      team1: team1Score,
      team2: team2Score,
      team3: team3Score,
    };


    //Send the scores to our temporary score object
    scoreData[currentRound] = dataToSendToSavedScores;
    //Add the header back to the innerHTML where it previously was (we full regenerate the html content)
    renderHTML.innerHTML = roundForm(team1Id, team2Id, team3Id);

    //Loop through the rounds and generate a past round row for each played round
    for (let i = 1; i <= currentRound; i++) {
      const gameScore = document.querySelector("#gameScore");

      gameScore.innerHTML += pastRoundRowGenerator(i);
    }
    //update the current round to the new round's value
    currentRound++;
    //if the current round is 1-3, create an input row since they still have scores to imput
    if(currentRound < 4){
        gameScore.innerHTML += inputRowGenerator(currentRound);
    }
    //if the current round is 4, add the submit game button
    if (currentRound === 4) {
      renderHTML.innerHTML += `<button name="submitGame" id="submitGame">Submit Game </button>`;
    }
  }
//if the submit game is pressed...
  if (clickEvent.target.id === "submitGame") {
    //Initialize the final cumulative scores to 0
    let team1FinalScore = 0
    let team2FinalScore = 0
    let team3FinalScore = 0

    //Loop through each round and add each teams score to the proper variable each loop.
    for(let i = 1; i < 4; i++){
        team1FinalScore += scoreData[i].team1
        team2FinalScore += scoreData[i].team2
        team3FinalScore += scoreData[i].team3
    }

    //get the new completedGameId from the length of completed games
    let newGameId = getCompletedGames().length

    //completion just needs a date and Id, generated here
    let completion = {
        date: new Date().toLocaleDateString("en-us")
    }

    let compGameId = newGameId
    
    //create score objects to send to database per team
    let scoreToSend1 = {
        completedGameId: compGameId,
        teamId: team1Id,
        score: team1FinalScore
    }
    let scoreToSend2 = {
        completedGameId: compGameId,
        teamId: team2Id,
        score: team2FinalScore
    }
    let scoreToSend3 = {
        completedGameId: compGameId,
        teamId: team3Id,
        score: team3FinalScore
    }

    //send the completed game to the completedGame database, send the scores to the Scores database.
    sendCompletedGame(completion)
    .then(()=> {sendScore(scoreToSend1)})
    .then(()=> {sendScore(scoreToSend2)})
    .then(()=> {sendScore(scoreToSend3)})
    .then(()=> {mainContainer.dispatchEvent(new CustomEvent("stateChanged"))})

    scoreData = {};

    currentRound = 1;
    team1Id = 0;
    team2Id = 0;
    team3Id = 0;
  }


});

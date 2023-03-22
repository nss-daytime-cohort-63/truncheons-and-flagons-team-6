import { getTeams } from "./dataAccess.js";
import { sendScore, sendCompletedGame, getCompletedGames } from "./dataAccess.js";

let scoreData = {};

let currentRound = 1;
let team1Id = 0;
let team2Id = 0;
let team3Id = 0;

export const roundForm = (team1, team2, team3) => {
  team1Id = team1;
  team2Id = team2;
  team3Id = team3;

  const teams = getTeams();
  const team1Name = teams.find((team) => team.id === team1).name;
  const team2Name = teams.find((team) => team.id === team2).name;
  const team3Name = teams.find((team) => team.id === team3).name;

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
  if (clickEvent.target.id === "submitRound") {
    const renderHTML = document.querySelector("#renderedData");
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

    scoreData[currentRound] = dataToSendToSavedScores;
    renderHTML.innerHTML = roundForm(team1Id, team2Id, team3Id);
    for (let i = 1; i <= currentRound; i++) {
      const gameScore = document.querySelector("#gameScore");

      gameScore.innerHTML += pastRoundRowGenerator(i);
    }

    currentRound++;
    if(currentRound < 4){
        gameScore.innerHTML += inputRowGenerator(currentRound);
    }

    if (currentRound === 4) {
      renderHTML.innerHTML += `<button name="submitGame" id="submitGame">Submit Game </button>`;
      console.log(scoreData)
    }
  }

  if (clickEvent.target.id === "submitGame") {
    let team1FinalScore = 0
    let team2FinalScore = 0
    let team3FinalScore = 0


    for(let i = 1; i < 4; i++){
        team1FinalScore += scoreData[i].team1
        team2FinalScore += scoreData[i].team2
        team3FinalScore += scoreData[i].team3
    }

    let newGameId = getCompletedGames().length

    let completion = {
        date: new Date().toLocaleDateString("en-us")
    }

    let compGameId = newGameId
    
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
    sendCompletedGame(completion)
    .then(()=> {sendScore(scoreToSend1)})
    .then(()=> {sendScore(scoreToSend2)})
    .then(()=> {sendScore(scoreToSend3)})
    .then(()=> {mainContainer.dispatchEvent(new CustomEvent("stateChanged"))})
  }
});

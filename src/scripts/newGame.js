import { getTeams } from "./dataAccess.js"

let team1 = 0;
let team2 = 0;
let team3 = 0;

const _teamSelectOptionBuilder = () => {
    const teams = getTeams();
    let html = "";
    teams.forEach(team => {
        if (team.id !== 0) {
            html += `<option value="${team.id}">${team.name}</option>`
        }
    })
    return html;
}


export const NewGame = () => {
    const html = `
        <button id="newGame" class="navButton">New Game</button>
    `
    return html
}

export const newGameForm = () => {
    let html =`<select id="team1Select" >
                    <option value="">Select Team 1</option>
                     ${_teamSelectOptionBuilder()}
                </select>
                <select id="team2Select" >
                    <option value="">Select Team 2</option>
                    ${_teamSelectOptionBuilder()}
                </select>
                <select id="team3Select" >
                    <option value="">Select Team 3</option>
                    ${_teamSelectOptionBuilder()}
                </select>
                <button id="startGame" >Start Game</div>`
        return html;
}

const mainContainer = document.querySelector("#mainContainer")

/* mainContainer.addEventListener("click", clickEvent => {
    if (clickEvent.target.id === "newGame") {
        document.getElementById("team1Select").className = "shown";
        document.getElementById("team2Select").className = "shown";
        document.getElementById("team3Select").className = "shown";
        document.getElementById("startGame").className = "shown";
    }
})
*/
mainContainer.addEventListener("click", clickEvent => {
    if (clickEvent.target.id === "startGame") {
        if(team1 !== 0 && team1 !== team2 && team1 !== team3 && team2 !== 0 && team3 !== 0 && !!team1 && !!team2 && !!team3 && team2 !== team3){
            console.log(":)")
        }
        else{
            window.alert("You must select unique teams to start a game!")
        }
    }
})


mainContainer.addEventListener("click", clickEvent => {
    if (clickEvent.target.id === "newGame") {
       const renderedData = document.querySelector("#renderedData")
        renderedData.innerHTML = newGameForm()
 
    }
})

mainContainer.addEventListener("change", event=>{
    if(event.target.id === "team1Select"){
        team1 = parseInt(document.getElementById("team1Select").value)
    }
    else if(event.target.id === "team2Select"){
        team2 = parseInt(document.getElementById("team2Select").value)
    }
    else if(event.target.id === "team3Select"){
        team3 = parseInt(document.getElementById("team3Select").value)
    }
    
})
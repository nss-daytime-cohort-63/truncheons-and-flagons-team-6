import { getTeams } from "./dataAccess.js"

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
        <button id="newGame">New Game</button>
    `
    return html
}

export const newGameForm = () => {
    let html =`<select id="team1Select" class="hidden">
                    <option value="">Select Team 1</option>
                     ${_teamSelectOptionBuilder()}
                </select>
                <select id="team2Select" class="hidden">
                    <option value="">Select Team 2</option>
                    ${_teamSelectOptionBuilder()}
                </select>
                <select id="team3Select" class="hidden">
                    <option value="">Select Team 3</option>
                    ${_teamSelectOptionBuilder()}
                </select>
                <button id="startGame" class="hidden">Start Game</div>`
        return html;
}

const mainContainer = document.querySelector("#mainContainer")

mainContainer.addEventListener("click", clickEvent => {
    if (clickEvent.target.id === "newGame") {
        document.getElementById("team1Select").className = "shown";
        document.getElementById("team2Select").className = "shown";
        document.getElementById("team3Select").className = "shown";
        document.getElementById("startGame").className = "shown";
    }
})

mainContainer.addEventListener("click", clickEvent => {
    if (clickEvent.target.id === "startGame") {
        document.getElementById("team1Select").className = "hidden";
        document.getElementById("team2Select").className = "hidden";
        document.getElementById("team3Select").className = "hidden";
        document.getElementById("startGame").className = "hidden";
    }
})
import { getTeams } from "./dataAccess.js"

const _teamSelectOptionBuilder = () => {
    const teams = getTeams();
    return teams.forEach(team => {return `<option value="${team.id}">${team.name}</option>`})
}

export const NewGame = () => {
    const html = `
    <button id="newGame">New Game</button>
    <select id="team1Select" class="hidden">
        <option value="">Select a Team</option>
        ${_teamSelectOptionBuilder()}
    </select>
    `

    return html
}
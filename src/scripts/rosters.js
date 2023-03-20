import { getPlayers, getTeams } from "./dataAccess.js"
import { allTeams } from "./teams.js"


// button created
export const Rosters = () => {
    const html = `
    <button id="rosters">Rosters</button>
    `
    return html
}





// gets an unordered list of players on the team -- needs to be rewritten
export const playersTeam = () => {
    const players = getPlayers()
    const teams = getTeams()
    let html = `<ul>`
    for (const player of players) {
        for (const team of teams) {
            if (player.teamId === team.id) {
                html += `<li>${player.name}</li>`
            }
        }
    }
    html += `</ul>`
    return html
}

export const teamDisplay = () => {
    const teams = allTeams() // using the imported all teams dropdown
    let html = `<h2>Select a Team</h2>`
    html += `${teams}` // imported teams dropdown
    html += `${playersTeam()}` // list of players on the team
    return html
}

const mainContainer = document.querySelector("#mainContainer")
// const renderHTML = document.querySelector("#renderedData")

// click event not yet fleshed out - query select same div 
mainContainer.addEventListener("click", clickEvent => {
    if (clickEvent.target.id === "rosters") {
        // render the entire page 
        mainContainer.innerHTML = teamDisplay()
    }
    })


// change event - not yet fleshed out - query select updates html innerHTML to ID renderedData - second function
mainContainer.addEventListener("change", changeEvent => {
    if (changeEvent.target.id === "teams") {
        // lists roster for that team
        mainContainer.innerHTML = teamDisplay()
    }
})

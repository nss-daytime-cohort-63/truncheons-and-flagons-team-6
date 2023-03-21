import { getPlayers, getTeams } from "./dataAccess.js"
import { allTeams } from "./teams.js"


// button created
export const Rosters = () => {
    const html = `
    <button id="rosters" class="navButton">Rosters</button>
    `
    return html
}





// gets an unordered list of players on the team -- needs to be rewritten
export const playersTeam = () => {
    const players = getPlayers()
    let currentTeam = 0
    if(!document.querySelector(".rosterDropdown")){
         currentTeam = 0
    }else{
         currentTeam = parseInt(document.querySelector(".rosterDropdown").value)
    }

    //let currentTeam = parseInt(document.querySelector(".rosterDropdown").value)
    let html = `<div id="team-players"><ul>` // need if statement
    for (const player of players) {
        
            if (player.teamId === currentTeam) {
                html += `<li>${player.name}</li>`
            }
        
    }
    html += `</ul></div>`
    return html
}

export const teamDisplay = () => {
    const teams = allTeams("rosterDropdown") // using the imported all teams dropdown
    let html = `<h2>Select a Team</h2>`
    html += `${teams}` // imported teams dropdown
    html += `${playersTeam()}` // list of players on the team
    return html
}

const mainContainer = document.querySelector("#mainContainer")

// click event - query select same div 
mainContainer.addEventListener("click", clickEvent => {
    if (clickEvent.target.id === "rosters") {
        // render the entire page 
        const renderHTML = document.querySelector("#renderedData")
        renderHTML.innerHTML = teamDisplay()
    }
    })


// change event - not yet fleshed out - query select updates html innerHTML to ID renderedData - second function
mainContainer.addEventListener("change", changeEvent => {
    if (changeEvent.target.className === "rosterDropdown") {
        // lists roster for that team
        const renderHTML = document.querySelector("#team-players")
        renderHTML.innerHTML = playersTeam()
    }
})

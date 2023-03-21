import { getTeams, sendTeam } from "./dataAccess.js";



export const allTeams = (newClass) => {
const teams = getTeams()
let html =`<select id="teams">`
let teamsList = teams.map((team)=>{
    return `<option value ="${team.id} class=${newClass}">${team.name}</option>`
})
html += teamsList.join('')
html += `</select>`
return html




}

export const AddTeam = () => {
    let html = `<h2>New Team</h2>
        <div class = "field">
            <input class = "input" name = "teamName" type = "text" placeholder="Team name"/>
        </div>
        <button class="button" id="submitNewTeam">Add Team</button>
    `

    return html

}


const mainContainer = document.querySelector("#mainContainer")
mainContainer.addEventListener("click", clickEvent => {
    if (clickEvent.target.id === "submitNewTeam") {
        // Get what the user typed into the form fields
        const newTeamName = document.querySelector("input[name='teamName']").value
       
        // Make an object out of the user input
        const dataToSendToAPI = {
            name: newTeamName,
            dateCreated: Date.now()


        }

        // Send the data to the API for permanent storage
        sendTeam(dataToSendToAPI)
    }
})
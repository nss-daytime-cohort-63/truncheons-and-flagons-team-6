import { allTeams } from "./teams.js"
import { sendPlayer } from "./dataAccess.js"
const mainContainer = document.querySelector("#mainContainer")


export const AddPlayer = () => {
    let html = `<h2>New Player</h2>
        <div class = "field">
            <input class = "input" name = "PfirstName" type = "text" placeholder="First Name"/>
        </div>
        <div class = "field">
            <input class = "input" name = "PlastName" type = "text" placeholder="Last Name"/>
        </div>
        <div class = "field">
        ${allTeams()}
        </div>
        <button class="button" id="submitNewPlayer">Add Player</button>
    `

    return html

}



mainContainer.addEventListener("click", clickEvent => {
    if (clickEvent.target.id === "submitNewPlayer") {
        // Get what the user typed into the form fields
        const newFirstName = document.querySelector("input[name='PfirstName']").value
        const newLastName = document.querySelector("input[name='PlastName']").value
        const playerTeamId = parseInt(document.querySelector("select[id='teams']").value)
        
       
        // Make an object out of the user input
        const dataToSendToAPI = {
            name: `${newFirstName} ${newLastName}`,
            teamId: playerTeamId,
            isActive: false


        }

        // Send the data to the API for permanent storage
        sendPlayer(dataToSendToAPI)
    }
})
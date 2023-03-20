import { getTeams } from "./dataAccess.js";

export const allTeams =() =>{
const teams = getTeams()
let html =`<select id="teams">`
let teamsList = teams.map((team)=>{
    return `<option value ="${team.id}">${team.name}</option>`
})
html += teamsList.join('')
html += `</select>`
return html




}
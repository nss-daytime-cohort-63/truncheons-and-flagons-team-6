import { getTeams, getScores, getPlayers } from "./dataAccess.js"
export const leaderBoard =() =>{
    let html =  `
    <h2>Leaderboard</h2>
    <table>
    <tr>
    <th>Team Name</th>
    <th># of Members</th>
    <th>Total Score</th>
    </tr>
    ${renderLeaderBoard()}
    </table> `

    return html
}
export const renderLeaderBoard =()=>{
    let html = ''
    const teams = getTeams()
    const scores = getScores()
    const players = getPlayers()
    const teamData = []
    teams.forEach(team => {
        let totalScore = 0
        let totalPlayers = 0
        scores.forEach(score => {
            if(team.id === score.teamId){
                totalScore += score.score
            }
        });
        players.forEach(player => {
            if (team.id === player.teamId){
                totalPlayers ++
            }
        });
        if(totalScore > 0){
            teamData.push({
                name: team.name,
                totalPlayers: totalPlayers,
                totalScore: totalScore
            })
        }
    });

    // sort the teamData array by totalScore in descending order
    teamData.sort((a, b) => b.totalScore - a.totalScore)

    // create the HTML for the table rows
    teamData.forEach(team => {
        html += `<tr><td>${team.name}</td><td>${team.totalPlayers}</td><td>${team.totalScore}</td></tr>`
    })

    return html
}
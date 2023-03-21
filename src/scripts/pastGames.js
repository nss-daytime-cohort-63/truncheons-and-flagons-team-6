import { getTeams, getScores, getCompletedGames } from "./dataAccess.js"

export const PastGames = () => {
    const html = `
    <button id="pastGames">Past Games</button>
    `

    return html
}

export const renderPastGames = () =>{
    let html = '<h2>Past Games</h2><table><tr><th>Date</th><th>Team 1</th><th>Score</th><th>Team 2</th><th>Score</th><th>Team 3</th><th>Score</th></tr>'

    const teams = getTeams()
    const scores = getScores()
    const completedGames = getCompletedGames()
    completedGames.forEach(game => {
        html += `<tr><td>${game.date}</td>`
        scores.forEach(score =>{
            if (game.id === score.completedGameId){
                teams.forEach(team => {
                    if(team.id === score.teamId){
                        html += `<td>${team.name}</td><td>${score.score}</td>`
                    }
                });
            }
        })
        html += '</tr>'
    })
    
    return html
}


mainContainer.addEventListener("click", clickEvent => {
    if (clickEvent.target.id === "pastGames") {
       const renderedData = document.querySelector("#renderedData")
        renderedData.innerHTML = renderPastGames()
 
    }
})
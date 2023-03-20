import { getTeams, getScores, getCompletedGames } from "./dataAccess.js"

export const PastGames = () => {
    const html = `
    <button id="pastGames">Past Games</button>
    `

    return html
}

export const renderPastGames = () =>{
    const html = '<h2>Leaderboard</h2><table><tr><th>Date</th><th>Team 1</th><th>Score</th><th>Team 2</th><th>Score</th><th>Team 3</th><th>Score</th></tr>'

    const teams = getTeams()
    const scores = getScores()
    const completedGames = getCompletedGames()
    completedGames.forEach(game => {

        
    });
}
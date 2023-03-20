import { renderPastGames } from "./pastGames.js"
import { AddPlayer } from "./players.js"
import { AddTeam } from "./teams.js"



export const TruncheonAndFlagons = () => {
    
    return  `
<nav id="selectionOptions">
    <div id="newGame">
    </div>
    <div id="rosters">
    </div>
    <div id="pastGames">
    </div>
</nav>

<main id="contentBody">
    <aside id="leftColumn">
        <div id="addTeam">
        ${AddTeam()}
        </div>
        <div id="addPlayer">
        ${AddPlayer()}
        </div>
        <div id="leaderboard">
        </div>
    </aside>
    <section id="renderedData">
    </section>
</main>`


}
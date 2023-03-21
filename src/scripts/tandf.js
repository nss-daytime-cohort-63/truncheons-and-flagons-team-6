import { NewGame, newGameForm } from "./newGame.js"
import { PastGames, renderPastGames } from "./pastGames.js"
import { AddPlayer } from "./players.js"
import { Rosters } from "./rosters.js"
import { AddTeam } from "./teams.js"



export const TruncheonAndFlagons = () => {
    
    return  `
    <h1> Truncheons & Flagons Official League</h1>
<nav id="selectionOptions">
    <div id="newGame">
    ${NewGame()}
    </div>
    <div id="rosters">
    ${Rosters()}
    </div>
    <div id="pastGames">
    ${PastGames()}
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
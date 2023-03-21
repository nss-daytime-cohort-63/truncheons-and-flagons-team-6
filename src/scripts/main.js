import { fetchPlayers, fetchTeams, fetchScores, fetchCompletedGames } from "./dataAccess.js"
import { TruncheonAndFlagons } from "./tandf.js"



const mainContainer = document.querySelector("#mainContainer")
const renderHTML = document.querySelector("#renderedData")

const render = () => {
    fetchPlayers()
        .then(() => fetchTeams())
        .then(() => fetchScores() )
        .then(() => fetchCompletedGames() )
        .then(
            () => {
                mainContainer.innerHTML = TruncheonAndFlagons()
            }
        )
}

render()

mainContainer.addEventListener(
    "stateChanged",
    customEvent => {
        render()
    }
)



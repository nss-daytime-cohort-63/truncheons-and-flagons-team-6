import { NewGame } from "./currentGame.js";
import { fetchCompletedGames, fetchPlayers, fetchScores, fetchTeams } from "./dataAccess.js";

fetchPlayers().then(() => fetchTeams()).then(() => fetchCompletedGames()).then(() => fetchScores())
document.querySelector(".mainContainer").innerHTML = NewGame()
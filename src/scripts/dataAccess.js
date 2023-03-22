const applicationState = {}
const API = "http://localhost:8088"

export const fetchPlayers = () => {
    return fetch(`${API}/players`)
        .then(response => response.json())
        .then(
            (returnedPlayers) => {
                // Store the external state in application state
                applicationState.players = returnedPlayers
            }
        )
}
export const fetchTeams = () => {
    return fetch(`${API}/teams`)
        .then(response => response.json())
        .then(
            (returnedTeams) => {
                // Store the external state in application state
                applicationState.teams = returnedTeams
            }
        )
}
export const fetchScores = () => {
    return fetch(`${API}/scores`)
        .then(response => response.json())
        .then(
            (returnedScores) => {
                // Store the external state in application state
                applicationState.scores = returnedScores
            }
        )
}
export const fetchCompletedGames = () => {
    return fetch(`${API}/completedGames`)
        .then(response => response.json())
        .then(
            (returnedCompletedGames) => {
                // Store the external state in application state
                applicationState.completedGames = returnedCompletedGames
            }
        )
}
export const sendPlayer = (newPlayer) => {
    const fetchOptions = {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(newPlayer)
    }


    return fetch(`${API}/players`, fetchOptions)
    .then(response => response.json())
    .then(() => {
        mainContainer.dispatchEvent(new CustomEvent("stateChanged"))
    })
}
export const changeTeam = (player) => {
    const fetchOptions = {
        method: "PUT",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(player)
    }


    return fetch(`${API}/players/${player.id}`, fetchOptions)
    .then(response => response.json())
    .then(() => {
        mainContainer.dispatchEvent(new CustomEvent("stateChanged"))
    })
}
export const sendTeam = (newTeam) => {
    const fetchOptions = {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(newTeam)
    }


    return fetch(`${API}/teams`, fetchOptions)
    .then(response => response.json())
    .then(() => {
        mainContainer.dispatchEvent(new CustomEvent("stateChanged"))
    })
}
export const sendScore = (newScore) => {
    const fetchOptions = {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(newScore)
    }


    return fetch(`${API}/scores`, fetchOptions)
    .then(response => response.json())
    .then(() => {
        mainContainer.dispatchEvent(new CustomEvent("stateChanged"))
    })
}
export const sendCompletedGame = (newCompletedGame) => {
    const fetchOptions = {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(newCompletedGame)
    }


    return fetch(`${API}/completedGames`, fetchOptions)
    .then(response => response.json())
    .then(() => {
        mainContainer.dispatchEvent(new CustomEvent("stateChanged"))
    })
}
export const getPlayers =() =>{
    return applicationState.players.map(player => ({ ...player }))
}
export const getTeams =() =>{
    return applicationState.teams.map(team => ({ ...team }))
}
export const getScores =() =>{
    return applicationState.scores.map(score => ({ ...score }))
}
export const getCompletedGames =() =>{
    return applicationState.completedGames.map(completedGame => ({ ...completedGame }))
}

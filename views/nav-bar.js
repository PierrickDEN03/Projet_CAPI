import { Game } from "../data/game_class.js";

const gameId = new URLSearchParams(window.location.search).get('id');
const resumeGameLink = document.getElementById('resume-game-link');
const accueilGameLink = document.getElementById('accueil-game-link');
if (gameId != null) {
    const game = Game.initFromId(gameId);
    if (game.isInitStepByStepOver()) {
        resumeGameLink.onclick = (e) => {
            e.preventDefault();
            window.location.href = resumeGameLink.href + `?id=${gameId}`
        };
        accueilGameLink.onclick = (e) => {
            e.preventDefault()
            window.location.href = accueilGameLink + `?id=${gameId}`
        };
    } else {
        resumeGameLink.style.display = 'none';
    }
} else {
    resumeGameLink.style.display = 'none';
}
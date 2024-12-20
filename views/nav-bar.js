import { Game } from "../data/game_class.js";

const gameId = new URLSearchParams(window.location.search).get('id');
const resumeGameLink = document.getElementById('resume-game-link');
const accueilGameLink = document.getElementById('accueil-game-link');

if (gameId != null) {
    const game = Game.initFromId(gameId);
    console.log(game.isInitStepByStepOver())
    if (game.isInitStepByStepOver()) {
        resumeGameLink.href = resumeGameLink.href + `?id=${gameId}`;
        accueilGameLink.href = accueilGameLink.href + `?id=${gameId}`;
    } else {
        resumeGameLink.style.display = 'none';
    }
} else {
    resumeGameLink.style.display = 'none';
}
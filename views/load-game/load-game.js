import { Game } from "../../data/game_class.js";

document.getElementById('load-game-form').addEventListener('submit', function (event) {
    event.preventDefault();
    const fileInput = document.getElementById('game-file');
    const file = fileInput.files[0];
    if (file) {
        const reader = new FileReader();
        reader.onload = function (e) {
            const gameData = JSON.parse(e.target.result);
            const game = Game.restartFromJson(gameData);
            window.location.href = `../game-resume/game-resume.html?id=${game.id}`;
            // Vous pouvez ajouter ici le code pour traiter les données du jeu
        };
        reader.readAsText(file);
    }
});
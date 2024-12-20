import { Game } from "../../data/game_class.js";

const gameId = new URLSearchParams(window.location.search).get('id');
const centeredModal = document.querySelector('#create-choice.centered-modal');
const createGameBtn = document.getElementById('create-game-btn');
const modalCross = document.querySelector('#create-choice .modal-cross');
const exportJson = document.getElementById('export-json');

createGameBtn.onclick = toggleModalVisibility;
modalCross.onclick = toggleModalVisibility;

function toggleModalVisibility() {
    centeredModal.classList.toggle('hidden')
}

if (gameId != null) {
    const game = Game.initFromId(gameId);
    const exportJsonLink = document.getElementById('export-game-btn');
    const blob = new Blob([game.jsonExport()], { type: 'application/json' });

    // Créer une URL pour le Blob
    const url = URL.createObjectURL(blob);

    // Créer un élément <a> (lien) dynamique
    exportJsonLink.href = url;
    exportJsonLink.download = `game_${game.name}.json`;
    //exportJson.onclick = (e) => downloadJSON(game.jsonExport, `game_${game.name}.json`, e);
} else {
    exportJson.style.display = 'none';
}

const centeredModal = document.querySelector('#create-choice.centered-modal');
const createGameBtn = document.getElementById('create-game-btn');
const modalCross = document.querySelector('#create-choice .modal-cross');

createGameBtn.onclick = toggleModalVisibility;
modalCross.onclick = toggleModalVisibility;

function toggleModalVisibility() {
    centeredModal.classList.toggle('hidden')
}

const gameId = new URLSearchParams(window.location.search).get('id');
const resumeGameLink = document.getElementById('resume-game-link');
const accueilGameLink = document.getElementById('accueil-game-link');
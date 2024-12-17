import { Game } from '../../data/game_class.js'
import { getItem } from '../../data/local-storage_class.js';
//Crée une nouvelle partie en récupérant le nom et le mode de jeu renseignés par l'utilisateur
document.getElementById("create-game-form").addEventListener("submit", (e) => {
    e.preventDefault(); // Empêche l'envoi du formulaire

    const name = document.getElementById('game-name').value
    const mode = document.getElementById('mode_game').value

    const game = new Game(name, mode)

    window.location.href = "../add-user/add-user.html?id=" + game.id;
})
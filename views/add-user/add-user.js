import { setItem } from '../../data/local-storage_class.js'
import { Game, User } from '../../data/game_class.js'

// Récupère l'id de la game dans l'url
const gameId = new URLSearchParams(window.location.search).get('id');

const game = Game.initFromId(gameId)

console.log(game.name)

addNamePlayer()
//Génère dynamiquement des input pour le nombre de joueurs sélectionnés
const input = document.getElementById('player-count')

input.addEventListener('input', addNamePlayer);

function addNamePlayer() {
    //Affiche dynamiquement des input pour le nombre de joueurs sélectionnés
    const playerCount = document.getElementById('player-count').value;
    const playerNamesDiv = document.getElementById('player-names');
    playerNamesDiv.innerHTML = '';
    for (let i = 1; i <= playerCount; i++) {
        const label = document.createElement('label');
        label.textContent = `Nom du joueur ${i} :`;
        const input = document.createElement('input');
        input.type = 'text';
        input.name = `player-name-${i}`;
        //Force l'utilisateur à saisir un nom pour chaque joueur 
        input.required = true;
        playerNamesDiv.appendChild(label);
        playerNamesDiv.appendChild(input);
    }

}


// Bloque les saisies au clavier
input.addEventListener('keydown', (e) => {
    // Autoriser seulement les touches non liées à la saisie (comme Tab, Backspace, etc.)
    const allowedKeys = ['ArrowUp', 'ArrowDown', 'Tab', 'Backspace', 'Delete'];
    if (!allowedKeys.includes(e.key)) {
        e.preventDefault();
    }
});





document.getElementById("button_submit").addEventListener("click", function () {
    let modeGame = document.getElementById('mode_game').value
    //Récupère le nombre de joueurs renseigné par l'utilisateur
    let nbJoueur = document.getElementById('player-count').value
    //Pour chaque joueur, on stocke l'id et le nom dans un objet dans le local storage
    for (let i = 0; i < nbJoueur; i++) {
        let namePlayer = document.getElementsByName('player-name-' + (i + 1))[0]
        let UserObject = {
            name: namePlayer.value
        }
        setItem('user' + (i + 1), JSON.stringify(UserObject))
        const user = new User(namePlayer)
    }
    //On stocke le mode de jeu dans le local storage
    localStorage.setItem('modeGame', document.getElementById('mode_game').value);
    //Redirige l'utilisateur vers la page backlog.html si tout s'est bien passé
    window.location.href = "../backlog/backlog.html";
});


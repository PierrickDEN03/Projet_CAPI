import { Game, User } from '../../data/game_class.js'

// Récupère l'id de la game dans l'url
const gameId = new URLSearchParams(window.location.search).get('id');

const game = Game.initFromId(gameId)

// Ajoute le input pour 1 joueur par défaut
addNamePlayer()

const input = document.getElementById('player-count')

//Génère dynamiquement des input pour le nombre de joueurs sélectionnés
input.addEventListener('input', addNamePlayer);

// Bloque les saisies au clavier
input.addEventListener('keydown', (e) => {
    // Autoriser seulement les touches non liées à la saisie (comme Tab, Backspace, etc.)
    const allowedKeys = ['ArrowUp', 'ArrowDown', 'Tab', 'Backspace', 'Delete'];
    if (!allowedKeys.includes(e.key)) {
        e.preventDefault();
    }
});

document.getElementById("add-user-form").addEventListener("submit", (e) => {
    e.preventDefault();
    //Récupère le nombre de joueurs renseigné par l'utilisateur
    let nbJoueur = document.getElementById('player-count').value
    let users = []
    for (let i = 0; i < nbJoueur; i++) {
        let namePlayer = document.getElementsByName('player-name-' + (i + 1))[0].value
        //création et ajout du User dans le local storage
        const user = new User(namePlayer)
        users.push(user)
    }
    game.users = users

    window.location.href = "../backlog/backlog.html?id=" + gameId;
});


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
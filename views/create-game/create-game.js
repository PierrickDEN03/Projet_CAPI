import { setItem } from '../../data/local-storage_class.js'

//Génère dynamiquement des input pour le nombre de joueurs sélectionnés
document.getElementById('player-count').addEventListener('input', function () {
    //Affiche dynamiquement des input pour le nombre de joueurs sélectionnés
    const playerCount = this.value;
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
});



const input = document.getElementById('player-count');
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
    if (nbJoueur == "") {
        alert("Veuillez renseigner le nombre de joueurs")
        return
    }
    //Pour chaque joueur, on vérifie si le champ nom n'est pas vide 
    for (let i = 0; i < nbJoueur; i++) {
        if (document.getElementsByName('player-name-' + (i + 1))[0].value == "") {
            alert("Veuillez renseigner un nom pour chaque joueur")
            return
        }
    }
    //Pour chaque joueur, on stocke l'id et le nom dans un objet dans le local storage
    for (let i = 0; i < nbBacklog; i++) {
        let namePlayer = document.getElementsByName('player-name-' + (i + 1))[0]
        let UserObject = {
            name: namePlayer.value
        }
        setItem('user' + (i + 1), JSON.stringify(UserObject))
    }
    //On stocke le mode de jeu dans le local storage
    localStorage.setItem('modeGame', document.getElementById('mode_game').value);
    //Redirige l'utilisateur vers la page backlog.html si tout s'est bien passé
    window.location.href = "../backlog/backlog.html";
});

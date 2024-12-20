import { Backlog, Game } from "../../data/game_class.js"

// Récupère l'id de la game dans l'url
const gameId = new URLSearchParams(window.location.search).get('id');
const game = Game.initFromId(gameId)

console.log(game.backlogs)

//Pour afficher le premier backlog
addBacklog()

const input = document.getElementById('backlog-count');

//génère dynamiquement des input pour le nombre de joueurs sélectionnés
input.addEventListener('input', addBacklog);

// Bloque les saisies au clavier
input.addEventListener('keydown', (e) => {
    // Autoriser seulement les touches non liées à la saisie (comme Tab, Backspace, etc.)
    const allowedKeys = ['ArrowUp', 'ArrowDown', 'Tab', 'Backspace', 'Delete'];
    if (!allowedKeys.includes(e.key)) {
        e.preventDefault();
    }
});




document.getElementById("add-backlog-form").addEventListener("submit", (e) => {
    e.preventDefault();
    //Récupère le nombre de backlog renseigné par l'utilisateur
    let nbBacklog = document.getElementById('backlog-count').value
    const backlogs = []
    //Pour chaque backlog, on stocke le titre et la description dans un objet dans le local storage
    for (let i = 0; i < nbBacklog; i++) {
        let backlogTitle = document.getElementsByName('backlog-name-' + (i + 1))[0]
        let backlogDescription = document.getElementsByName('backlog-description-' + (i + 1))[0]

        backlogs.push(new Backlog(backlogTitle.value, backlogDescription.value, Backlog.initRatesFromUsers(game.users)))
    }
    game.backlogs = backlogs

    //Redirige l'utilisateur vers la page game.html si tout s'est bien passé
    window.location.href = "../game-resume/game-resume.html?id=" + game.id;
});


function addBacklog() {
    //Affiche dynamiquement des input pour le nombre de joueurs sélectionnés
    const backlogCount = document.getElementById("backlog-count").value;
    const backlogNamesDiv = document.getElementById('backlog-names');
    backlogNamesDiv.innerHTML = '';
    //Génère les input pour chaque backlog  
    for (let i = 1; i <= backlogCount; i++) {
        //On crée un div pour chaque backlog
        const container = document.createElement('div');
        container.style.marginBottom = '20px'; // Ajoute un espace entre les champs

        const label = document.createElement('label');
        label.textContent = `Titre de la fonctionnalité ${i} :`;
        const input = document.createElement('input');
        input.type = 'text';
        input.name = `backlog-name-${i}`;

        const descriptionLabel = document.createElement('label');
        descriptionLabel.textContent = `Description de la fonctionnalité (facultatif) :`;
        const description = document.createElement('textarea');
        description.name = `backlog-description-${i}`;

        //description de la fonctionnalité non obligatoire
        description.required = false;
        //Force l'utilisateur à saisir un nom pour chaque backlog 
        input.required = true;
        container.appendChild(label);
        container.appendChild(input);
        container.appendChild(descriptionLabel)
        container.appendChild(description)
        backlogNamesDiv.appendChild(container);
    }

}
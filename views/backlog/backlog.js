import { setItem } from "../data/local-storage_class.js"

//génère dynamiquement des input pour le nombre de joueurs sélectionnés
document.getElementById('backlog-count').addEventListener('input', function () {
    //Affiche dynamiquement des input pour le nombre de joueurs sélectionnés
    const backlogCount = this.value;
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

});



const input = document.getElementById('backlog-count');
    // Bloque les saisies au clavier
    input.addEventListener('keydown', (e) => {
        // Autoriser seulement les touches non liées à la saisie (comme Tab, Backspace, etc.)
        const allowedKeys = ['ArrowUp', 'ArrowDown', 'Tab', 'Backspace', 'Delete'];
        if (!allowedKeys.includes(e.key)) {
            e.preventDefault();
        }
    });




document.getElementById("button_submit").addEventListener("click", function () {
    //Récupère le nombre de backlog renseigné par l'utilisateur
    let nbBacklog = document.getElementById ('backlog-count').value
    console.log(nbBacklog)
    if (nbBacklog == ""){
        alert("Veuillez renseigner le nombre de fonctionnalités")
        return
    }
    //Pour chaque backlog, on vérifie si le champ titre n'est pas vide 
    for (let i=0; i<nbBacklog; i++){
        if (document.getElementsByName('backlog-name-'+(i+1))[0].value == ""){
            alert("Veuillez renseigner un titre pour chaque fonctionnalité")
            return
        }
    }
    //Pour chaque backlog, on stocke le titre et la description dans un objet dans le local storage
    for (let i= 0; i<nbBacklog; i++){
        let backlog = document.getElementsByName('backlog-name-'+(i+1))[0]
        let backlogDescription = document.getElementsByName('backlog-description-'+(i+1))[0]
        let backlogObject = {
            title: backlog.value,
            description: backlogDescription.value
        }
        setItem('backlog'+(i+1), JSON.stringify(backlogObject))
    }
    //Redirige l'utilisateur vers la page backlog.html si tout s'est bien passé
    window.location.href = "../backlog/backlog.html";
});



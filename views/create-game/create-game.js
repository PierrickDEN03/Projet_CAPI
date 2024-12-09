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
    window.location.href = "../game/game.html";
});
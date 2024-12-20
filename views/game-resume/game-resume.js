import { Game, Backlog, User } from "../../data/game_class.js"

const gameId = new URLSearchParams(window.location.search).get('id');
const game = Game.initFromId(gameId)
displayData()

function displayData() {
    document.getElementById("resume-title").textContent += game.name
    const backlogsContainer = document.getElementById("backlogs-container")

    // Display backlogs data*
    game.backlogs.forEach((backlog, i) => {
        const newBacklogElement = document.createElement("div");
        const newContent = document.createTextNode(backlog.title);
        newBacklogElement.classList.add("backlog-resume-list");
        if (i === 0) {
            newBacklogElement.classList.add("backlog-selected");
            backlogSelected(game.backlogs[i])
        }
        newBacklogElement.id = `backlog-${i}`

        newBacklogElement.appendChild(newContent);

        newBacklogElement.addEventListener("click", () => {
            const backlogs = document.getElementsByClassName("backlog-resume-list")
            for (let backlog of backlogs) {
                backlog.classList.remove("backlog-selected")
            }
            newBacklogElement.classList.add("backlog-selected")
            backlogSelected(game.backlogs[i])
        })

        backlogsContainer.insertAdjacentElement("beforeend", newBacklogElement)
    })
}

/**
 * @param {Backlog} backlog
 */
function backlogSelected(backlog) {
    const backlogData = document.getElementById("backlog-data")
    const backlogTitle = backlogData.childNodes[1]
    const backlogDescription = backlogData.childNodes[3]
    const backlogButton = backlogData.childNodes[5]

    backlogTitle.textContent = backlog.title
    if (backlogDescription.childNodes.length >= 2) {
        backlogDescription.removeChild(backlogDescription.lastChild);
    }
    const descriptionText = document.createTextNode(backlog.description != null && backlog.description !== "" ? backlog.description : "Pas de description")
    backlogDescription.appendChild(descriptionText)
    switch (backlog.finalRate) {
        case -2:
            backlogButton.classList.remove("disabled")
            backlogButton.textContent = "Commencer le vote de la fonctionnalité"
            backlogButton.onclick = () => {
                window.location.href = "../game/game.html?id=" + game.id + "&backlog=" + backlog.id
            }
            break;
        case -1:
            backlogButton.classList.remove("disabled")
            backlogButton.textContent = "Reprendre le vote de la fonctionnalité"
            backlogButton.onclick = () => {
                window.location.href = "../game/game.html?id=" + game.id + "&backlog=" + backlog.id
            }
            break;
        default:
            backlogButton.onclick = (e) => { e.preventDefault() }
            backlogButton.classList.add("disabled")
            backlogButton.textContent = "Le vote de la fonctionnalité a déjà été effectué"
            break;
    }
    displayNotes(backlog)
    displayFinalNote(backlog.finalRate)
}

function displayFinalNote(finalNote) {
    const finalNoteElement = document.getElementById("final-note")
    finalNoteElement.textContent = finalNote < 0 ? "" : "Note finale : " + finalNote
}

function displayNotes(backlog) {
    const notesContainer = document.getElementById("backlog-votes")
    if (backlog.finalRate === -2) {
        notesContainer.style.display = "none"
    } else {
        notesContainer.style.display = "block"
        const cardsContainer = document.querySelector(".cards-container")
        while (cardsContainer.firstChild) {
            cardsContainer.removeChild(cardsContainer.lastChild);
        }
        for (let user of game.users) {
            const value = backlog.valueRateFromUser(user)
            const cardPath = value === -1 ? "../../cartes/cartes_interro.svg" : `../../cartes/cartes_${value}.svg`
            const newCard = document.createElement("div")
            newCard.classList.add("card")
            newCard.dataset.value = value
            const newCardText = document.createElement("p")
            newCardText.textContent = user.name
            const newCardImage = document.createElement("img")
            newCardImage.src = cardPath
            newCardImage.alt = "Carte " + value
            newCard.appendChild(newCardText)
            newCard.appendChild(newCardImage)
            cardsContainer.insertAdjacentElement("beforeend", newCard)
        }
    }
}
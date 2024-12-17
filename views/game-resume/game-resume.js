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

    backlogTitle.textContent = "Nom du backlog : " + backlog.title
    backlogDescription.textContent = backlog.description != null && backlog.description !== "" ? "Descrpition :" + backlog.description : "Description : Pas de description"

    if (backlog.finalRate === -2) {
        backlogButton.textContent = "Commencer le vote de la fonctionnalité"
        backlogButton.onclick = () => {
            window.location.href = "../game/game.html?id=" + backlog.id + "&backlog=" + backlog.id
        }
    } else if (backlog.finalRate === -1) {
        backlogButton.textContent = "Reprendre le vote de la fonctionnalité"
        backlogButton.onclick = () => {
            window.location.href = "../game/game.html?id=" + backlog.id + "&backlog=" + backlog.id
        }
    } else {
        backlogButton.onclick = (e) => { e.preventDefault() }
        backlogButton.classList.add("disabled")
        backlogButton.textContent = "Le vote de la fonctionnalité a déjà été effectué"
    }
}
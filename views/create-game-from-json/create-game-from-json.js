import { Game } from "../../data/game_class.js";

const formElement = document.getElementById("form-json-create");

formElement.addEventListener("submit", (e) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const reader = new FileReader();
    let game;
    reader.onload = (e) => {
        const json = JSON.parse(e.target.result);
        if (json != null) {
            console.log("submit");
            game = Game.initFromJson(json);
            window.location.href = "../game-resume/game-resume.html?id=" + game.id;
        }
    };
    reader.readAsText(formData.get("json-file"));
})
//dom tới nút chơi
let btnPlay = document.querySelector(".btn-play");

//đợi một sự kiện từ nó
btnPlay.addEventListener("click", (event) => {
    window.open("../page-game/index.html", "_self", "width = 100%", "height = 100%");
});


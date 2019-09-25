let cvs = document.getElementById("canvas"),
    ctx = cvs.getContext("2d");

let arman = new Image(),
    background = new Image(),
    footer = new Image(),
    killer = new Image(),
    killer_rotation = new Image();

let delta = 120;

let armXPos = 10,
    armYPos = 150,
    gravitation = 1.5;

let arr = [];

arr[0] = {
    x: cvs.width,
    y: 0
}

let animation = true;

let score = 0;

document.addEventListener("keydown", moveUp);

function moveUp() {
    armYPos -= 25;
}

arman.src = "img/Hero.png";
background.src = "img/Background.png";
footer.src = "img/Footer.png";
killer.src = "img/Killer.png";
killer_rotation.src = "img/Killer_rotation.png";

let game = new Audio();
let death = new Audio();

game.src = "audio/game.mp3";
death.src = "audio/death.mp3";

function draw() {
    if (!animation) return false;

    ctx.drawImage(background, 0, 0);
    game.play().loop;

    for (let i = 0; i < arr.length; ++i) {
        ctx.drawImage(killer_rotation, arr[i].x, arr[i].y);
        ctx.drawImage(killer, arr[i].x, 0 + killer_rotation.height + delta);

        arr[i].x--;

        if (arr[i].x == 110) {
            arr.push({
                x: cvs.width,
                y: Math.floor(Math.random() * killer_rotation.height) - killer_rotation.height
            });
        }
        if (armXPos + arman.width >= arr[i].x &&
            armXPos <= arr[i].x + killer_rotation.width &&
            (armYPos <= arr[i].y + killer_rotation.height ||
                armYPos + arman.height >= 0 +
                killer_rotation.height + delta) || 
                armYPos + arman.height >= cvs.height - footer.height) {
            setTimeout('location.reload()', 3500);
            animation = false;
            game.pause();
            death.play();
        }
        if (arr[i].x == 10) {
            score++;
        }
    }

    /*     ctx.drawImage(killer, 100, 0);
        ctx.drawImage(killer_rotation, 100, 0 + killer.height + delta); */

    ctx.drawImage(footer, 0, cvs.height - footer.height);
    ctx.drawImage(arman, armXPos, armYPos);

    armYPos += gravitation;

    ctx.fillStyle = "#000";
    ctx.font = "24px Impact";
    ctx.fillText("Очки: " + score, 200, cvs.height - 30);

    requestAnimationFrame(draw);
}

killer_rotation.onload = draw;
//DOM

const game = document.querySelector("#game");

//Setting
let playerMove = {
  left: 0,
};
let moving = 0;

// --------------------------------------- function ---------------------------------------
function init() {
  draw();
}
init();
//비행기 생성
function draw() {
  const playerImg = document.createElement("img");
  playerImg.src = "../resource/images/player.png";
  playerImg.classList.add("player");
  game.appendChild(playerImg);
}

// 비행기 움직임
let player = document.querySelector(".player");

let left = 0; //기준점
let move = 5; //이동거리
let browser_w = game.offsetWidth;
document.onkeydown = onkey_press;



function moving() {
    left += move;
    requestAnimationFrame(moving);
}

function onkey_press() {
  if (event.keyCode == 37) {
    moving()
    player.style.left = left + "px";
    if (left < 10) {
      left = 10;
    }
  } else if (event.keyCode == 39) {
    left = left + move;
    player.style.left = left + "px";
    if (left > 500) {
      left =  471;
    }
  }
}

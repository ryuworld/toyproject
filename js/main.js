//DOM
const startBtn = document.querySelector(".startBtn");
const startText = document.querySelector(".start");
const game = document.querySelector("#game");
let player = null;

//Setting
let left = 237; //기준점
let move = 5; //이동거리
let browser_w = game.offsetWidth; // 플레이그라운드 너비
let player_w = null; // 비행기 너비
let invader_max = 10;
let invader = [];

// --------------------------------------- function ---------------------------------------

startBtn.addEventListener("initialize", function () {
  player = document.querySelector(".player");
  player_w = player.width;
});


//비행기 생성
function draw() {
  const playerImg = document.createElement("img");
  playerImg.src = "../resource/images/player.png";
  playerImg.classList.add("player");
  game.appendChild(playerImg);
}

//첫 플레이 버튼
function start() {
  if (startText.style.display !== "none") {
    startText.style.display = "none";
    game.style.display = "block";
  } else {
    startText.style.display = "block";
  }
  draw();
  let event = new CustomEvent("initialize");
  startBtn.dispatchEvent(event);
}


//적군 비행기 생성
function draw_p() {
  for (i = 0; i < invader_max; ++i) {
    let img = new Image();
    img.src = "../resource/images/invader.png";
    img.x = Math.random() * game.width;
    img.y = Math.random() * game.height;
    img.size = Math.sqrt(Math.random() * 100) + 1;
    invader.push(img);
  }
}


// 비행기 움직임
document.onkeydown = onkey_press;
let scope_w = browser_w - player_w;

function onkey_press() {
  if (event.keyCode == 37) {
    left = left - move;
    player.style.left = left + "px";
    if (left < 10) {
      left = 10;
    }
  } else if (event.keyCode == 39) {
    left = left + move;
    player.style.left = left + "px";
    if (left > scope_w) {
      left = scope_w;
    }
  }
}
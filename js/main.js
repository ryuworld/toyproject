//DOM
const startBtn = document.querySelector(".startBtn");
const startText = document.querySelector(".start");
const game = document.querySelector("#game");

//Setting
let browser_h = game.offsetHeight;
let left = 237; //기준점
let move = 3; //이동거리
let invader_max = 10;
let invader = [];
let keyCodeMap = [];
let missile = [];
let xPos = 0;
let yPos = 0;

// --------------------------------------- function ---------------------------------------
startBtn.addEventListener("click", start); // 클릭 후 한번만 실행되는건데 drawalien은 계속 생성된다 이유는?
startBtn.addEventListener("initialize", initialize); //이거의 역할?

function initialize() {
  let browser_w = game.offsetWidth; // 플레이그라운드 너비
  let player = document.querySelector(".player");
  let fream = {
    player,
    scope_w: browser_w - player.width,
  };
  window.requestAnimationFrame(update(fream)); // 최초 실행
}

//첫 플레이 버튼
function start() {
  if (startText.style.display !== "none") {
    startText.style.display = "none";
    game.style.display = "block";
  } else {
    startText.style.display = "block";
  }
  drawPlayer();
  drawAlien(setInterval(drawAlien, 3000));
  let event = new CustomEvent("initialize");
  startBtn.dispatchEvent(event);
}

//비행기 생성
function drawPlayer() {
  const playerImg = new Image(40);
  playerImg.src = "../resource/images/player.png";
  playerImg.classList.add("player");
  game.appendChild(playerImg);
}

//외계인생성
function drawAlien() {
  let alienImg = new Image(20);
  alienImg.src = "../resource/images/invader.png";
  alienImg.classList.add("alien");
  game.appendChild(alienImg);
  alienImg.style.display = "block";
  alienImg.style.left = `${Math.random() * game.offsetWidth}px`;
  alienImg.style.top = `${(Math.random() * game.offsetHeight) / 3}px`;
  invader.push(alienImg);
}

function updateAlien(scope_w) {
  for (a of invader) {
    if (`${parseInt(a.style.left)}` > 0) {
      a.style.left = `${parseInt(a.style.left) + move}px`;
      if (`${parseInt(a.style.left)}` > scope_w) {
        
      }
    }
  }
}
//총알
function drawBullet() {
  let bulletImg = new Image();
  bulletImg.src = "../resource/images/invader.png";
  missile.push(bulletImg);
  player.appendChild(bulletImg);
  setInterval(drawBullet, 5000);
}

function update(fream) {
  return () => {
    onkey_press(fream.player, fream.scope_w);
    updateAlien(fream.scope_w);
    window.requestAnimationFrame(update(fream));
  }; //함수를 리턴하는 이유는 클로저때문! fream을 전역으로 두면 클로저를 안써도 괜찮다!
}

// 비행기 움직임
document.onkeydown = (e) => {
  keyCodeMap[e.keyCode] = true;
};
document.onkeyup = (e) => {
  keyCodeMap[e.keyCode] = false;
};

function onkey_press(player, scope_w) {
  if (keyCodeMap[37]) {
    left = left - move;
    if (left < 0) {
      left = 0;
    }
  } else if (keyCodeMap[39]) {
    left = left + move;
    if (left > scope_w) {
      left = scope_w;
    }
  }
  player.style.left = left + "px";
}

//DOM
const startBtn = document.querySelector(".startBtn");
const startText = document.querySelector(".start");
const game = document.querySelector("#game");


//Setting
let left = 237; //기준점
let move = 3; //이동거리
let invader_max = 10;
let invader = [];
let keyCodeMap = [];
let missile = [];

// --------------------------------------- function ---------------------------------------
startBtn.addEventListener("click", start);
startBtn.addEventListener("initialize", initialize); //이거의 역할?


//비행기 생성
function drawPlayer() {
  const playerImg = new Image(40);
  playerImg.src = "../resource/images/player.png";
  playerImg.classList.add("player");
  game.appendChild(playerImg);
}

//외계인생성
function drawAlien() {
  for (i = 0; i < invader_max; ++i) {
    let alienImg = new Image(20);
    alienImg.src = "../resource/images/invader.png";
    invader.push(alienImg);
    game.appendChild(alienImg);
    alienImg.style.position = "absolute";
    alienImg.style.left = `${Math.random() * game.offsetWidth}px`;
    alienImg.style.top = `${Math.random() * game.offsetHeight / 3}px`; // es6문법
  }
}

function initialize() {
  let browser_w = game.offsetWidth; // 플레이그라운드 너비
  let player = document.querySelector(".player");
  let fream = {
    player,
    scope_w: browser_w - player.width,
  }
  window.requestAnimationFrame(update(fream)); // 최초 실행을 위해 근데 왜 굳이 requestAnimationFrame를 쓰나? time이 중요해서?
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
  drawAlien();
  let event = new CustomEvent("initialize");
  startBtn.dispatchEvent(event);
}

//총알
function drawBullet() {
  let bulletImg = new Image();
  bulletImg.src = "../resource/images/invader.png";
  missile.push(bulletImg);  
  game.appendChild(bulletImg);
  setInterval(drawBullet,100)
}

//총알 이동
function bulletMove() {
  for (bullet of missile) {
    bullet.style.top = 
  }
  
}

function update(fream) {
  return () => {
    onkey_press(fream.player, fream.scope_w);
    window.requestAnimationFrame(update(fream))
  }//함수인 이유는 클로저때문! fream을 전역으로 두면 클로저를 안써도 괜찮다!
}


// 비행기 움직임
document.onkeydown = (e) => { keyCodeMap[e.keyCode] = true; }
document.onkeyup = (e) => { keyCodeMap[e.keyCode] = false; }

    function onkey_press(player, scope_w,bullet) {
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
  } else if (keyCodeMap[90]) {
    console.log(bullet)
  }
      player.style.left = left + "px";
}
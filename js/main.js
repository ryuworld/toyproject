//DOM
const startBtn = document.querySelector(".startBtn");
const startText = document.querySelector(".start");
const game = document.querySelector("#game");

//Setting
let left = 237; //기준점
let speed = 3; //이동거리
let invader = [];
let keyCodeMap = [];
let missiles = [];

// --------------------------------------- function ---------------------------------------
startBtn.addEventListener("click", start);
startBtn.addEventListener("initialize", initialize);

function initialize() {
  let playground_w = game.offsetWidth;
  let playground_h = game.offsetHeight;
  let player = document.querySelector(".player");
  let alien = document.querySelector(".alien");
  let bullet = document.querySelector(".bullet");
  let frame = {
    player,
    alien,
    bullet,
    player_top: playground_h - 50 - player.width, // 플레이어 스타일을 못가져옴
    scope_w: playground_w - player.width,
  };
  setInterval(() => drawAlien(), 3000);
  setInterval(() => drawBullet(frame), 200);
  window.requestAnimationFrame(update(frame)); // 최초 실행
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
  drawBullet();
  let event = new CustomEvent("initialize");
  startBtn.dispatchEvent(event);
}

//비행기 생성
function drawPlayer() {
  const playerImg = new Image(40);
  playerImg.src = "./resource/images/player.png";
  playerImg.classList.add("player");
  game.appendChild(playerImg);
}

//외계인생성
function drawAlien() {
  let alienImg = new Image(40);
  alienImg.src = "./resource/images/invader.png";
  alienImg.classList.add("alien");
  game.appendChild(alienImg);
  alienImg.direction = Math.random() < 0.5 ? "left" : "right";
  alienImg.style.display = "block";
  alienImg.style.left = `${Math.random() * game.offsetWidth}px`;
  alienImg.style.top = `${(Math.random() * game.offsetHeight) / 3}px`;
  invader.push(alienImg);
}

//플레이어 미사일 생성
function drawBullet(frame) {
  let bulletImg = new Image(6, 10);
  bulletImg.src = "./resource/images/bullet.png";
  bulletImg.classList.add("bullet");
  missiles.push(bulletImg);
  game.appendChild(bulletImg);
  if (keyCodeMap[90]) {
    bulletImg.style.display = "block";
    bulletImg.style.left = `${left}px`;
    bulletImg.style.top = `${frame.player_top}px`;
  }
}

function updateAlien(scope_w) {
  for (a of invader) {
    if (a.direciton == "right") {
      a.style.left = `${parseInt(a.style.left) + speed}px`;
    } else {
      a.style.left = `${parseInt(a.style.left) - speed}px`;
    }
    if (parseInt(a.style.left) >= scope_w) {
      a.direciton = "left";
    }
    if (parseInt(a.style.left) <= 0) {
      a.direciton = "right";
      a.style.left = 0;
    }
    console.log(a.direciton);
  }
}

function updateBullet() {
  for (let bullet of missiles) {
    let top = speedDelta(bullet, "top", -5);
    if (top < -10) {
      bullet.remove();
    }
  }
}

function update(frame) {
  return () => {
    onkey_press(frame.player, frame.scope_w, frame.scope_h);
    updateAlien(frame.scope_w);
    updateBullet();
    collision(frame.alien, frame.bullet);
    window.requestAnimationFrame(update(frame));
  };
}
//충돌감지
function collision(alien, bullet) {
  let alienLeft = speedDelta(alien, "left", 0);
  let alienTop = speedDelta(alien, "top", 0);
  let bulletLeft = speedDelta(bullet, "left", 0);
  let bulletTop = speedDelta(bullet, "top", 0);
  if (
    alienLeft + alien.width >= bulletLeft &&
    alienLeft <= bulletLeft + bullet.width &&
    alienTop + alien.height >= bulletTop &&
    alienTop <= bulletTop + bullet.height
  ) {
    alien.remove();
    bullet.remove();
  }
}

// 비행기 움직임
document.onkeydown = (e) => {
  keyCodeMap[e.keyCode] = true;
};
document.onkeyup = (e) => {
  keyCodeMap[e.keyCode] = false;
};

function speedDelta(element, attribute, delta) {
  let value = parseInt(element.style[attribute]) + delta;
  element.style[attribute] = `${value}px`;
  return value;
}

function onkey_press(player, scope_w) {
  if (keyCodeMap[37]) {
    left = left - speed;
    if (left < 0) {
      left = 0;
    }
  } else if (keyCodeMap[39]) {
    left = left + speed;
    if (left > scope_w) {
      left = scope_w;
    }
  }
  player.style.left = left + "px";
}

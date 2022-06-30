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
let alienMissiles = [];
let isGameover = false;


// --------------------------------------- function ---------------------------------------
startBtn.addEventListener("click", start);
startBtn.addEventListener("initialize", initialize);

 function initialize() {
  let playground_w = game.offsetWidth;
  let playground_h = game.offsetHeight;
  let scoreNum = document.querySelector(".scoreNum");
  let score = Number(scoreNum.innerHTML);
  let player = document.querySelector(".player");
  let alien = document.querySelector(".alien");
  let bullet = document.querySelector(".bullet");
  let frame = {
    playground_h,
    playground_w,
    player,
    player_top: parseInt(player.style.top),
    alien,
    bullet,
    alien_left: parseInt(alien.style.left),
    alien_top: playground_h - parseInt(alien.style.top) - alien.width,
    scope_w: playground_w - player.width,
    scoreNum,
    score,
  };
   let interval1 = setInterval(() => {
     if (!isGameover) {
      drawAlien()
     } else {
      clearInterval(interval1) 
     }
   }, 3000);
   let interval2 = setInterval(() => {
    if (!isGameover) {
      drawBullet(frame)
     } else {
      clearInterval(interval2) 
     }

   }, 200);
   let interval3 =setInterval(() => {
    if (!isGameover) {
      drawBullet2()
     } else {
      clearInterval(interval3) 
     }
   }, 1000);
  window.requestAnimationFrame(update(frame)); // 최초 실행
 }

//end 함수
function gameover(score) {
  isGameover = true;
  alert("[Game Over]\nScore: " + score);
  window.location.reload();
}


//첫 플레이 버튼
function start() {
  if (startText.style.display !== "none") {
    startText.style.display = "none";
    game.style.display = "block";
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
  playerImg.style.left = `${
    game.offsetWidth - game.offsetWidth / 2 - playerImg.width / 2
  }px`;
  playerImg.style.top = `${game.offsetHeight - game.offsetHeight / 10}px`;
}

//외계인생성
function drawAlien() {
  let alienImg = new Image(20);
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
  if (keyCodeMap[90]) {
    game.appendChild(bulletImg);
    bulletImg.style.display = "block";
    bulletImg.style.left = `${left}px`;
    bulletImg.style.top = `${frame.player_top}px`;
  }
}

//외계인 미사일 생성
function drawBullet2() {
  let bulletImg2 = new Image();
  bulletImg2.src = "./resource/images/enemy-bullet.png";
  bulletImg2.classList.add("bullet2");
  alienMissiles.push(bulletImg2);
  game.appendChild(bulletImg2);
  for (e of invader) {
    if (e.style.display === "block") {
      bulletImg2.style.display = "block";
      bulletImg2.style.left = `${parseInt(e.style.left)}px`;
      bulletImg2.style.top = `${parseInt(e.style.top)}px`;
    }
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
  }
}

function updateBullet() {
  for (let bullet of missiles) {
    let top = speedDelta(bullet, "top", -8);
    if (top < -10) {
      bullet.remove();
    }
  }
}

function updateBullet2(playground_h) {
  for (let bullet2 of alienMissiles) {
    let top = speedDelta(bullet2, "top", +3);
    if (top > playground_h - 10) {
      bullet2.remove();
    }
  }
}


function update(frame) {
  return () => {
    onkey_press(frame.player, frame.scope_w, frame.scope_h);
    updateAlien(frame.scope_w);
    updateBullet();
    updateBullet2(frame.playground_h);
    for (n of invader) {
      for (m of missiles) {
        if (collision(n, m)) {
          n.remove();
          frame.score = frame.score + 1;
          frame.scoreNum.innerHTML = frame.score;
        }
      }
    }
    for (a of alienMissiles) {
      if (collision(frame.player, a)) {
        if (!isGameover) {
          gameover(frame.score);  
        } 
      }
    }
    window.requestAnimationFrame(update(frame));
  };
}
//충돌감지
function collision(body, bullet) {
  let bodyLeft = speedDelta(body, "left", 0);
  let bodyTop = speedDelta(body, "top", 0);
  let bulletLeft = speedDelta(bullet, "left", 0);
  let bulletTop = speedDelta(bullet, "top", 0);
  if (
    bodyLeft + body.width >= bulletLeft &&
    bodyLeft <= bulletLeft + bullet.width &&
    bodyTop + body.height >= bulletTop &&
    bodyTop <= bulletTop + bullet.height
  ) {
    return true;
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

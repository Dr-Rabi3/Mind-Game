let colors = ["/imagse/img1.png","/imagse/img2.png","/imagse/img3.png","/imagse/img4.png","/imagse/img5.png","/imagse/img6.png","/imagse/img7.png","/imagse/img8.png","/imagse/img1.png","/imagse/img2.png","/imagse/img3.png","/imagse/img4.png","/imagse/img5.png","/imagse/img6.png","/imagse/img7.png","/imagse/img8.png"];
let divs = document.querySelectorAll('div');
var styleElem = document.head.appendChild(document.createElement("style"));
let time = document.querySelector('.time');
let wrong = document.querySelector('.wrong');
let award = document.querySelector('.award');
let AllAwards = document.querySelectorAll("span > span");
let btn = document.querySelector('button');
let final = window.getComputedStyle(
  document.querySelector("table"), ':before'
);
let awards = document.querySelectorAll('.allobjects p img');
let classes = new Array(0);
let cnt = 0;
let cnt2 = 0;
let cnt3 = 0;
let ok = false;

function timer() {
  cnt3++;
  time.innerHTML = `Time: ${cnt3}`;
}
divs.forEach((e) => {
  let x = Math.floor(Math.random() * colors.length);
  styleElem.innerHTML += `.${e.className}::after {background-image:url(${colors[x]});}`;
  colors.splice(x, 1);
});
function start() {
  if (ok === true) return;
  ok = true;
  divs.forEach((e) => {
    e.style.cssText = "transform: rotateY(-180deg);";
  });
  setTimeout(() => {
    divs.forEach((e) => {
      e.style.cssText = "transform: rotateY(-360deg);";
    })
    setInterval(timer, 1000);
  },1500);
}
function delet(div1, div2) {
  cnt++;
  award.innerHTML = `Awards: ${cnt}`;
  setTimeout(() => {
    document.querySelector(`.${div1}`).style.cssText = "display: none;";
    document.querySelector(`.${div2}`).style.cssText = "display: none;";
    document.querySelector(`.${div1} + span`).style.cssText = "width:75px;height:110px;";
    document.querySelector(`.${div2} + span`).style.cssText = "width:75px;height:110px;";
    if (cnt >= 8) {
      styleElem.innerHTML += `table{overflow: visible !important;}`;
      styleElem.innerHTML += `table:before{top:30% !important;}`;
      clearInterval(time);
      time = "";
    }
  }, 800);
}
function not(div1, div2) {
  cnt2++;
  wrong.innerHTML = `Wrong: ${cnt2}`;
  setTimeout(() => {
    document.querySelector(`.${div1}`).style.cssText = "transform: rotateY(-360deg);";
    document.querySelector(`.${div2}`).style.cssText = "transform: rotateY(-360deg);";
  }, 800);
}

function Award(imgs) {
  awards.forEach((e) => {
    let as = `url("${e.src}")`;
    if (as === imgs) {
      e.style.cssText = "display:block;";
    }
  })
}
function rotate(div) {
  if ( classes.length === 1 && classes[0] === '') classes.shift();
  if (div.target.className === classes[0] || !ok) return;
  console.log(div.target);
  classes.push(div.target.className);
  div.target.style.cssText = "transform: rotateY(180deg);";
  console.log(classes);
  if (classes.length === 2) {
    let clo1 = window.getComputedStyle(
      document.querySelector(`.${classes[0]}`), ':after'
    ).getPropertyValue("background-image");
    let clo2 = window.getComputedStyle(
      document.querySelector(`.${classes[1]}`), ':after'
    ).getPropertyValue("background-image");
    console.log(clo1);
    console.log(clo2);
    console.log(clo1 === clo2);
    if (clo1 === clo2) {
      delet(classes[0], classes[1]);
      Award(clo1);
    }
    else {
      not(classes[0], classes[1]);
    }
    classes.shift();
    classes.shift();
  }
}

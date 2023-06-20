const tVertical = document.getElementById('t-verticalSVG');
const randomText = document.getElementById('randomText');
const typingTest = document.querySelector('.typingTest');
const keyborad = document.getElementById('keyborad');
const rtSVG = document.getElementById('rtSVG');
const bgFrame = document.getElementById('backgroundFrame');

tVertical.addEventListener('animationend', function () {
  tVertical.style.transform = "translate(-0.5%,0) scaleY(1)";
})
randomText.addEventListener('animationend', function () {
  randomText.style.transform = "translate(0,0)";
  randomText.style.opacity = "1";
})
typingTest.addEventListener('animationend', function () {
  typingTest.style.transform = "translateY(0%)";
  typingTest.style.opacity = "1";
})
keyborad.addEventListener('animationend', function () {
  keyborad.style.transform = "translate(0,0) scale(1)";
  keyborad.style.opacity = "1";
})
rtSVG.addEventListener('animationend', function () {
  setTimeout(() => {
    rtSVG.style.setProperty('display', 'none', 'important');
    rtSVG.style.setProperty('transition', 'all 2s linear', 'important');
  }, 2350)
})
function calcXPositions(array) {
  positions = array.map(el => document.getElementById(el).getBoundingClientRect().left)
  return positions
}

function calcXTranslation(el, final){
  initialPos = xPositions[siteAnagram.indexOf(el.id)]
  finalPos = xPositions[final.indexOf(el.id)]
  return finalPos - initialPos
}

function shuffle(array) {
  array = [...array]
  var currentIndex = array.length, temporaryValue, randomIndex;

  // While there remain elements to shuffle...
  while (0 !== currentIndex) {

    // Pick a remaining element...
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex -= 1;

    // And swap it with the current element.
    temporaryValue = array[currentIndex];
    array[currentIndex] = array[randomIndex];
    array[randomIndex] = temporaryValue;
  }

  return array;
}

function animateAnagram() {
  if (typeof(count) === 'undefined') {
    count = 1
  }

  // console.log(calcXPositions(siteAnagram))
  var showReal = false;
  if (count>=5) {
    showReal = true
    count = 1
  }
  else {
    count += 1
  }

  activeAnagram = showReal ? [...real] : shuffle(siteAnagram)
  anime({
    targets: '.anagramTitle .el',
    translateX: function(el, i, l) {
      return calcXTranslation(el, activeAnagram);
    },
    easing: 'easeInOutQuint',
  });
  setTimeout(animateAnagram, showReal ? 8000: 2000)
}

window.onresize = resetAnagram;

let siteAnagram = ['el-01', 'el-02', 'el-03', 'el-04', 'el-05', 'el-06', 'el-07'];
let real = ['el-05', 'el-01', 'el-06', 'el-03', 'el-07', 'el-04', 'el-02'];
let xPositions = calcXPositions(siteAnagram);
var count;
var activeAnagram;
var animation;
animateAnagram()
// console.log(xPositions)

function toggleLightMode() {
  var el = document.body;
  el.classList.toggle("light-mode")
  document.getElementById("light-toggle").classList.toggle("light-mode")
}

function resetAnagram() {
  siteAnagram.map(el => document.getElementById(el).style.removeProperty('transform'));
  xPositions = calcXPositions(siteAnagram);
  anime({
    targets: '.anagramTitle .el',
    translateX: function(el) { return calcXTranslation(el, activeAnagram) },
    easing: 'easeInOutQuint'
  });
}

function handleTermKeyUp(e) {
  if (e.key === 'Enter' || e.keyCode === 13) {
    console.log("enter")
  }
}

function calcXPositions(array) {
  positions = array.map(el => document.getElementById(el).getBoundingClientRect().left)
  return positions
}

function calcXTranslation(el, final){
  // xPositions = calcXPositions(siteAnagram)
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

  var showReal = false;
  if (count>=5) {
    showReal = true
    count = 1
  }
  else {
    count += 1
  }

  final = showReal ? [...real] : shuffle(siteAnagram)
  anime({
    targets: '.name .el',
    translateX: function(el, i, l) {
      return calcXTranslation(el, final);
    },
    easing: 'easeInOutQuint',
  });
  setTimeout(animateAnagram, showReal ? 8000: 2000)
}

let siteAnagram = ['el-01', 'el-02', 'el-03', 'el-04', 'el-05', 'el-06', 'el-07', 'el-08', 'el-09', 'el-10', 'el-11'];
let real = ['el-05', 'el-01', 'el-06', 'el-03', 'el-07', 'el-04', 'el-10', 'el-11', 'el-08', 'el-02', 'el-09'];
let xPositions = calcXPositions(siteAnagram);
var count;
animateAnagram()

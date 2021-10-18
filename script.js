const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');
const img = new Image();
img.src = './media/flappy-bird-set.png';


//general setting
let gamePlaying = false
const gravity = 0.5;
const speed = 6.2;
const size = [51, 36]
const jump = -11.5;
const cTenth = (canvas.width / 10);

let index = 0;
    bestScore = 0,
    currentScore = 0,
    pipes = []
    flight,
    flyHeight;

const render = () =>{
    index++;


    window.requestAnimationFrame(render)
}
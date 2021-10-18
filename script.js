const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');
const img = new Image();
img.src = './media/flappy-bird-set.png';


//general setting
let gamePlaying = false
const gravity = 0.5;
const speed = 4.2;
const size = [51, 36]
const jump = -11.5;
const cTenth = (canvas.width / 10);

let index = 0,
    bestScore = 0,
    currentScore = 0,
    pipes = [],
    flight,
    flyHeight;

const render = () =>{
    index++;


    //background
        //first image
    ctx.drawImage(img, 0, 0, canvas.width, canvas.height, -((index * (speed /2)) % canvas.width) + canvas.width, 0, canvas.width, canvas.height );
        //second image to fix visual effect
    ctx.drawImage(img, 0, 0, canvas.width, canvas.height, -((index * (speed /2)) % canvas.width) , 0, canvas.width, canvas.height );

    if (gamePlaying) {
        // bird
        ctx.drawImage(img , 432, Math.floor((index % 9) / 3) * size[1] , ...size, cTenth, flyHeight, ...size); // bird position at 1/10 of canvas on X
        flight += gravity;
        flyHeight = Math.min(flyHeight + flight, canvas.height - size[1]) // Bird position on Y

    
    } else {
        // bird
        ctx.drawImage(img , 432, Math.floor((index % 9) / 3) * size[1] , ...size, ((canvas.width / 2) - size[0] / 2), flyHeight, ...size);
        flyHeight = (canvas.height / 2) - (size[1] / 2);
    
        // text
        ctx.fillText(`Meilleur score : ${bestScore}`, 55, 245);
        ctx.fillText('Cliquez pour jouer', 48, 535);
        ctx.font = "bold 30px courier";
    }


    window.requestAnimationFrame(render)
}

// Home render
img.onload = render

// Starting game
document.addEventListener('click', () => gamePlaying = true);

// Jumping
window.onclick = () => flight = jump;
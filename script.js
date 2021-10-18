const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');
const img = new Image();
img.src = './media/flappy-bird-set.png';


//general settings
let gamePlaying = false;
const gravity = 0.5;
const speed = 4.2;
const size = [51, 36];
const jump = -11.5;
const cTenth = (canvas.width / 10);

//pipe settings
const pipeWidth = 78;
const pipeGap = 270;
const pipeLoc = () => Math.random() * (canvas.height - pipeGap - (pipeWidth * 2));

let index = 0,
    bestScore = 0,
    currentScore = 0,
    pipes = [],
    flight,
    flyHeight;

const setup = () => {
    currentScore = 0;
    flight = jump;
    flyHeight = (canvas.height / 2) - (size[1] / 2);

    pipes = Array(3).fill().map((a, i) => [canvas.width + (i*(pipeGap + pipeWidth)), pipeLoc()])
    console.log(pipes)
}

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

        //pipes display
        pipes.map( pipe => {
            pipe[0] -= speed;
            
            //top pipe
            ctx.drawImage(img, 432, (588 - pipe[1]), pipeWidth, pipe[1], pipe[0], 0, pipeWidth, pipe[1]);
            //bottom pipe
            ctx.drawImage(img, (432 + pipeWidth), 108, pipeWidth, (canvas.height - pipe[1] + pipeGap), pipe[0], (pipe[1]+ pipeGap), pipeWidth, (canvas.height - pipe[1]+ pipeGap) );

            // after having avoided a pipe
            if(pipe[0] <= -pipeWidth) {
                //score record
                currentScore++;
                bestScore = Math.max(bestScore, currentScore);

                //remove pipe + create new one
                pipes = [...pipes.slice(1), [pipes[pipes.length-1][0] + pipeGap +pipeWidth, pipeLoc()]]
                console.log(pipes)


            }
        })

    
    } else {
        // bird
        ctx.drawImage(img , 432, Math.floor((index % 9) / 3) * size[1] , ...size, ((canvas.width / 2) - size[0] / 2), flyHeight, ...size);
        flyHeight = (canvas.height / 2) - (size[1] / 2);
    
        // text
        ctx.fillText(`Meilleur score : ${bestScore}`, 55, 245);
        ctx.fillText('Cliquez pour jouer', 48, 535);
        ctx.font = "bold 30px courier";
    }

    // score display
    document.getElementById('bestScore').innerHTML = `Meilleur : ${bestScore}`;
    document.getElementById('currentScore').innerHTML = `Actuel : ${bestScore}`;

    window.requestAnimationFrame(render)
}

setup()

// Home render
img.onload = render

// Starting game
document.addEventListener('click', () => gamePlaying = true);

// Jumping
window.onclick = () => flight = jump;
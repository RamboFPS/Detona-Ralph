const state = {
    view: {
        squares: document.querySelectorAll(".square"),
        enemy: document.querySelectorAll(".enemy"),
        timeLeft: document.querySelectorAll("#time-left"),
        score: document.querySelectorAll("#score"),
        
    },

    value: {
        gameVelocity: 1000,
        hitPosition: 0,
        result: 0,
        currenttime: 60,
    },
    actions: {
        timerId: setInterval(randomSquare, 1000),
        countDownTimerId: setInterval(countDown, 1000),
    }


};

function countDown() {
    state.value.currenttime--;
    state.view.timeLeft[0].textContent = state.value.currenttime;
    
    if (state.value.currenttime < 0) {
        clearInterval(state.actions.countDownTimerId);
        clearInterval(state.actions.timerId);
        alert("Game Over! O seu resultado foi " + state.value.result);
        playSound("gameover") 
        setTimeout(function() {
            window.location.reload();
        }, 3000);
    }
}

function playSound(audioName) {
    let audio = new Audio(`./audios/${audioName}.m4a`);
    audio.volume = 0.2;
    audio.play();
}

function randomSquare() {
    state.view.squares.forEach((square) => {
        square.classList.remove("enemy");
    });

    let randomNumber = Math.floor(Math.random() * 9);
    let randomSquare = state.view.squares[randomNumber];
    randomSquare.classList.add("enemy");
    state.value.hitPosition = randomSquare.id;
}



function addListernerHitbox() {
    state.view.squares.forEach((square) => {
        square.addEventListener("mousedown", () => {
            if (square.id === state.value.hitPosition) {
                state.value.result++;
                state.view.score[0].textContent = state.value.result;
                state.value.hitPosition = null;
                playSound("hit");
            }
        })
    });
}

function initialize() {
    addListernerHitbox();
}

initialize();


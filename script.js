const startBtn = document.querySelector(".start-btn");
const startPage = document.querySelector(".container");
const game = document.querySelector(".game");
const cells = document.querySelectorAll(".cells");
const result = document.querySelector(".result");
const restartBtn = document.querySelector(".restart-btn");
const player1Input = document.querySelector(".player1-input");
const player2Input = document.querySelector(".player2-input");

let player1, player2;
const WinningCombinations = [
    [0, 1, 2], [3, 4, 5], [6, 7, 8], [0, 3, 6], [1, 4, 7], [2, 5, 8], [0, 4, 8], [2, 4, 6]
]
let player1Turn;

startBtn.addEventListener('click', () => {
    player1 = player1Input.value;
    player2 = player2Input.value;
    if(player1 == "" || player2 == "") {
        alert("Please fill the fields");
    }
    else {
        startPage.classList.add('hide');
        game.classList.remove('hide');
        startGame();
    }
})

restartBtn.addEventListener('click', () => {
    result.classList.add('hide');
    restartBtn.classList.add('hide');
    startGame();
})


function startGame() {
    cells.forEach(cell => {
        cell.innerText = ' ';
        player1Turn = true;
        cell.addEventListener('click', handleMove, {once : true});
    });
}

function checkDraw() {
    return [...cells].every(cell => {
        return (cell.innerText == "X" || cell.innerText == "O");
    })
}

function playMove(cell, current) {
    cell.innerText = current;
    player1Turn = !player1Turn;
}

function checkWin(current) {
    return WinningCombinations.some(combination => {
        return combination.every(index => {
            return cells[index].innerText == current
        })
    })
}

function handleMove(e) {
    const cell = e.target;
    const current = player1Turn ? 'X' : 'O';
    playMove(cell, current);
    if(checkWin(current)) {
        restartBtn.classList.remove('hide');
        result.innerText = player1Turn ? `${player2} wins!` : `${player1} wins!`;
        result.classList.remove('hide');    
        endGame();
    }
    else if(checkDraw()) {
        restartBtn.classList.remove('hide');
        result.innerText = 'Draw!';
        result.classList.remove('hide');
    }
}

function endGame() {
    cells.forEach(cell => {
        cell.removeEventListener('click', handleMove);
    })
}

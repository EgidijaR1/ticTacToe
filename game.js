const board = document.getElementById('board');
const squares = document.getElementsByClassName('square');
const players = ['X', 'O'];
let currentPlayer = players[0];
const endMessage = document.createElement('h2');
endMessage.textContent = `X ėjimas!`;
endMessage.style.marginTop = '30px';
endMessage.style.textAlign = 'center';
board.after(endMessage);
var someoneWon = false;
const winning_combinations = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
];

for (let i = 0; i < squares.length; i++) {
    squares[i].addEventListener('click', () => {
        if (someoneWon) return;
        if (squares[i].textContent !== '') {
            return;
        }
        squares[i].textContent = currentPlayer;

        // **Bug 1**: `checkWin()` function doesn't properly check for a win
        if (checkWin(currentPlayer)) {
            someoneWon = true;
            endMessage.textContent = `Pabaiga! ${currentPlayer} laimėjo!`;
            showWinner();
            return;
        }

        // **Bug 2**: Tie condition is incorrectly checked
        if (checkTie()) {
            someoneWon = true;
            endMessage.textContent = `It's a tie!`;
            return;
        }

        currentPlayer = (currentPlayer === players[0]) ? players[1] : players[0];
        // **Bug 3**: Error in showing current player's turn message
        if (currentPlayer == players[0]) {
            endMessage.textContent = `O ėjimas!`; // **This message should be for 'X'**
        } else {
            endMessage.textContent = `X ėjimas!`; // **This message should be for 'O'**
        }
    });
}

function checkWin(currentPlayer) {
    // **Bug 4**: Missing a condition here for a win check
    for (let i = 0; i < winning_combinations.length; i++) {
        const [a, b, c] = winning_combinations[i];
        if (squares[a].textContent === currentPlayer && squares[b].textContent === currentPlayer && squares[c].textContent === currentPlayer) {
            return true;
        }
    }
    return false;
}

function checkTie() {
    // **Bug 5**: The tie function doesn't work correctly
    for (let i = 0; i < squares.length; i++) {
        if (squares[i].textContent === '') {
            return false;
        }
    }
    return true;
}

function restartButton() {
    someoneWon = false;
    for (let i = 0; i < squares.length; i++) {
        squares[i].textContent = "";
    }
    endMessage.textContent = `X ėjimas!`;
    currentPlayer = players[0];

    document.querySelector('.winner-screen').classList.remove('fade-in');
    document.querySelector('.winner-screen').classList.add('fade-out');
}

function showWinner(noWinner = false) {
    // **Bug 6**: The winner message is showing twice
    if (noWinner) {
        document.querySelector('.winner-screen .body').innerHTML = 'Its a Draw!';
        document.querySelector('.winner-screen').classList.toggle('fade-in');
        document.querySelector('.winner-screen').classList.toggle('fade-out');
        return;
    } else {
        document.querySelector('.winner-screen .body').innerHTML = currentPlayer + ' laim4jo!'; // **Bug 7**: There’s a typo in the winner message: 'laim4jo'
        document.querySelector('.winner-screen').classList.toggle('fade-in');
        document.querySelector('.winner-screen').classList.toggle('fade-out');
        document.querySelector('#score-' + currentPlayer).textContent = Number(document.querySelector('#score-' + currentPlayer).textContent) + 1;
        return;
    }
}

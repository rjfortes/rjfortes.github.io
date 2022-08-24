var result = document.getElementById("result");
var currentPlayer = "player1";
var gameBoard;
var columnCounter;
var score_player1 = 0;
var score_player2 = 0;
var winner = false;
var aiMode;

function human() {
    aiMode = false;
    game();
}

function ai() {
    aiMode = true;
    game();
}

function game() {
    document.getElementById("gameMode").style.display = "none";
    document.getElementById("playerTurn").style.display = "block";
    gameBoard = [];
    columnCounter = new Array();

    for (let x = 0; x < 6; x++) {
        let row = [];
        for (let y = 0; y < 7; y++) {
            columnCounter[y] = 5;
            let createDiv = document.createElement("div");
            createDiv.classList.add("circle");
            createDiv.id = x.toString() + "-" + y.toString();
            document.getElementById("connect4").appendChild(createDiv);  
            createDiv.addEventListener("click", gamePlay);
            row.push(" "); 
        }
        gameBoard.push(row);
    }
}

function gamePlay() {
    let clickID = this.id.split("-");
    let row = parseInt(clickID[0]);
    let col = parseInt(clickID[1]);
    row = columnCounter[col];

    if (row >= 0) {
        gameBoard[row][col] = currentPlayer;

        let circle = document.getElementById(row.toString() + "-" + col.toString());

        if (currentPlayer == "player1") {
            circle.classList.add("player1");
            currentPlayer = "player2";
            document.getElementById("turn").innerHTML = "2";
        } else if (currentPlayer == "player2") {
            circle.classList.add("player2");
            currentPlayer = "player1";
            document.getElementById("turn").innerHTML = "1";gameBoard
        }
        row -= 1;
        columnCounter[col] = row;
        patternCheck();

        if (aiMode) {
            aiMoves();
        }
    } 
}

function aiMoves () {
    let col = Math.floor(Math.random() * 7); 
    while (columnCounter[col] < 0) {
        col = Math.floor(Math.random() * 7);
    }
    let row = columnCounter[col];
    if (row >= 0 && currentPlayer == "player2") {
        document.getElementById(row.toString() +"-" + col.toString()).click();
    }
}
    
function patternCheck() {
    //tie
    let columnChecker = columnCounter.every(function(e) {
        return e < 0;
    });

    if (columnChecker) {
        result.innerHTML = "Draw";
        gameOver();
    }

    //horizontal
    for (r = 0; r < 6; r++)
        for (c = 0; c < 4; c++)
            if (lineCheck(gameBoard[r][c], gameBoard[r][c+1], gameBoard[r][c+2], gameBoard[r][c+3]))
            setWinner(r, c);

    //vertical
    for (r = 0; r < 3; r++)
        for (c = 0; c < 7; c++)
            if (lineCheck(gameBoard[r][c], gameBoard[r+1][c], gameBoard[r+2][c], gameBoard[r+3][c]))
            setWinner(r, c);

    //diagonal
    for (r = 3; r < 6; r++)
        for (c = 0; c < 4; c++)
            if (lineCheck(gameBoard[r][c], gameBoard[r-1][c+1], gameBoard[r-2][c+2], gameBoard[r-3][c+3]))
            setWinner(r, c);

    //anti-diagonal
    for (r = 0; r < 3; r++)
        for (c = 0; c < 4; c++)
            if (lineCheck(gameBoard[r][c], gameBoard[r+1][c+1], gameBoard[r+2][c+2], gameBoard[r+3][c+3]))
            setWinner(r, c);

    return 0;
}

function lineCheck(a, b, c, d) {
    return ((a != 0) && (a == b) && (a == c) && (a == d));
}

function gameOver() {
    result.style.display = "block";
    document.getElementById("rematch").style.display = "inline";
    document.getElementById("newGame").style.display = "inline";
    let element = document.getElementsByClassName("circle");
    for (let x = 0; x < element.length; x++) {
        element[x].removeEventListener("click", gamePlay);
    }
    currentPlayer = "player1";
}

function rematch() {
    document.getElementById("score").style.display = "block";
    document.getElementById("score_player1").innerHTML = score_player1;
    document.getElementById("score_player2").innerHTML = score_player2;
    document.getElementById("rematch").style.display = "none";
    document.getElementById("newGame").style.display = "none";
    result.style.display = "none";
    let child = document.getElementById("connect4").lastElementChild;
    while (child) {
        document.getElementById("connect4").removeChild(child);
        child = document.getElementById("connect4").lastElementChild;
    }
    game();
}

function newGame() {
    location.reload();
}

function setWinner(r, c) {
    if (gameBoard[r][c] == 'player1') {
        result.innerHTML = "Red Wins";   
        score_player1++;
    } else {
        result.innerHTML = "Yellow Wins";
        score_player2++;
    }
    gameOver();
}

var numbers = [];
var extractedNumbers = [];
var numPlayerBoards = 0;
var playerBoards = [];

function createBoard() {
  var boardContainer = document.getElementById("board");

  for (var i = 1; i <= 76; i++) {
    var cell = document.createElement("div");
    cell.className = "board-cell";
    cell.innerText = i;
    boardContainer.appendChild(cell);
    numbers.push(i);
  }
}

function createPlayerBoard() {
  var playerBoardContainer = document.createElement("div");
  playerBoardContainer.className = "player-board";
  playerBoardContainer.id = "player-board-" + numPlayerBoards;

  var playerNumbers = numbers.slice(); 

  for (var i = 0; i < 3; i++) {
    var playerRow = document.createElement("div");
    playerRow.className = "player-row";

    for (var j = 0; j < 8; j++) {
      var index = Math.floor(Math.random() * playerNumbers.length);
      var number = playerNumbers[index];
      playerNumbers.splice(index, 1);

      var cell = document.createElement("div");
      cell.className = "player-cell";
      cell.innerText = number;
      playerRow.appendChild(cell);
    }

    playerBoardContainer.appendChild(playerRow);
  }

  document.getElementById("player-boards").appendChild(playerBoardContainer);
  playerBoards.push(playerBoardContainer);
  numPlayerBoards++;
}

function extractNumber() {
  if (numbers.length === 0) {
    alert("Tutti i numeri sono stati estratti!");
    return;
  }

  var extractedNumber = numbers[Math.floor(Math.random() * numbers.length)];
  numbers = numbers.filter(function (num) {
    return num !== extractedNumber;
  });
  extractedNumbers.push(extractedNumber);

  var boardCells = document.getElementsByClassName("board-cell");
  for (var i = 0; i < boardCells.length; i++) {
    var cell = boardCells[i];
    if (cell.innerText == extractedNumber) {
      cell.classList.add("selected");
      break;
    }
  }

  for (var j = 0; j < playerBoards.length; j++) {
    var playerBoardRows = playerBoards[j].getElementsByClassName("player-row");
    for (var k = 0; k < playerBoardRows.length; k++) {
      var playerRowCells = playerBoardRows[k].getElementsByClassName("player-cell");
      for (var l = 0; l < playerRowCells.length; l++) {
        var playerCell = playerRowCells[l];
        if (playerCell.innerText == extractedNumber) {
          playerCell.classList.add("selected");
          break;
        }
      }
    }
  }

  checkForTombola();
}

function checkForTombola() {
  var allCellsSelected = true;
  for (var i = 0; i < playerBoards.length; i++) {
    var playerBoardRows = playerBoards[i].getElementsByClassName("player-row");
    for (var j = 0; j < playerBoardRows.length; j++) {
      var playerRowCells = playerBoardRows[j].getElementsByClassName("player-cell");
      for (var k = 0; k < playerRowCells.length; k++) {
        var playerCell = playerRowCells[k];
        if (!playerCell.classList.contains("selected")) {
          allCellsSelected = false;
          break;
        }
      }
      if (!allCellsSelected) {
        break;
      }
    }
    if (!allCellsSelected) {
      break;
    }
  }
  if (allCellsSelected) {
    setTimeout(function () {
      alert("!TOMBOLA!");
    }, 500);
  }
}

function startGame() {
  var numBoards = parseInt(prompt("Inserisci il numero di tabelline da giocare:", "1"));

  if (isNaN(numBoards) || numBoards < 1) {
    alert("Inserisci un numero valido!");
    return;
  }

  for (var i = 0; i < numBoards; i++) {
    createPlayerBoard();
  }
}

createBoard();
startGame();
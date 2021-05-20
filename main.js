'use strict';
console.log('funguju');

let whosTurn = 'circle';

const playerElm = document.querySelector('#player');
const boardSize = 10;
const symbolsToWin = 5;

const nowPlays = (event) => {
  if (whosTurn === 'circle') {
    event.target.classList.add('board__field--circle');
    event.target.disabled = true;
    playerElm.src = 'images/cross.svg';
    playerElm.alt = 'křížek';
    whosTurn = 'cross';
    if (isWinningMove(event.target) === true) {
      const confirmation = confirm('Vyhrálo kolečko. Spustit novou hru?');
      if (confirmation === true) {
        location.reload();
      }
    }
  } else {
    event.target.classList.add('board__field--cross');
    event.target.disabled = true;
    playerElm.src = 'images/circle.svg';
    playerElm.alt = 'kolečko';
    whosTurn = 'circle';
    if (isWinningMove(event.target) === true) {
      const confirmation = confirm('Vyhrál křížek. Spustit novou hru?');
      if (confirmation === true) {
        location.reload();
      }
    }
  }
};

const btnElm = document.querySelectorAll('.game__field');
for (let i = 0; i < btnElm.length; i += 1) {
  btnElm[i].addEventListener('click', nowPlays);
}

// ÚKOL 5

const getSymbol = (field) => {
  console.log(field.classList);
  if (field.classList.contains('board__field--cross')) {
    return 'cross';
  } else if (field.classList.contains('board__field--circle')) {
    return 'circle';
  }
};

const fields = document.querySelectorAll('.game__field');
const getField = (row, column) => fields[row * boardSize + column];

const getPosition = (field) => {
  let fieldIndex = 0;
  while (fieldIndex < fields.length && field !== fields[fieldIndex]) {
    fieldIndex++;
  }

  return {
    row: Math.floor(fieldIndex / boardSize),
    column: fieldIndex % boardSize,
  };
};

const isWinningMove = (field) => {
  const origin = getPosition(field);
  const symbol = getSymbol(field);

  let i;

  let inRow = 1;

  // left check-up
  i = origin.column;
  while (i > 0 && symbol === getSymbol(getField(origin.row, i - 1))) {
    inRow++;
    i--;
  }

  // right check-up
  i = origin.column;
  while (
    i < boardSize - 1 &&
    symbol === getSymbol(getField(origin.row, i + 1))
  ) {
    inRow++;
    i++;
  }

  if (inRow >= symbolsToWin) {
    return true;
  }

  let inColumn = 1;
  // up check-up
  i = origin.row;
  while (i > 0 && symbol === getSymbol(getField(i - 1, origin.column))) {
    inColumn++;
    i--;
  }

  // down check-up
  i = origin.row;
  while (
    i < boardSize - 1 &&
    symbol === getSymbol(getField(i + 1, origin.column))
  ) {
    inColumn++;
    i++;
  }

  if (inColumn >= symbolsToWin) {
    return true;
  }
  return false;
};

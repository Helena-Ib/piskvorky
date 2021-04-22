'use strict';
console.log('funguju');

let whosTurn = 'circle';

const playerElm = document.querySelector('#player');

const nowPlays = (event) => {
  if (whosTurn === 'circle') {
    event.target.classList.add('board__field--circle');
    event.target.disabled = true;
    playerElm.src = 'images/cross.svg';
    playerElm.alt = 'křížek';
    whosTurn = 'cross';
    console.log(whosTurn);
  } else {
    event.target.classList.add('board__field--cross');
    event.target.disabled = true;
    playerElm.src = 'images/circle.svg';
    playerElm.alt = 'kolečko';
    whosTurn = 'circle';
    console.log(whosTurn);
  }
};

const btnElm = document.querySelectorAll('.game__field');
for (let i = 0; i < btnElm.length; i += 1) {
  btnElm[i].addEventListener('click', nowPlays);
}

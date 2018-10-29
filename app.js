'use strict';

var GAME_IS_RUNNING = 1,
    GAME_IS_WINNED = 2,
    GAME_IS_NOT_STARTED = 0;

var number_flips,
    blocks,
    last_block,
    blocks,
    isReadyForAction,
    seconds,
    game_status = GAME_IS_NOT_STARTED,
    number_matches;

function setDefaultSettings() {
  game_status = GAME_IS_RUNNING;
  number_flips = 0,
  blocks = ['green', 'blue', 'purple', 'red', 'orange', 'yellow', 'black', 'gray'],
  last_block = null,
  blocks = shuffle( duplicateValues(blocks) ),
  isReadyForAction = true;
  time_text.innerText = 'XX:XX';
  seconds = 0;
  number_matches = 0;
}

function clearGrid() {
  grid.innerHTML = '';
}

function shuffle(array) {
  var randomIndex, tmp;
  array.forEach(function(value, i, array) {
    randomIndex = Math.floor(Math.random() * i);
    tmp = array[i];
    array[i] = array[randomIndex];
    array[randomIndex] = tmp;
  });

  return array;
}

function duplicateValues(array) {
  array.forEach(function(value) {
    array.push(value);
  });
  
  return array;
}

function getBlockColor(elem) {
  var front = elem.childNodes[0].childNodes[1],
      color = front.classList[1]

  return color;
}

function compareElements(elem){
  if ( getBlockColor(elem) == getBlockColor(last_block) ) {
    last_block = null;
    number_matches++;
  } else {
    setTimeout(function() {
      last_block.classList.toggle('hidden');
      elem.classList.toggle('hidden');   
      last_block = null;
      isReadyForAction = true;
    }, 600);
    isReadyForAction = false;
  }
}

function backSideOnClick(event) {
  if (!isReadyForAction) return false;
  
  var flip_container = event.target.parentElement.parentElement;
  flip_container.classList.toggle('hidden');
  number_flips++;
  
  if (last_block) {
    compareElements(flip_container);
  } else {
    last_block = flip_container;
  }
}

function ShowButton() {
  button_reset.className = '';
  button_start.className = 'hidden';
}

function Timer() {
  var min = Math.floor(seconds / 60),
      sec = seconds % 60;
  
  var min_str = min > 9 ? `${min}` : `0${min}`,
      sec_str = sec > 9 ? `${sec}` : `0${sec}`;

  time_text.innerText = '' + min_str + ':' + sec_str;
  seconds++;

  if (number_matches == blocks.length / 2) {

    time_text.innerText = 'XX:XX';
    game_status = GAME_IS_WINNED;
    return false;
  }

  setTimeout(Timer, 1000);
}

function StartGame() {
  setDefaultSettings();
  clearGrid();
  ShowButton();
  Timer();

  grid.classList.remove('hidden');

  blocks.forEach(function(value, i, arr) {
    var flip_container = document.createElement('div'),
        flipper = document.createElement('div'),
        front = document.createElement('div'),
        back = document.createElement('div');
    
    flip_container.className = 'flip-container hidden';
    flipper.className = 'flipper';
    back.className = 'back coin-white';
    front.className = 'front coin-' + value;
    
    flipper.appendChild(back);
    flipper.appendChild(front);
    flip_container.appendChild(flipper);
    
    back.addEventListener('click', backSideOnClick);
    
    grid.appendChild(flip_container);
  });
  
}

time_text.innerText = 'XX:XX';

button_start.onclick = function() {
  StartGame();
}

button_reset.onclick = function() {
  StartGame();
}

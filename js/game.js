'use strict';

function Game() {

  var GAME_IS_RUNNING = 0,
      GAME_IS_WINNED = 1,
      GAME_IS_NOT_STARTED = 2,
      GAME_RESET = 3;

  var status, blocks, runtime, number_flips, number_flips, number_matches, is_ready, last_block, ui;

  function setDefaultSettings() {
    status = GAME_IS_NOT_STARTED;
    blocks = ['green', 'blue', 'purple', 'red', 'orange', 'yellow', 'black', 'gray'];
    blocks = shuffle( dublicateValues( blocks ) );
    runtime = 0;
    number_flips = 0;
    number_matches = 0;
    is_ready = true;
    last_block = null;
    ui.setNullTime();
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
        last_block.classList.toggle('hidden'); elem.classList.toggle('hidden');
        last_block = null;
        is_ready = true;
      }, 600);
      is_ready = false;
    }
  }

  function blockOnClick(event) {
    if (!is_ready) return false;

    var flip_container = event.target.parentElement.parentElement;
    flip_container.classList.toggle('hidden');
    number_flips++;

    if (last_block) {
      compareElements(flip_container);
    } else {
      last_block = flip_container;
    }
  }

  function loop() {
    ui.updateTimer(runtime);
    runtime++;

    if (number_matches == blocks.length / 2) {
      ui.setNullTime();
      status = GAME_IS_WINNED;
      return false;
    }

    if (status == GAME_RESET) {
      ui.setNullTime();
      ui.hideGrid();
      ui.switchButton('start');
      return false;
    }

    setTimeout(loop, 1000);
  }

  function start() {
    setDefaultSettings();
    status = GAME_IS_RUNNING;
    ui.clearGrid();
    ui.showGrid();
    ui.switchButton('reset');
    loop();

    blocks.forEach(function(value, i, arr) {
      ui.appendBlock(value);
    });
  }

  function reset() {
    status = GAME_RESET;
    loop();
  }

  this.init = function() {
    status = GAME_IS_NOT_STARTED;
    ui = new UserInterface({
      function: {
        start: start,
        reset: reset,
        blockOnClick: blockOnClick
      }
    });
  }
}

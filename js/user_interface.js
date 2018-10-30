'use strict';

function UserInterface(parameters) {

  var grid = document.getElementById('grid'),
      time_text = document.getElementById('time_text'),
      button_reset = document.getElementById('button_reset'),
      button_start = document.getElementById('button_start');

  button_reset.onclick = parameters.function.reset;
  button_start.onclick = parameters.function.start;

  this.clearGrid = function() { 
    grid.innerHTML = '';
  }

  this.hideGrid = function() {
    grid.classList.add('hidden');
  }
  this.hideGrid();

  this.showGrid = function() {
    grid.classList.remove('hidden');
  }

  this.setNullTime = function() {
    time_text.innerText = 'XX:XX';
  }
  this.setNullTime();

  this.appendBlock = function(type) {
    var flip_container = document.createElement('div'),
      flipper = document.createElement('div'),
      front = document.createElement('div'),
      back = document.createElement('div');

    flip_container.className = 'flip-container hidden';
    flipper.className = 'flipper';
    back.className = 'back block-white';
    front.className = 'front block-' + type;

    flipper.appendChild(back);
    flipper.appendChild(front);
    flip_container.appendChild(flipper);

    back.addEventListener('click', parameters.function.blockOnClick);

    grid.appendChild(flip_container);
  }

  this.switchButton = function(to) {
    if (to == "reset") {
      button_reset.className = '';
      button_start.className = 'hidden';
    } else if (to == "start") {
      button_start.className = '';
      button_reset.className = 'hidden';
    }
  }

  this.updateTimer = function(runtime) {
    var minutes = Math.floor(runtime / 60),
      seconds = runtime % 60;

    var minutes_str = minutes > 9 ? `${minutes}` : `0${minutes}`,
      seconds_str = seconds > 9 ? `${seconds}` : `0${seconds}`;

    time_text.innerText = minutes_str + ':' + seconds_str;
  }
}

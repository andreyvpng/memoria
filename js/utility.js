'use strict';

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

function dublicateValues(array) {
  array.forEach(function(value, i, array) {
    array.push(value);
  });

  return array;
}

'use strict';

Array.prototype.__proto__.shuffle = function() {
  var randomIndex, tmp;
  this.forEach(function(value, i, array) {
    randomIndex = Math.floor(Math.random() * i);
    tmp = array[i];
    array[i] = array[randomIndex];
    array[randomIndex] = tmp;
  });

  return this;
}

Array.prototype.__proto__.dublicateValues = function() {
  this.forEach(function(value, i, array) {
    array.push(value);
  });

  return this;
}

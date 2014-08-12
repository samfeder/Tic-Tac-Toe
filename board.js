var _ = require('underscore');

function Board() {
  this.grid = [[" ", " ", " "],
                [" ", " ", " "],
                [" ", " ", " "]]
  this.winner = null
}

Board.prototype.render = function(){
  for (var i =0; i<3; i++){
    console.log(this.grid[i]);
  }
}

Board.prototype.won = function() {
  for (var i = 0; i < 3; i++) {
    this._checkRow(this.grid[i])
  }

  for (var j = 0; j < 3; j++) {
    this._checkRow(_.zip.apply(_, this.grid)[j])
}

  this._checkDiags(this.grid)

  return this.winner !== null;
}

Board.prototype._checkDiags = function(grid) {
  if ((grid[1][1] !== " " && //ensure that center is filled
      ((_.uniq([ grid[0][0], grid[1][1], grid[2][2] ]).length == 1) ||
        _.uniq([ grid[2][0], grid[1][1], grid[0][2] ]).length == 1))) {
    this.winner = grid[1][1] //returns winning string
  }
}

Board.prototype._checkRow = function(row) {
  if (_.uniq(row).length === 1 && row[0] !== " ") {
    this.winner = row[0];
  }
}

Board.prototype.empty = function(pos) {
  return this.grid[pos[0]][pos[1]] === " " ? true : false;
}

Board.prototype.placeMark = function(pos, mark) {
  this.grid[pos[0]][pos[1]] = mark;
}

module.exports = Board;
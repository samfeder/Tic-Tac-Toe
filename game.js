var Board = require('./board.js');
var readline = require('readline');

function Game() {
  this.player1 = {
    marker: "x"
  };

  this.player2 = {
    marker: "o"
  };

  this.board = new Board();

  this.reader = readline.createInterface({
    input: process.stdin,
    output: process.stdout
  });

  this.turn = this.player1;
};

Game.prototype.play = function() {
  this.promptMove();
};

Game.prototype.promptMove = function() {
  this.board.render();
  var that = this;

  that.reader.question("Where to place mark: ", function(pos) {
    var playPos = that.formatPos(pos);

    if (that.board.empty(playPos)) {
      that.board.placeMark(playPos, that.turn.marker);
      that.toggleTurn();
    } else {
      console.log(playPos + " is not valid.");
    }

    if (that.board.won() !== true) {
      that.promptMove();
    } else {
      console.log(that.board.winner + " is the winner!");
      that.reader.close();
    }
  });
}

Game.prototype.formatPos = function(pos) {
  return pos.split(",");
};

Game.prototype.toggleTurn = function() {
  this.turn = this.turn == this.player1 ? this.player2 : this.player1;
};


g = new Game();
g.play();

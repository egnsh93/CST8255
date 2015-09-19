/*global Ship, DetectKey, Missile, Invader, $, alert, DetectCollision, Explosion*/

var ship = new Ship();
var missile = [];
var invader = [];
var keys = new DetectKey();
var collision = new DetectCollision();
var startDir = 'left';
var score = 0;

var Config = {
    'canvas': $('#gameScreen')[0],
    'width': 450,
    'height': 502,
    'ctx': $('#gameScreen')[0].getContext('2d'),
    'interval': 1000 / 60
};

var Game = function () {
    'use strict';

    this.canvas = Config.canvas;
    this.canvas_width = Config.width;
    this.canvas_height = Config.height;
    this.canvas_ctx = Config.ctx;
    this.interval = Config.interval;

    this.DrawWorld = function () {
        // Fill the canvas
        this.canvas_ctx.fillStyle = '#000';
        this.canvas_ctx.fillRect(0, 0, this.canvas_width, this.canvas_height);

        // Display the score label
        this.canvas_ctx.textAlign = 'left';
        this.canvas_ctx.font = '18px Georgia';
        this.canvas_ctx.fillStyle = '#fff';
        this.canvas_ctx.fillText('Score: ' + score, 10, 24);

        // Display the base
        this.canvas_ctx.fillRect((450 / 2) - 200, 472, 400, 5);
    };

    this.ClearWorld = function () {
        this.canvas_ctx.clearRect(0, 0, this.canvas_width, this.canvas_height);
    };

    this.DrawInvaders = function () {
        var numCols = 4,
            numRows = 5,
            startX = (Config.width / 2),
            startY = (Config.height / 5),
            newX,
            newY,
            x,
            y;

        for (x = 0; x < numRows; x += 1) {
            for (y = 0; y < numCols; y += 1) {
                newX = startX + (40 * x);
                newY = startY + (30 * y);
                invader[invader.length] = new Invader(newX, newY);
            }
        }
    };

    this.MoveObjects = function () {

        var currentDir = '',
            m,
            index;

        if (ship.left) {
            ship.MoveLeft();
        } else if (ship.right) {
            ship.MoveRight();
        }

        // Iterate through each missile
        for (m in missile) {
            // First check if there are missiles
            if (missile.hasOwnProperty(m)) {
                // Draw to the canvas
                missile[m].Draw();

                // Remove the first element
                if (missile[m].Move()) {
                    missile.splice(m, 1);
                }
            }
        }

        for (index in invader) {
            if (invader.hasOwnProperty(index)) {
                currentDir = invader[index].checkStep();
                if (currentDir !== startDir) {
                    break;
                }
            }
        }

        for (index in invader) {

            if (invader.hasOwnProperty(index)) {
                invader[index].Draw();

                if (currentDir !== startDir) {
                    invader[index].Advance();
                } else {
                    invader[index].Move();
                }
            }
        }
        startDir = currentDir;
    };

    this.DetectCollision = function () {
        var m,
            i;

        // Detect collision between missile and invader
        for (m in missile) {
            if (missile.hasOwnProperty(m)) {
                for (i in invader) {
                    if (invader.hasOwnProperty(i)) {
                        if (collision.Check(missile[m], invader[i])) {
                            // Remove from the array
                            missile.splice(m, 1);
                            invader.splice(i, 1);

                            // Update the score
                            // @TODO extract this to a separate class
                            score += 20;
                            break;
                        }
                    }
                }
            }
        }

        for (i in invader) {
            if (invader.hasOwnProperty(i)) {
                if (collision.Check(invader[i], ship)) {
                    alert("Game Over. Your score is " + score);
                }
            }
        }
    };

    this.Loop = function () {

        // Clear the canvas
        this.ClearWorld();

        // Draw the canvas
        this.DrawWorld();

        // Draw the ship
        ship.Draw();

        // Update the canvas
        this.MoveObjects();

        // Collision Detection
        this.DetectCollision();

        // Recursively call the loop
        var self = this; // god damn you javascript...saves the instance of THIS
        setTimeout(function () {
            self.Loop();
        }, Config.interval);
    };

};

window.onkeypress = function (e) {
    'use strict';
    keys.keyPress(e);
};

window.onkeyup = function (e) {
    'use strict';
    keys.keyUp(e);
};

var spaceInvaders = new Game();

spaceInvaders.DrawInvaders();
spaceInvaders.Loop();
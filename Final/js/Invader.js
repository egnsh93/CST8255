/*global ImageAsset, Config*/
var Invader = function (x, y) {
    'use strict';

    // Public properties
    this.width = 30;
    this.height = 20;
    this.asset = new ImageAsset(1.5);
    this.flag = 0;

    if (this.flag === 0) {
        this.src = 'images/game/invader_state_down.png';
    } else {
        this.src = 'images/game/invader_state_up.png';
    }

    this.asset.Init(this.src, this.width, this.height);
    this.asset.StartPos(x, y);

    var currentDir = 'left';

    this.Draw = function () {
        this.asset.Draw();
    };

    // Move the invaders
    this.Move = function () {
        if (currentDir === 'left') {
            this.asset.MoveLeft();
        } else if (currentDir === 'right') {
            this.asset.MoveRight();
        }
    };

    this.Advance = function () {
        if (currentDir === 'left') {
            currentDir = 'right';
        } else {
            currentDir = 'left';
        }
        this.asset.Advance();
    };

    // Moves the invaders in a type writer fashion
    this.checkStep = function () {
        if (this.asset.x <= 38 && currentDir === 'left') {
            currentDir = 'right';
        } else if (this.asset.x >= (Config.width - 38) && currentDir === 'right') {
            currentDir = 'left';
        }
        return currentDir;
    };

    this.GetPosX = function () {
        return this.asset.x;
    };

    this.GetPosY = function () {
        return this.asset.y;
    };
};
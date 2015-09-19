/*global ImageAsset, Config, alert*/
var Ship = function () {
    'use strict';

    // Public properties
    this.left = false;
    this.right = false;
    this.width = 30;
    this.height = 20;
    this.src = 'images/game/ship.png';

    var asset = new ImageAsset(4);

    // Set the initial properties and position of the sprite
    asset.Init(this.src, this.width, this.height);
    asset.StartPos(450 / 2, 502 - 41);

    this.Draw = function () {
        asset.Draw();
    };

    this.MoveLeft = function () {
        asset.MoveLeft();
    };

    this.MoveRight = function () {
        asset.MoveRight();
    };

    this.GetPosX = function () {
        return asset.x;
    };

    this.GetPosY = function () {
        return asset.y;
    };
};
/*global Config*/
var ImageAsset = function (speed) {
    'use strict';

    // Set the speed of the sprite
    this.speed = speed;

    /* Set the initial properties of the sprite */
    this.Init = function (src, width, height) {
        this.image = new Image();
        this.image.src = src;
        this.width = width;
        this.height = height;
    };

    /* Set the starting coordinates of the sprite */
    this.StartPos = function (initPosX, initPosY) {
        this.x = initPosX;
        this.y = initPosY;
    };

    /* Update the sprites coordinates */
    this.UpdatePos = function (x, y) {
        if ((x > 37) && (x < Config.width - 37)) {
            this.x = x;
            this.y = y;
        }
    };

    /* Draws a sprite object to the canvas */
    this.Draw = function () {
        var x = this.x - (this.width / 2),
            y = this.y - (this.height / 2);

        Config.ctx.drawImage(this.image, x, y);
    };

    /* Update the position to the left */
    this.MoveLeft = function () {
        this.UpdatePos(this.x - speed, this.y);
    };

    /* Update the position to the right */
    this.MoveRight = function () {
        this.UpdatePos(this.x + speed, this.y);
    };

    /* Update the y-coordinates */
    this.Advance = function () {
        this.UpdatePos(this.x, this.y + (speed * 10));
    };
};
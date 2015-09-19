/*global Config*/
var Missile = function (ship, vel) {
    'use strict';

    // Public properties
    this.x = ship.GetPosX() - 1;
    this.y = ship.GetPosY() - 20;
    this.width = 3;
    this.height = 10;
    this.vel = vel;

    this.Draw = function () {
        Config.ctx.fillStyle = '#ff9600';
        Config.ctx.fillRect(this.x, this.y, this.width, this.height);
    };

    this.Move = function () {
        this.y = this.y - this.vel;
        if (this.y <= 0) {
            return true;
        }
        return false;
    };

    this.GetPosX = function () {
        return this.x;
    };

    this.GetPosY = function () {
        return this.y;
    };
};
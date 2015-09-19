/*global ship, missile, Missile*/
var DetectKey = function () {
    'use strict';

    // Create a controls object
    this.controls = {
        'left': 65,
        'right': 68,
        'shoot': 13
    };

    // Handles key press events
    this.keyPress = function (e) {
        var pressed = e.which || window.event.keyCode;

        // If the above controls are triggered, move the ship
        if (pressed === this.controls.left) {
            ship.left = true;
        } else if (pressed === this.controls.right) {
            ship.right = true;
        } else if (pressed === this.controls.shoot) {
            // Only allow for 3 missiles on the screen at one time
            if (missile.length < 3) {
                missile[missile.length] = new Missile(ship, 10);
            }
        }
    };

    // Handles key up events
    this.keyUp = function (e) {
        var pressed = e.which || window.event.keyCode;

        // If the above controls are triggered, stop the ship
        if (pressed === this.controls.left) {
            ship.left = false;
        } else if (pressed === this.controls.right) {
            ship.right = false;
        }
    };
};
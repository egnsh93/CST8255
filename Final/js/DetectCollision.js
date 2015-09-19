/*global alert*/
var DetectCollision = function () {
    'use strict';

    this.Check = function (obj1, obj2) {
        if ((obj1.GetPosY() + obj1.height) < obj2.GetPosY()) {
            return false;
        } else if (obj1.GetPosY() > (obj2.GetPosY() + obj2.height)) {
            return false;
        } else if ((obj1.GetPosX() + obj1.width) < obj2.GetPosX()) {
            return false;
        } else if (obj1.GetPosX() > (obj2.GetPosX() + obj2.width)) {
            return false;
        }
        return true;
    };

};
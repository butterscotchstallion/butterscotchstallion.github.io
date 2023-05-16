// @ts-nocheck
(() => {
    const el = document.getElementById("logo") || { style: { left: 0, top: 0 }};
    const logoSVG = document.getElementById('logo-svg');
    const elWidth = 200;
    const elHeight = 200;
    const vw = Math.max(document.documentElement.clientWidth || 0, window.innerWidth || 0);
    const vh = Math.max(document.documentElement.clientHeight || 0, window.innerHeight || 0);
    const interval = 150;
    const unit = "px";
    const DIRECTIONS = {
        "UP_LEFT": 0,
        "UP_RIGHT": 1,
        "DOWN_RIGHT": 2,
        "DOWN_LEFT": 3
    };
    const collisions = {};
    let direction = getRandomDirection();

    function addCollision(direction) {
        collisions[direction] = true;
    }

    function hasCollided(direction) {
        return typeof collisions[direction] === true;
    }

    function removeCollision(direction) {
        collisions[direction] = false;
    }

    function getOppositeDirection(direction) {
        switch (direction) {
            case DIRECTIONS.UP_LEFT:
                return DIRECTIONS.DOWN_RIGHT;
            case DIRECTIONS.UP_RIGHT:
                return DIRECTIONS.DOWN_LEFT;
            case DIRECTIONS.DOWN_LEFT:
                return DIRECTIONS.UP_RIGHT;
            case DIRECTIONS.DOWN_RIGHT:
                return DIRECTIONS.UP_LEFT;
        }
    }

    function getValueFromWithUnit(value) {
        let parsedValue = value;

        if (parsedValue) {
            if (parsedValue.indexOf(unit) !== -1) {
                parsedValue = value.split(unit)[0];
            }
            parsedValue = parseInt(parsedValue, 10);
        }

        return parsedValue;
    }

    function getDistance(direction) {
        const distance = 30;
        let topDistance = 0;
        let leftDistance = 0;
        switch(direction) {
            // Go down right
            case DIRECTIONS.UP_LEFT:
                topDistance = -distance;
                leftDistance = -distance;
            break;
            // Go down left
            case DIRECTIONS.UP_RIGHT:
                topDistance = -distance;
                leftDistance = distance;
            break;
            // Go up right
            case DIRECTIONS.DOWN_LEFT:
                topDistance = distance;
                leftDistance = -distance;
            break;
            // Go up left
            case DIRECTIONS.DOWN_RIGHT:
                topDistance = distance;
                leftDistance = distance;
            break;
        }
        return {
            top: topDistance,
            left: leftDistance
        };
    }

    function getRandomDirection() {
        return ~~(Math.random() * 4);
    }

    function isCollision(left, top) {
        const collisionBuffer = 150;
        const leftWithBuffer = left + collisionBuffer;
        const topWithBuffer = top + collisionBuffer;
        const leftCollision = (leftWithBuffer >= vw) || left <= 0;
        const topCollision = (topWithBuffer >= vh) || top <= 0;
        return {
            top: topCollision,
            left: leftCollision
        };
    }

    function setPosition(top, left) {
        el.style.left = left + unit;
        el.style.top = top + unit;
    }

    function randomChoice(directions) {
        return directions[~~(Math.random() * directions.length)];
    }

    /**
     * Choose direction based on how close the logo is
     * to the edge of the screen. For example, if the logo
     * is near the top then we should choose down right or
     * down left
     * 
     */
    function getDirectionBasedOnPosition() {
        const left = getValueFromWithUnit(el.style.left);
        const top = getValueFromWithUnit(el.style.top);
        const bottom = getValueFromWithUnit(el.style.bottom);
        const right = getValueFromWithUnit(el.style.right);
        const buffer = 150;
        const isNearTop = top <= buffer;
        const isNearLeft = left <= buffer;
        const isNearRight = left >= (vw - buffer);
        const isNearBottom = top >= (vh + buffer);

        let logMsg = "Near ";
        if (isNearTop) {
            logMsg += "top";
        } else if (isNearBottom) {
            logMsg += "bottom";
        } else if (isNearLeft) {
            logMsg += "left";
        } else if (isNearRight) {
            logMsg += "right";
        }
        console.log(logMsg);

        if (isNearTop && !isNearLeft) {
            return DIRECTIONS.DOWN_RIGHT;
        }

        if (isNearTop && isNearLeft) {
            return DIRECTIONS.DOWN_RIGHT;
        }

        if (isNearBottom && !isNearLeft) {
            return DIRECTIONS.UP_RIGHT;
        }

        if (isNearLeft && isNearBottom) {
            return DIRECTIONS.UP_RIGHT;
        }

        if (isNearRight && isNearBottom) {
            return DIRECTIONS.UP_LEFT;
        }

        if (isNearLeft && !isNearTop) {
            return DIRECTIONS.UP_RIGHT;
        }

        if (isNearRight && !isNearTop) {
            return DIRECTIONS.UP_LEFT;
        }

        if (isNearRight && isNearTop) {
            return DIRECTIONS.DOWN_LEFT;
        }

        return getRandomDirection();

        console.log('Unknown direction detected');
        debugger;
    }

    function getDirectionName(direction) {
        const names = {
            0: "Up Left",
            1: "Up Right",
            2: "Down Right",
            3: "Down Left"
        };
        return names[direction];
    }

    function getRandomColor() {
        // Random pastel color
        return `hsla(${~~(360 * Math.random())}, 70%,  72%, 0.8)`;
    }

    function move(elLeft, elTop) {
        const fallback = 150;
        const coords = {
            left: getValueFromWithUnit(elLeft),
            top: getValueFromWithUnit(elTop)
        };
        const distance = getDistance(direction);
        coords.left += distance.left;
        coords.top += distance.top;

        const willCollide = isCollision(coords.left, coords.top);

        if (willCollide.top) {
            console.log('Y collision');
            
            if (coords.top <= 0) {
                coords.top += fallback;
            } else {
                coords.top -= fallback;
            }
        }

        if (willCollide.left) {
            console.log('X collision');
            
            if (coords.left <= 0) {
                coords.left += fallback;
            } else {
                coords.left -= fallback;
            }
        }

        if (willCollide.top || willCollide.left) {
            addCollision(direction);
            console.log(collisions);

            if (hasCollided(direction)) {
                direction = getOppositeDirection(direction);
                removeCollision(direction);
                console.log("changed direction to "+direction);
            } else {
                changeDirection();
            }
            changeLogoColorToRandom();
        }

        setPosition(coords.top, coords.left);
    }

    function changeDirection() {
        direction = getDirectionBasedOnPosition();
        console.log('changing direction: '+getDirectionName(direction));
    }

    function changeLogoColorToRandom() {
        const color = getRandomColor();
        logoSVG.style.fill = color;
    }

    /**
     * 1. Get direction
     * 2. Get coords
     * 3. Adjust coords based on distance
     * 4. Adjust coords if logo will collide
     * 5. If a collision occurs, choose a new direction
     */
    function init() {
        setInterval(() => {
            move((el.style.left || 0).toString(), (el.style.top || 0).toString());
        }, interval);
    }

    document.addEventListener("DOMContentLoaded", init);
})();
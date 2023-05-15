// @ts-nocheck
(() => {
    const el = document.getElementById("logo") || { style: { left: 0, top: 0 }};
    const logoSVG = document.getElementById('logo-svg');
    const elWidth = 200;
    const elHeight = 200;
    const vw = Math.max(document.documentElement.clientWidth || 0, window.innerWidth || 0)
    const vh = Math.max(document.documentElement.clientHeight || 0, window.innerHeight || 0)
    const interval = 150;
    const unit = "px";
    const DIRECTIONS = {
        "UP_LEFT": 0,
        "UP_RIGHT": 1,
        "DOWN_RIGHT": 2,
        "DOWN_LEFT": 3
    };
    let direction = getRandomDirection();

    /**
     * The logo should move in a random direction of
     * these possibilities and continue in that direction
     * until a collision is hit.
     * 1. Up left
     * 2. Up right
     * 3. Down right
     * 4. Down left
     * @returns coords
     */
    function getNewCoords() {
        // Left and top are an empty string initially :)
        let curLeft = el.style.left || 0;
        let curTop = el.style.top || 0;
        let leftStr = curLeft.toString();
        let topStr = curTop.toString();

        // Get top and left values without unit
        if (leftStr.indexOf(unit) !== -1) {
            curLeft = parseInt(leftStr.split(unit)[0], 10);
        }

        if (topStr.indexOf(unit) !== -1) {
            curTop = parseInt(topStr.split(unit)[0], 10);
        }

        return {
            left: curLeft,
            top: curTop
        };
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

    function getNewDirection() {
        switch (direction) {
            case DIRECTIONS.UP_LEFT:
                return randomChoice([DIRECTIONS.DOWN_RIGHT, DIRECTIONS.DOWN_LEFT]);
            case DIRECTIONS.DOWN_LEFT:
                return randomChoice([DIRECTIONS.UP_RIGHT, DIRECTIONS.UP_LEFT]);
            case DIRECTIONS.DOWN_RIGHT:
                return randomChoice([DIRECTIONS.UP_LEFT, DIRECTIONS.UP_RIGHT]);
            case DIRECTIONS.UP_RIGHT:
                return randomChoice([DIRECTIONS.DOWN_LEFT, DIRECTIONS.DOWN_RIGHT]);
        }
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

    function move() {
        let collision = false;
        const fallback = 50;
        const coords = getNewCoords();
        const willCollide = isCollision(coords?.left, coords?.top);

        if (willCollide.top) {
            changeLogoColorToRandom();
            console.log('Y collision');
            
            if (coords.top <= 0) {
                coords.top += fallback;
            } else {
                coords.top -= fallback;
            }

            direction = getNewDirection();
            console.log('changing direction: '+getDirectionName(direction));
            collision = true;
        }

        if (willCollide.left) {
            changeLogoColorToRandom();
            console.log('X collision');
            
            if (coords.left <= 0) {
                coords.left += fallback;
            } else {
                coords.left -= fallback;
            }

            if (!collision) {
                direction = getNewDirection();
                console.log('changing direction: '+getDirectionName(direction));
            }
        }

        // Need to have this here to keep movement smooth
        const distance = getDistance(direction);
        coords.left += distance.left;
        coords.top += distance.top;

        setPosition(coords.top, coords.left);

        return coords;
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
            move();
        }, interval);
    }

    document.addEventListener("DOMContentLoaded", init);
})();
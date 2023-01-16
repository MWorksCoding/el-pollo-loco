let lastAction;

/**
 * Eventlistener for the keyboard, checks when key is pushed down.
 * Setting the keys for the keyboard / mobile.
 * Determine the time after pressing the key for setting the character to idle
 */
 window.addEventListener('keydown', (e) => {
    if (e.keyCode == 39) {
        keyboard.RIGHT = true;
        lastAction = new Date().getTime();
    }

    if (e.keyCode == 37) {
        keyboard.LEFT = true;
        lastAction = new Date().getTime();
    }

    if (e.keyCode == 38) {
        keyboard.UP = true;
        lastAction = new Date().getTime();
    }

    if (e.keyCode == 40) {
        keyboard.DOWN = true;
        lastAction = new Date().getTime();
    }

    if (e.keyCode == 32) {
        keyboard.SPACE = true;
        lastAction = new Date().getTime();
    }

    if (e.keyCode == 68) {
        keyboard.D = true;
        lastAction = new Date().getTime();
    }
})

/**
 * Eventlistener for the keyboard, checks when key is up
 */
window.addEventListener('keyup', (e) => {
    if (e.keyCode == 39) {
        keyboard.RIGHT = false;
    }

    if (e.keyCode == 37) {
        keyboard.LEFT = false;
    }

    if (e.keyCode == 38) {
        keyboard.UP = false;
    }

    if (e.keyCode == 40) {
        keyboard.DOWN = false;
    }

    if (e.keyCode == 32) {
        keyboard.SPACE = false;
    }

    if (e.keyCode == 68) {
        keyboard.D = false;
    }
})

/**
 * Touch events for the mobile version, checks start of touch
 */
window.addEventListener('touchstart', (e) => {
    if (e.target.id == 'right') {
        keyboard.RIGHT = true;
        lastAction = new Date().getTime();
    }

    if (e.target.id == 'left') {
        keyboard.LEFT = true;
        lastAction = new Date().getTime();

    }

    if (e.target.id == 'up') {
        keyboard.UP = true;
        lastAction = new Date().getTime();
    }

    if (e.target.id == 'throw') {
        keyboard.SPACE = true;
        lastAction = new Date().getTime();
    }
});

/**
 * Touch events for the mobile version, checks end of touch
 */
window.addEventListener('touchend', (e) => {
    if (e.target.id == 'right') {
        keyboard.RIGHT = false;
    }

    if (e.target.id == 'left') {
        keyboard.LEFT = false;
    }

    if (e.target.id == 'up') {
        keyboard.UP = false;
    }

    if (e.target.id == 'throw') {
        keyboard.SPACE = false;
    }
});


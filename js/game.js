let canvas;
let world;
let keyboard = new Keyboard();
let soundsNotMuted = true;
let sounds = new Sounds();
let fullscreenNotSet = true;

/**
 * Remove intro screen, create the world for gaming and play background music
 */
function init() {
    removeIntroScreen();
    canvas = document.getElementById('canvas');
    world = new World(canvas, keyboard);
    sounds.BACKGROUND_MUSIC_SOUND.play();
}

/**
 * Remove intro screen
 */
function removeIntroScreen() {
    document.getElementById('start-info-container').classList.add('d-none');
    document.getElementById('canvas-container').classList.remove('d-none');
}

/**
 * Option for muting the sound, switching the sound icon
 */
function soundOff() {
    if (soundsNotMuted == true) {
        document.getElementById('volume').src = `icons/volume_off.png`;
        soundsNotMuted = false;
        sounds.allSoundsOff();
    } else {
        document.getElementById('volume').src = `icons/volume_up.png`;
        soundsNotMuted = true;
        sounds.allSoundsOn();
    };
}

/**
 * Start fullscreen while playing the game
 */
function startFullscreenMode() {
    if (fullscreenNotSet == true) {
        document.getElementById('fullscreen').src = `icons/fullscreen_off.png`;
        document.getElementById('restart-btn').classList.add('restart-btn-new-position');
        fullscreenNotSet = false;
        fullscreen();
    } else {
        document.getElementById('fullscreen').src = `icons/fullscreen_on.png`;
        document.getElementById('restart-btn').classList.remove('restart-btn-new-position');
        fullscreenNotSet = true;
        exitFullscreen();
    };
}

/**
 * Running the fullscreen mode
 */
function fullscreen() {
    let fullscreen = document.getElementById('canvas-container');
    enterFullscreen(fullscreen);
}

/**
 * Running the fullscreen mode
 */
function enterFullscreen(fullscreen) {
    document.getElementById('canvas').classList.add('style-fullscreen');
    if (fullscreen.requestFullscreen) {
        fullscreen.requestFullscreen();
    } else if (fullscreen.msRequestFullscreen) {      // for IE11 (remove June 15, 2022)
        fullscreen.msRequestFullscreen();
    } else if (fullscreen.webkitRequestFullscreen) {  // iOS Safari
        fullscreen.webkitRequestFullscreen();
    }
}

/**
 * Set off the fullscreen mode
 */
function exitFullscreen() {
    document.getElementById('canvas').classList.remove('style-fullscreen');
    if (document.exitFullscreen) {
        document.exitFullscreen();
    } else if (document.webkitExitFullscreen) {
        document.webkitExitFullscreen();
    }
}
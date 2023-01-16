function loadingStartScreen() {
    document.getElementById('loading-start-screen').innerHTML =
 /*html*/ `

<div class="please_turn_device">
        <h1>Please turn your device</h1>
</div>
<div class="game-container">
        <div class="intro" id="start-info-container">
            <div class="start-info-container">
                <h1>Pepe Pelligroso and Invasion of the Chickens</h1>
                <p>The monster chicken has planned a invasion of Pepe's hometown.<br>
                    Now he has to defend his homeland against the rush of the crazy and voracious chickens.
                </p>
                <button onclick="init()" class="start-button">START</button>
                <div class="keys-panel">
                    <div>
                        <img src="icons/arrow_back.png" alt="key for moving left">
                        <span>move<br>left</span>
                    </div>
                    <div>
                        <img src="icons/arrow_forward.png" alt="key for moving right"> 
                        <span>move<br>right </span>
                    </div>
                    <div>
                        <img src="icons/arrow_upward.png" alt="key for jumping"> 
                        <span>jump</span>
                    </div>
                    <div>
                        <img src="icons/space_bar.png" alt="key for throwing a bottle"> 
                        <span>throw<br>bottle </span>
                    </div>
                </div>
            </div>
        </div>
    </div>

    <div id="canvas-container" class="canvas-container d-none">
        <div class="sound-panel">
            <img onclick="startFullscreenMode()" id="fullscreen" src="icons/fullscreen_on.png" alt="fullscreen on/off">
            <img onclick="soundOff()" id="volume" src="icons/volume_up.png" alt="volume up">
        </div>
        <canvas id="canvas" width="720" height="480"> </canvas>
        <div class="restart-btn d-none" id="restart-btn">
            <button>RESTART</button>
        </div>
        <div id="mobile-buttons-container" class="mobile-buttons-container">
            <div class="mobile-buttons-left">
                <img src="icons/arrow_back.png" id="left" alt="key for moving left">
                <img src="icons/arrow_forward.png" id="right" alt="key for moving right">
            </div>
            <div class="mobile-buttons-right">
                <img src="icons/arrow_upward.png" id="up" alt="key for jumping">
                <img src="icons/space_bar.png" id="throw" alt="key for throwing a bottle">
            </div>
        </div>
    </div>
    </div>
`;
}
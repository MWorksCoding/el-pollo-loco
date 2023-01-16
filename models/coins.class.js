class Coin extends MovableObject {

    width = 100;
    height = 100;
    COIN_IMAGES = [ // Set frame sequence for animation
        'img/8_coin/coin_1.png',
        'img/8_coin/coin_2.png'
    ];

    /**
    * The function constructor runs always automatically whenever we create a new instance of the class.
    * The function super() runs first so that we initialize the methods from the parent object.
    * loadImages() shows sequence of images from above.
    */
    constructor() {
        super().loadImage('img/8_coin/coin_1.png');
        this.loadImages(this.COIN_IMAGES);
        this.x = 350 + Math.random() * 2000;
        this.y = 75 + Math.random() * 250;
        this.animate();

    }

    /**
    * Runs the animation (sequence of images from above) for flashing.
    */
    animate() {
        setInterval(() => {
            this.playAnimation(this.COIN_IMAGES);
        }, 100);
    }
}
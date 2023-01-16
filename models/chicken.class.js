class Chicken extends MovableObject {
    y = 335;
    height = 100;
    IMAGES_WALKING = [ // Set frame sequence for animation
        'img/3_enemies_chicken/chicken_normal/1_walk/1_w.png',
        'img/3_enemies_chicken/chicken_normal/1_walk/2_w.png',
        'img/3_enemies_chicken/chicken_normal/1_walk/3_w.png'
    ];
    IMAGE_DEAD = new Image();
    isHit = false;
    chickenIntervalMovingLeft;
    chickenIntervalWalking;

    /**
    * The function constructor runs always automatically whenever we create a new instance of the class.
    * The function super() runs first so that we initialize the methods from the parent object.
    * loadImages() shows sequence of images from above.
    * this.x shows from which x value the chickens are displayed. Math.random() * 1500: the chickens are randomly distributed on the canvas.
    */
    constructor() {
        super().loadImage('img/3_enemies_chicken/chicken_normal/1_walk/1_w.png');
        this.loadImages(this.IMAGES_WALKING);
        this.IMAGE_DEAD.src = 'img/3_enemies_chicken/chicken_normal/2_dead/dead.png';

        this.x = 500 + Math.random() * 1500;

        this.speed = 0.18 + Math.random() * 0.25;
        this.animate();
    }

    /**
    * Runs the animation (sequence of images from above) for moving left, when the chicken is not dead.
    */
    animate() {
        this.chickenIntervalMovingLeft = setInterval(() => {
            if (this.isAlive) {
                this.moveLeft();
            }
        }, 1000 / 60);

        this.chickenIntervalWalking = setInterval(() => {
            if (this.isAlive) {
                this.playAnimation(this.IMAGES_WALKING);
            }
        }, 200);

    }
}
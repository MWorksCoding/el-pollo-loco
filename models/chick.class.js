class Chick extends MovableObject {
    y = 382;
    height = 50;
    width = 50;
    IMAGES_CHICK_WALKING = [ // Set frame sequence for animation
        'img/3_enemies_chicken/chicken_small/1_walk/1_w.png',
        'img/3_enemies_chicken/chicken_small/1_walk/2_w.png',
        'img/3_enemies_chicken/chicken_small/1_walk/3_w.png'
    ];
    IMAGE_DEAD = new Image();
    isHit = false;
    chickIntervalMovingLeft;
    chickIntervalWalking;

    /**
    * The function constructor runs always automatically whenever we create a new instance of the class.
    * The function super() runs first so that we initialize the methods from the parent object.
    * loadImages() shows sequence of images from above.
    * this.x shows from which x value the chicks are displayed. Math.random() * 1500: the chicks are randomly distributed on the canvas.
    */
    constructor() {
        super().loadImage('img/3_enemies_chicken/chicken_small/1_walk/1_w.png');
        this.loadImages(this.IMAGES_CHICK_WALKING);
        this.IMAGE_DEAD.src = 'img/3_enemies_chicken/chicken_small/2_dead/dead.png';
        this.x = 450 + Math.random() * 1500;
        this.speed = 0.14 + Math.random() * 0.2;
        this.animate();
    }

    /**
    * Runs the animation (sequence of images from above) for moving left, when the chick is not dead.
    */
    animate() {
        this.chickIntervalMovingLeft = setInterval(() => {
            if (this.isAlive) {
                this.moveLeft();
            }
        }, 1000 / 60);
        this.chickIntervalWalking = setInterval(() => {
            if (this.isAlive) {
                this.playAnimation(this.IMAGES_CHICK_WALKING);
            }
        }, 200);
    }
}
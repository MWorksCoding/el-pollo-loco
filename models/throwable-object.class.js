class ThrowableObject extends MovableObject {
    BOTTLE_IMAGES = [ // Set frame sequence for animation
        'img/6_salsa_bottle/bottle_rotation/1_bottle_rotation.png',
        'img/6_salsa_bottle/bottle_rotation/2_bottle_rotation.png',
        'img/6_salsa_bottle/bottle_rotation/3_bottle_rotation.png',
        'img/6_salsa_bottle/bottle_rotation/4_bottle_rotation.png',
        'img/6_salsa_bottle/bottle_rotation/1_bottle_rotation.png',
        'img/6_salsa_bottle/bottle_rotation/2_bottle_rotation.png',
        'img/6_salsa_bottle/bottle_rotation/bottle_splash/1_bottle_splash.png',
        'img/6_salsa_bottle/bottle_rotation/bottle_splash/2_bottle_splash.png',
        'img/6_salsa_bottle/bottle_rotation/bottle_splash/3_bottle_splash.png',
        'img/6_salsa_bottle/bottle_rotation/bottle_splash/4_bottle_splash.png',
        'img/6_salsa_bottle/bottle_rotation/bottle_splash/5_bottle_splash.png',
        'img/6_salsa_bottle/bottle_rotation/bottle_splash/6_bottle_splash.png',
    ];

    lastAction;
    timePassed = new Date().getTime() - lastAction;
    bottleIsThrown = false;

    /**
    * The function constructor runs always automatically whenever we create a new instance of the class.
    * The function super() runs first so that we initialize the methods from the parent object.
    * loadImages() shows sequence of images from above.
    */
    constructor(x, y) {
        super().loadImage('img/6_salsa_bottle/salsa_bottle.png');
        this.loadImages(this.BOTTLE_IMAGES);
        this.x = x;
        this.y = y;
        this.height = 100;
        this.width = 80;
        this.throwBottle();
        this.animate();
    }

    /** 
    * This function determines the intervall of throwing a bottle after the key SPACE is pressed
    */
    throwBottle() {
        if (!this.bottleIsThrown) {
            let SPACEIsPressed = setInterval(() => {
                this.bottleIsThrown = true;
                keyboard.SPACE = true;
            }, 1000)

            setTimeout(() => {
                clearInterval(SPACEIsPressed)
                this.bottleIsThrown = false;
                this.throw();
                keyboard.SPACE = false;
            }, 10)
        }
    }

    /** 
    * This function enables throwing a bottle in relation to gravity from the parent object
    */
    throw() {
        if (world) {
            this.speedY = 17.5;
            this.applyGravity();
            this.changeDirectionOfThrow();
        }
    }

    /** 
    * If the character is turned to the left, the bottle is even thrown to the left.
    * this.x += 5.5: you can set, how far you throw
    */
    changeDirectionOfThrow() {
        let turnedAround;
        if (world.character.otherDirection) {
            turnedAround = true;
        }
        setInterval(() => {
            if (this.isAboveGround()) {
                if (!turnedAround) {
                    this.x += 5.5;
                } else {
                    this.x -= 5.5;
                }
            }
        }, 1000 / 50);
    }

    /**
    * Runs the animation (sequence of images from above) for the flying bottle (bottle spins and bursts).
    */
    animate() {
        setInterval(() => {
            this.playAnimation(this.BOTTLE_IMAGES);
        }, 95);
    }
}
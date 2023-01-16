class Character extends MovableObject {

    height = 280;
    width = 150;
    y = 50;
    x = 20;
    speed = 8;
    offsetTop = 160;
    offsetBottom = 20;
    offsetLeft = 30;
    offsetRight = 30;
    IMAGES_WALKING = [ // Set frame sequence for animation
        'img/2_character_pepe/2_walk/W-21.png',
        'img/2_character_pepe/2_walk/W-22.png',
        'img/2_character_pepe/2_walk/W-23.png',
        'img/2_character_pepe/2_walk/W-24.png',
        'img/2_character_pepe/2_walk/W-25.png',
        'img/2_character_pepe/2_walk/W-26.png'
    ];
    IMAGES_JUMPING = [ // Set frame sequence for animation
        'img/2_character_pepe/3_jump/J-31.png',
        'img/2_character_pepe/3_jump/J-32.png',
        'img/2_character_pepe/3_jump/J-33.png',
        'img/2_character_pepe/3_jump/J-34.png',
        'img/2_character_pepe/3_jump/J-35.png',
        'img/2_character_pepe/3_jump/J-36.png',
        'img/2_character_pepe/3_jump/J-37.png',
        'img/2_character_pepe/3_jump/J-38.png',
        'img/2_character_pepe/3_jump/J-39.png'
    ];
    IMAGES_HURT = [ // Set frame sequence for animation
        'img/2_character_pepe/4_hurt/H-41.png',
        'img/2_character_pepe/4_hurt/H-42.png',
        'img/2_character_pepe/4_hurt/H-43.png',
    ];
    IMAGES_DEAD = [ // Set frame sequence for animation
        'img/2_character_pepe/5_dead/D-51.png',
        'img/2_character_pepe/5_dead/D-52.png',
        'img/2_character_pepe/5_dead/D-53.png',
        'img/2_character_pepe/5_dead/D-54.png',
        'img/2_character_pepe/5_dead/D-55.png',
        'img/2_character_pepe/5_dead/D-56.png',
        'img/2_character_pepe/5_dead/D-57.png'
    ];
    IMAGES_IDLE_SHORT = [ // Set frame sequence for animation
        'img/2_character_pepe/1_idle/idle/I-1.png',
        'img/2_character_pepe/1_idle/idle/I-2.png',
        'img/2_character_pepe/1_idle/idle/I-3.png',
        'img/2_character_pepe/1_idle/idle/I-4.png',
        'img/2_character_pepe/1_idle/idle/I-5.png',
        'img/2_character_pepe/1_idle/idle/I-6.png',
        'img/2_character_pepe/1_idle/idle/I-7.png',
        'img/2_character_pepe/1_idle/idle/I-8.png',
        'img/2_character_pepe/1_idle/idle/I-9.png',
        'img/2_character_pepe/1_idle/idle/I-10.png',
    ];

    IMAGES_IDLE_LONG = [ // Set frame sequence for animation
        'img/2_character_pepe/1_idle/long_idle/I-11.png',
        'img/2_character_pepe/1_idle/long_idle/I-12.png',
        'img/2_character_pepe/1_idle/long_idle/I-13.png',
        'img/2_character_pepe/1_idle/long_idle/I-14.png',
        'img/2_character_pepe/1_idle/long_idle/I-15.png',
        'img/2_character_pepe/1_idle/long_idle/I-16.png',
        'img/2_character_pepe/1_idle/long_idle/I-17.png',
        'img/2_character_pepe/1_idle/long_idle/I-18.png',
        'img/2_character_pepe/1_idle/long_idle/I-19.png',
        'img/2_character_pepe/1_idle/long_idle/I-20.png',
    ];
    world;
    characterMovingInterval;
    characterAnimationInterval;
    level = level1;


    /**
     * The function constructor runs always automatically whenever we create a new instance of the class.
     * The function super() runs first so that we initialize the methods from the parent object.
     * loadImages() shows sequence of images from above.
     */
    constructor() {
        super().loadImage(this.IMAGES_IDLE_SHORT[0]);
        this.loadImages(this.IMAGES_WALKING);
        this.loadImages(this.IMAGES_JUMPING);
        this.loadImages(this.IMAGES_DEAD);
        this.loadImages(this.IMAGES_HURT);
        this.loadImages(this.IMAGES_IDLE_SHORT);
        this.loadImages(this.IMAGES_IDLE_LONG);
        this.applyGravity();
        this.animate();
    }

    /**
     * Runs the animation (sequence of images from above) for a certain time interval.
     */
    animate() {
        this.characterMovingInterval = setInterval(() => {
            this.makeCharacterWalk();
        }, 1000 / 45);

        this.characterAnimationInterval = setInterval(() => {
            this.playAnimationOfCharacter();
        }, 100);
    }
    
    /**
     * Runs the animation (sequence of images from above) for walking and jumping
     * this.world.camera_x sets, where the character is displayed an the canvas.
     */
    makeCharacterWalk() {
        sounds.character_walking_sound.pause();
        if (this.world.keyboard.RIGHT && this.x < this.world.level.level_end_x) {
            this.moveRight();
            sounds.character_walking_sound.play();
            this.otherDirection = false;
        }
        if (this.world.keyboard.LEFT && this.x > 0) {
            this.moveLeft();
            sounds.character_walking_sound.play();
            this.otherDirection = true;
        }
        if (this.world.keyboard.UP && !this.isAboveGround()) {
            this.jump();
            sounds.character_jumping_sound.play();
        }
        this.world.camera_x = -this.x + 150;
    }

    /**
    * Runs the animation (sequence of images from above) for dying, damaging, jumping and sleeping
    */
    playAnimationOfCharacter() {
        if (this.isDead()) {
            this.playAnimation(this.IMAGES_DEAD);
            sounds.character_dead_sound.play();
        }
        else if (this.isHurt()) {
            this.playAnimation(this.IMAGES_HURT);
            sounds.character_damage_sound.play();
        }
        else if (this.isAboveGround()) {
            this.playAnimation(this.IMAGES_JUMPING);
        } else {
            if (this.world.keyboard.RIGHT || this.world.keyboard.LEFT) {
                this.playAnimation(this.IMAGES_WALKING);
            } else if (this.characterIsBored()) {
                this.playAnimation(this.IMAGES_IDLE_LONG);
                sounds.character_snoring_sound.play();
            } else {
                this.playAnimation(this.IMAGES_IDLE_SHORT);
                sounds.character_snoring_sound.pause();
            }
        }
    }

    /**
     * Setting the hight of the jump
     */
    jump() {
        this.speedY = 30;
    }

    /**
    * 3 seconds after pressing the key on the keyboard for setting the character to idle
    */
    characterIsBored() {
        let timePassed = new Date().getTime() - lastAction;
        timePassed = timePassed / 1000
        return timePassed > 3;
    }

    /**
    * Decreases status of the collected bottles
    */
    decreaseBottleStatus() {
        this.bottlesStatus -= 10;
        if (this.bottlesStatus < 0) {
            this.bottlesStatus = 0;
        }
    }

    /**
    * Increases status of the coins
    */
    collectedCoins() {
        this.coinStatus += 20;
        if (this.coinStatus > 100) {
            this.coinStatus == 100;
        }
    }

    /**
    * Increases status of the hearts
    */
    collectedHeart() {
        this.energy += 20;
        if (this.energy > 100) {
            this.energy == 100;
        }
    }

    /**
    * 
    * Increases status of the collected bottles
    */
    collectedBottle() {
        this.bottlesStatus += 10;
        if (this.bottlesStatus > 100) {
            this.bottlesStatus == 100;
        }
    }
}
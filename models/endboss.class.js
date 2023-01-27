class Endboss extends MovableObject {

    speed = 0.20;
    height = 400;
    width = 300;
    y = 60;
    isNear = false;
    IMAGES_ALERT = [ // Set frame sequence for animation
        'img/4_enemie_boss_chicken/2_alert/G5.png',
        'img/4_enemie_boss_chicken/2_alert/G6.png',
        'img/4_enemie_boss_chicken/2_alert/G7.png',
        'img/4_enemie_boss_chicken/2_alert/G8.png',
        'img/4_enemie_boss_chicken/2_alert/G9.png',
        'img/4_enemie_boss_chicken/2_alert/G10.png',
        'img/4_enemie_boss_chicken/2_alert/G11.png',
        'img/4_enemie_boss_chicken/2_alert/G12.png'
    ];
    IMAGES_DEAD = [ // Set frame sequence for animation
        'img/4_enemie_boss_chicken/5_dead/G24.png',
        'img/4_enemie_boss_chicken/5_dead/G25.png',
        'img/4_enemie_boss_chicken/5_dead/G26.png'
    ];
    IMAGES_IS_FINALLY_DEAD = [ // Set frame sequence for animation
        'img/4_enemie_boss_chicken/5_dead/G26.png',
    ];
    IMAGES_HURT = [ // Set frame sequence for animation
        'img/4_enemie_boss_chicken/4_hurt/G21.png',
        'img/4_enemie_boss_chicken/4_hurt/G22.png',
        'img/4_enemie_boss_chicken/4_hurt/G23.png'
    ];
    IMAGES_ATTACK = [ // Set frame sequence for animation
        'img/4_enemie_boss_chicken/3_attack/G13.png',
        'img/4_enemie_boss_chicken/3_attack/G14.png',
        'img/4_enemie_boss_chicken/3_attack/G15.png',
        'img/4_enemie_boss_chicken/3_attack/G16.png',
        'img/4_enemie_boss_chicken/3_attack/G17.png',
        'img/4_enemie_boss_chicken/3_attack/G18.png',
        'img/4_enemie_boss_chicken/3_attack/G19.png',
        'img/4_enemie_boss_chicken/3_attack/G20.png'

    ];
    IMAGES_WALKING = [ // Set frame sequence for animation
        'img/4_enemie_boss_chicken/1_walk/G1.png',
        'img/4_enemie_boss_chicken/1_walk/G2.png',
        'img/4_enemie_boss_chicken/1_walk/G3.png',
        'img/4_enemie_boss_chicken/1_walk/G4.png'
    ]
    endbossIntervalWalking;
    endbossWalking = false;

    /**
    * The function constructor runs always automatically whenever we create a new instance of the class.
    * The function super() runs first so that we initialize the methods from the parent object.
    * loadImages() shows sequence of images from above.
    * this.x = 2600: determine where the final boss should appear on the x-axis
    */
    constructor() {
        super().loadImage(this.IMAGES_ALERT[0]);
        this.loadImages(this.IMAGES_ALERT);
        this.loadImages(this.IMAGES_DEAD);
        this.loadImages(this.IMAGES_HURT);
        this.loadImages(this.IMAGES_ATTACK);
        this.loadImages(this.IMAGES_WALKING);
        this.loadImages(this.IMAGES_IS_FINALLY_DEAD);
        this.x = 2600;
        this.animate();
    }

    /**
    * Runs the animation (sequence of images from above) for moving left, when the chicken is not dead.
    */
    animate() {
        this.endbossIntervalWalking = setInterval(() => {
            this.makeEndbossMoveLeft();
        }, 1000 / 60);

        setInterval(() => {
            this.playAnimationAfterHit();
        }, 200);

        this.playIntroAnimation();
    }

    /**
    * Runs the animation (sequence of images from above) for moving and attacking, when the character is near.
    * when the final boss is dead, the last animation is displayed.
    */
    playIntroAnimation() {
        let i = 0;
        setInterval(() => {
            if (this.isNear == true && !this.isHurt()) {
                if (i < 8) {
                    this.playAnimation(this.IMAGES_ATTACK);
                } else {
                    this.moveFaster();
                    this.playAnimation(this.IMAGES_WALKING);
                }
                i++;
            }
            if (this.isDead()) {
                this.playAnimation(this.IMAGES_IS_FINALLY_DEAD);
            }
        }, 200);
    }

    /**
    * Runs the animation (sequence of images from above) for being alert, damaging and dying
    */
    playAnimationAfterHit() {
        if (this.isDead()) {
            this.speed = 0;
            sounds.BACKGROUND_MUSIC_SOUND.pause();
            sounds.endboss_dead_sound.play();
            this.playAnimation(this.IMAGES_DEAD);
            sounds.endboss_dead_sound.pause();
        } else if (this.isHurt()) {
            this.playAnimation(this.IMAGES_HURT);
            sounds.endboss_damage_sound.play();
        } else if (this.isNear == false && !this.isHurt()) {
            this.playAnimation(this.IMAGES_ALERT);
        }
    }


    makeEndbossMoveLeft() {
        if (this.isNear == true) {
            this.moveLeft();
        }
    }
}
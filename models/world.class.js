class World {
    character = new Character();
    level = level1;
    ctx;
    canvas;
    keyboard;
    camera_x = 0;
    lastAction;
    statusBar = new HealthBar();
    timePassed = new Date().getTime() - lastAction;
    endBoss = this.level.enemies.find(e => e instanceof Endboss);
    gameOver = new GameOver();
    youLost = new YouLost();
    coinBar = new CoinBar();
    throwableObject = new ThrowableObject();
    endbossBar = new EndbossBar();
    endbossBarIcon = new EndbossBarIcon();
    bottleBar = new BottleBar();
    throwableObjects = [];
    intervals = [];
    runInterval;
    gameIsOver = false;

    /**
    * The function constructor runs always automatically whenever we create a new instance of the class.
    */
    constructor(canvas, keyboard) {
        this.ctx = canvas.getContext('2d');
        this.canvas = canvas;
        this.keyboard = keyboard;
        this.draw();
        this.setWorld();
        this.run();
        this.pushIntervalsToArray();
    }

    /**
    * This function sets the world of the character to this world
    */
    setWorld() {
        this.character.world = this;
    }

    /**
    * This function checks all collisions of character with objects and enemies while running
    */
    run() {
        this.runInterval = setInterval(() => {
            this.checkChickenHitWithBottle();
            this.checkChickenHitWithCollision();
            this.checkIsEndbossNear();
            sounds.regulateSoundsVolume();
        }, 1000 / 60);
        this.runInterval = setInterval(() => {
            this.checkCollisions();
        }, 200);
        this.runInterval = setInterval(() => {
            this.checkCollisionWithEndboss();
        }, 450);
        this.runInterval = setInterval(() => {
            this.checkThrowObjects();
        }, 100);
    }

    /**
    * This function pushes all set intervals into an array
    */
    pushIntervalsToArray() {
        this.intervals.push(this.runInterval);
        this.intervals.push(this.character.characterMovingInterval);
        this.intervals.push(this.character.characterAnimationInterval);
        for (let i = 0; i < this.level.enemies.length; i++) {
            this.intervals.push(this.level.enemies[i].chickenIntervalMovingLeft);
            this.intervals.push(this.level.enemies[i].chickenIntervalWalking);
            this.intervals.push(this.level.enemies[i].chickIntervalMovingLeft);
            this.intervals.push(this.level.enemies[i].chickIntervalWalking);
            this.intervals.push(this.level.enemies[i].endbossIntervalWalking);
        }
    }

    /**
    * Checking if a bottle is thrown, if yes, bottle status must be at least 10% (= 1 peace of bottle). Changing status of the bottlebar.
    */
    checkThrowObjects() {
        if (this.keyboard.SPACE && this.character.bottlesStatus >= 10 && this.gameIsOver == false) {
            sounds.bottle_collides_sound.pause();
            let bottle = new ThrowableObject(this.character.x + 100, this.character.y + 100);
            this.throwableObjects.push(bottle);
            sounds.bottle_whoosh_sound.play();
            sounds.bottle_collides_sound.play();
            this.character.decreaseBottleStatus();
            this.bottleBar.setPercentage(this.character.bottlesStatus);
        }
    }

    /**
    * This function calls out all functions of collisions
    */
    checkCollisions() {
        this.checkCollisionWithEnemies();
        this.checkCollisionWithCoins();
        this.checkCollisionWithHearts();
        this.checkCollisionWithBottles();
    }

    /**
    * This function checks if bottles can be collected
    */
    checkCollisionWithBottles() {
        this.level.bottles.forEach((bottle) => {
            if (this.character.isColliding(bottle) && this.character.bottlesStatus <= 100) {
                this.character.collectedBottle(); // if hit by a bottle, bottle status will be increased
                this.bottleBar.setPercentage(this.character.bottlesStatus);
                sounds.bottle_collected_sound.play();
                let bottleAmount = this.level.bottles.indexOf(bottle);
                this.level.bottles.splice(bottleAmount, 1);
            }
        });
    }

    /**
    * This function checks if hearts can be collected
    */
    checkCollisionWithHearts() {
        this.level.hearts.forEach((heart) => {
            if (this.character.isColliding(heart) && this.character.energy <= 99) {
                this.character.collectedHeart();
                this.statusBar.setPercentage(this.character.energy);
                sounds.heartbeat_collected_sound.play();
                let heartAmount = this.level.hearts.indexOf(heart);
                this.level.hearts.splice(heartAmount, 1);
            }
        });
    }

    /**
    * This function checks if enemy is colliding with character, if yes, it changes the energy of the character and the health bar.
    */
    checkCollisionWithEnemies() {
        this.level.enemies.forEach((enemy) => {
            if (this.character.isColliding(enemy) && !this.character.isAboveGround() && enemy.isAlive && this.gameIsOver == false) {
                if (enemy instanceof Chick) {
                    sounds.chick_attacking_sound.play();
                }
                if (enemy instanceof Chicken) {
                    sounds.chicken_attacking_sound.play();
                }
                if (enemy instanceof Endboss) {
                    sounds.endboss_attacking_sound.play();
                }
                this.character.hit();
                this.statusBar.setPercentage(this.character.energy);
            }
        });
    }

    /**
    * This function checks if bottle collides with the endboss, if yes, it calls the function out to changes health status of endboss
    */
    checkCollisionWithEndboss() {
        this.throwableObjects.forEach((object) => {
            if (this.endBoss.isColliding(object)) {
                this.decreaseHealthOfEndboss();
                sounds.endboss_damage_sound.play();
                this.endBoss.speed = 1.75;
            }
        });
    }

    /**
    * Checking, if coins can be collected
    */
    checkCollisionWithCoins() {
        this.level.coins.forEach((coin) => {
            if (this.character.isColliding(coin)) {
                this.character.collectedCoins();
                this.coinBar.setPercentage(this.character.coinStatus);
                sounds.coin_collected_sound.play();
                let coinAmount = this.level.coins.indexOf(coin);
                this.level.coins.splice(coinAmount, 1);
            }
        });
    }

    /**
    * Changing / decreasing the status of healthbar of the endboss
    */
    decreaseHealthOfEndboss() {
        this.endBoss.hit();
        this.endbossBar.setPercentage(this.endBoss.energy);
    }

    /**
    * Checking, if endboss is near the character, here it's set to 2300 pixels on the x-axis.
    */
    checkIsEndbossNear() {
        if (this.character.x > 2300) {
            this.endBoss.isNear = true;
        }
    }

    /**
    * This function checks, if chicken is hit by a bottle and is alive yet. If yes, it calls function out to kill enemy
    */
    checkChickenHitWithBottle() {
        for (let i = 0; i < this.throwableObjects.length; i++) {
            const bottle = this.throwableObjects[i];
            this.level.enemies.forEach((enemy) => {
                if (enemy.isColliding(bottle) && enemy.isAlive) {
                    if (enemy instanceof Chicken || enemy instanceof Chick) {
                        this.killEnemy(enemy);
                    }
                }
            })
        }
    }

    /**
    * This function checks, if chicken is hit by the character and is alive yet. If yes, it calls function out to kill enemy
    */
    checkChickenHitWithCollision() {
        this.level.enemies.forEach((enemy) => {
            if (this.character.isColliding(enemy) && this.character.isAboveGround()) {
                if (enemy instanceof Chicken && enemy.isAlive || enemy instanceof Chick && enemy.isAlive) {
                    this.killEnemy(enemy);
                }
            }
        })
    }

    /**
    * The picture of the dead enemy is is displayed. Playing the sounds, when the enemy is killed
    * @param {object} enemy 
    */
    killEnemy(enemy) {
        enemy.isHit = true;
        enemy.isAlive = false;

        if (enemy instanceof Chick) {
            enemy.img = enemy.IMAGE_DEAD;
            sounds.chick_dead_sound.play();
        }
        if (enemy instanceof Chicken) {
            enemy.img = enemy.IMAGE_DEAD;
            sounds.chicken_dead_sound.play();
        }
    }

    /**
    * Drawing all the elements on the canvas
    */
    draw() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        this.ctx.translate(this.camera_x, 0);
        this.ctx.drawImage(this.character.img, this.character.x, this.character.y, this.character.width, this.character.height);
        this.addObjectsToMap(this.level.backgroundObjects);
        this.addDrawableObjectsToMap();
        this.ctx.translate(-this.camera_x, 0);
        this.addStatusBars();
        this.ctx.translate(this.camera_x, 0);
        this.addToMap(this.character);
        this.ctx.translate(-this.camera_x, 0);
        this.checkGameOver();
        let self = this; // the function draw() will be repeated
        requestAnimationFrame(function () {
            self.draw();
        });
    }

    /**
    * Drawing all status bars to the map. The status bar of the endboss is only displayed, when the character is near.
    */
    addStatusBars() {
        this.addToMap(this.statusBar);
        this.addToMap(this.coinBar);
        this.addToMap(this.bottleBar);

        if (this.endBoss.isNear == true) {
            this.addToMap(this.endbossBar);
            this.addToMap(this.endbossBarIcon);
        }
    }

    /**
    * This function checks if game is over
    */
    checkGameOver() {
        if (this.character.isDead()) {
            this.addToMap(this.youLost);
            document.getElementById('restart-btn').classList.remove('d-none');
            this.clearAllIntervals();
            sounds.playLostGameSound();
            this.gameIsOver = true;
            this.reloadIfGameOver();
        } else if (this.endBoss.isDead()) {
            this.addToMap(this.gameOver);
            document.getElementById('restart-btn').classList.remove('d-none');
            this.clearAllIntervals();
            sounds.playWonGameSound();
            this.gameIsOver = true;
            this.reloadIfGameOver();
        }
    }

    /**
    * Running the function to restart the game when there is onclick on canvas
    */
    reloadIfGameOver() {
        if (this.gameIsOver == true) {
            document.getElementById('canvas').addEventListener("click", this.restartGame);
            document.getElementById('restart-btn').addEventListener("click", this.restartGame);
        }
    }

    /**
    * Reloading the page to get back to the start screen
    */
    restartGame() {
        location.reload();
    }

    /**
    * This function clears all set intervals to stop the motion of all characters
    */
    clearAllIntervals() {
        for (let i = 0; i < this.intervals.length; i++) {
            clearInterval(this.intervals[i]);
        }
    }

    /**
     * Adding each object of an array to the canvas
     * @param {Array} objects 
     */
    addObjectsToMap(objects) {
        objects.forEach(o => {
            this.addToMap(o);
        });
    }

    /**
    * Adding a single object to the map
    * @param {object} mo 
    */
    addToMap(mo) {
        if (mo.otherDirection) {
            this.flipImage(mo);
        }
        mo.draw(this.ctx);
        mo.drawFrame(this.ctx);

        if (mo.otherDirection) {
            this.flipImageBack(mo);
        }
    }

    /**
    * This function adds all objects from level1.js on the canvas
    */
    addDrawableObjectsToMap() {
        this.addObjectsToMap(this.level.bottles);
        this.addObjectsToMap(this.level.enemies);
        this.addObjectsToMap(this.level.coins);
        this.addObjectsToMap(this.level.hearts);
        this.addObjectsToMap(this.throwableObjects);
    }

    /**
    * Flipping the image of a movable object to the left
    * @param {object} mo 
    */
    flipImage(mo) {
        this.ctx.save();
        this.ctx.translate(mo.width, 0);
        this.ctx.scale(-1, 1);
        mo.x = mo.x * -1;
    }

    /**
    * Flipping the image of a movable object to the right
    * @param {object} mo 
    */
    flipImageBack(mo) {
        mo.x = mo.x * -1;
        this.ctx.restore();
    }
}
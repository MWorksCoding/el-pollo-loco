class Sounds {
    BACKGROUND_MUSIC_SOUND = new Audio('audio/game_background_music.mp3')
    bottle_collected_sound = new Audio('audio/bottle_collected.mp3');
    bottle_collides_sound = new Audio('audio/bottle_collides.mp3');
    bottle_whoosh_sound = new Audio('audio/bottle_whoosh.mp3');
    chick_attacking_sound = new Audio('audio/chick_attack.mp3');
    chick_dead_sound = new Audio('audio/chick_dead.mp3');
    chicken_attacking_sound = new Audio('audio/chicken_attack.mp3');
    chicken_dead_sound = new Audio('audio/chicken_dead.mp3');
    coin_collected_sound = new Audio('audio/coin_collected.mp3');
    endboss_attacking_sound = new Audio('audio/endboss_attack.mp3');
    endboss_damage_sound = new Audio('audio/endboss_damage.mp3');
    endboss_dead_sound = new Audio('audio/endboss_dead.mp3');
    game_lost_sound = new Audio('audio/game_lost.mp3');
    game_over_sound = new Audio('audio/game_over.mp3')
    heartbeat_collected_sound = new Audio('audio/heart_collected.mp3');
    character_walking_sound = new Audio('audio/character_walking.mp3');
    character_damage_sound = new Audio('audio/character_damage.mp3');
    character_dead_sound = new Audio('audio/character_dead.mp3');
    character_jumping_sound = new Audio('audio/character_jumping.mp3');
    character_snoring_sound = new Audio('audio/character_snoring.mp3');

    /**
    * The function constructor runs always automatically whenever we create a new instance of the class.
    */
    constructor() {
        this.regulateSoundsVolume();
    }

    /**
    * Changes sounds volume / sound mixer
    */
    regulateSoundsVolume() {
        if (world) {
            this.BACKGROUND_MUSIC_SOUND.volume = 0.8;
            this.bottle_collected_sound.volume = 1;
            this.bottle_collides_sound.volume = 1;
            this.bottle_whoosh_sound.volume = 1;
            this.chick_attacking_sound.volume = 1;
            this.chick_dead_sound.volume = 1;
            this.chicken_attacking_sound.volume = 1;
            this.chicken_dead_sound.volume = 1;
            this.coin_collected_sound.volume = 1;
            this.endboss_attacking_sound.volume = 1;
            this.endboss_damage_sound.volume = 1;
            this.endboss_dead_sound.volume = 1;
            this.game_lost_sound.volume = 1;
            this.game_over_sound.volume = 1;
            this.heartbeat_collected_sound.volume = 0.2;
            this.character_walking_sound.volume = 0.5;
            this.character_damage_sound.volume = 0.5;
            this.character_dead_sound.volume = 0.5;
            this.character_jumping_sound.volume = 0.5;
            this.character_snoring_sound.volume = 1.0;
        }
    }

    /**
    * Mute all sounds in the game, decrease the sounds volume
    */
    allSoundsOff() {
        this.bottle_collected_sound.muted = true;
        this.bottle_collides_sound.muted = true;
        this.bottle_whoosh_sound.muted = true;
        this.chick_attacking_sound.muted = true;
        this.chick_dead_sound.muted = true;
        this.chicken_attacking_sound.muted = true;
        this.chicken_dead_sound.muted = true;
        this.coin_collected_sound.muted = true;
        this.endboss_attacking_sound.muted = true;
        this.endboss_damage_sound.muted = true;
        this.endboss_dead_sound.muted = true;
        this.BACKGROUND_MUSIC_SOUND.muted = true;
        this.game_lost_sound.muted = true;
        this.game_over_sound.muted = true;
        this.heartbeat_collected_sound.muted = true;
        this.character_walking_sound.muted = true;
        this.character_damage_sound.muted = true;
        this.character_dead_sound.muted = true;
        this.character_jumping_sound.muted = true;
        this.character_snoring_sound.muted = true;
    }

    /**
    * Play all sounds in the game, increase the sound volume
    */
    allSoundsOn() {
        this.bottle_collected_sound.muted = false;
        this.bottle_collides_sound.muted = false;
        this.bottle_whoosh_sound.muted = false;
        this.chick_attacking_sound.muted = false;
        this.chick_dead_sound.muted = false;
        this.chicken_attacking_sound.muted = false;
        this.chicken_dead_sound.muted = false;
        this.coin_collected_sound.muted = false;
        this.endboss_attacking_sound.muted = false;
        this.endboss_damage_sound.muted = false;
        this.endboss_dead_sound.muted = false;
        this.BACKGROUND_MUSIC_SOUND.muted = false;
        this.game_lost_sound.muted = false;
        this.game_over_sound.muted = false;
        this.heartbeat_collected_sound.muted = false;
        this.character_walking_sound.muted = false;
        this.character_damage_sound.muted = false;
        this.character_dead_sound.muted = false;
        this.character_jumping_sound.muted = false;
        this.character_snoring_sound.muted = false;
    }

    /**
    * Muting the background music and start playing a sound when game is lost
    */
    playLostGameSound() {
        if (!world.gameIsOver) {
            this.allSoundsOff();
            if (soundsNotMuted == true) {
                this.game_lost_sound.muted = false;
                this.game_lost_sound.play();
            }
        }
    }

    /**
    * Start playing a sound when game is won
    */
    playWonGameSound() {
        if (!world.gameIsOver) {
            this.allSoundsOff();
            if (soundsNotMuted == true) {
                this.game_over_sound.muted = false;
                this.game_over_sound.play();
            }
        }
    }
}
class Level {
    enemies;
    coins;
    hearts;
    bottles;
    world;
    backgroundObjects;
    level_end_x = 2700;

    /**
    * The function constructor runs always automatically whenever we create a new instance of the class.
    */
    constructor(enemies, backgroundObjects, coins, hearts, bottles){
        this.enemies = enemies;
        this.coins = coins;
        this.hearts = hearts;
        this.bottles = bottles;
        this.backgroundObjects = backgroundObjects;
    }
}
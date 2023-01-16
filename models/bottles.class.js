class Bottles extends DrawableObject {
    width = 60;
    height = 60;
    y = 360;
    bottle_img = 'img/6_salsa_bottle/2_salsa_bottle_on_ground.png';

    /**
     * The function constructor runs always automatically whenever we create a new instance of the class.
     * The function super() runs first so that we initialize the methods from the parent object.
     * this.x shows from which x value the bottles are displayed. Math.random() * 1500: the bottles are randomly distributed on the canvas.
     */
    constructor() {
        super().loadImage('img/6_salsa_bottle/2_salsa_bottle_on_ground.png');
        this.x = 200 + Math.random() * 1500; 
    }
}
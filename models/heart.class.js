class Heart extends DrawableObject {
    width = 60;
    height = 60;
    heart_img = 'img/7_statusbars/3_icons/icon_health.png'; // Set frame sequence for animation

    /**
    * The function constructor runs always automatically whenever we create a new instance of the class.
    * The function super() runs first so that we initialize the methods from the parent object.
    * loadImages() shows sequence of images.
    * this.x shows from which x value the hearts are displayed. Math.random() * 2000: the chicks are randomly distributed on the canvas.
    * this.y shows from which y value the hearts are displayed. Math.random() * 250;: the chicks are randomly distributed on the canvas.
    */
    constructor() {
        super().loadImage('img/7_statusbars/3_icons/icon_health.png');
        this.x = 300 + Math.random() * 2000;
        this.y = 80 + Math.random() * 250;
    }
}
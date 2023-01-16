class EndbossBarIcon extends DrawableObject {

    /**
    * The function constructor runs always automatically whenever we create a new instance of the class.
    * The function super() runs first so that we initialize the methods from the parent object.
    * loadImages() shows sequence of images from above.
    */
    constructor() {
        super().loadImage('img/7_statusbars/3_icons/icon_health_endboss.png');
        // super();
        // this.loadImages(this.IMAGES);
        this.x = 485;
        this.y = 58;
        this.width = 65;
        this.height = 65;
    }

    /**
     * Assign a number between 0 and 5.
     * Get image path from above, number between 0 and 5
     * the function resolveImageIndex() runs in the parent object.
     */
    setPercentage(percentage) {
        this.percentage = percentage;
        let path = this.IMAGES[this.resolveImageIndex()];
        this.img = this.imageCache[path];
    }
}
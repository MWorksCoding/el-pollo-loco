class BottleBar extends DrawableObject {
    IMAGES = [ // Set frame sequence for animation
        'img/7_statusbars/1_statusbar/3_statusbar_bottle/blue/0.png', //0 
        'img/7_statusbars/1_statusbar/3_statusbar_bottle/blue/20.png', //1 
        'img/7_statusbars/1_statusbar/3_statusbar_bottle/blue/40.png', //2 
        'img/7_statusbars/1_statusbar/3_statusbar_bottle/blue/60.png', //3 
        'img/7_statusbars/1_statusbar/3_statusbar_bottle/blue/80.png', //4 
        'img/7_statusbars/1_statusbar/3_statusbar_bottle/blue/100.png', //5
    ];
    percentage = 0;

    /**
     * The function constructor runs always automatically whenever we create a new instance of the class.
     * The function super() runs first so that we initialize the methods from the parent object.
     */
    constructor() {
        super();
        this.loadImages(this.IMAGES);
        this.x = 40;
        this.y = 100;
        this.width = 200;
        this.height = 60;
        this.setPercentage(0);
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
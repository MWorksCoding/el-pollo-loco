class BackgroundObject extends MovableObject {
    width = 720;
    height = 480;

/**
 * the function constructor runs always automatically whenever we create a new instance of the class
 */
    constructor(imagePath, x) {
        super().loadImage(imagePath);
        this.x = x;
        this.y = 480 - this.height;
    }
}
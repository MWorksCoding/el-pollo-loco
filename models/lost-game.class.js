class YouLost extends MovableObject {

    width;
    height;
    x;
    y;
    IMG_YOULOST = [ // Set frame sequence for animation
        'img/9_intro_outro_screens/game_over/oh no you lost!.png'
    ]; 

    /**
    * The function constructor runs always automatically whenever we create a new instance of the class.
    * The function super() runs first so that we initialize the methods from the parent object.
    * loadImages() shows sequence of images.
    */
    constructor() {
        super().loadImage(this.IMG_YOULOST);
        this.width = 720;
        this.height = 480;
        this.x = 0;
        this.y = 0;
    }
}
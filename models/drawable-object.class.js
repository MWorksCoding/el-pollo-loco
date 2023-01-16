class DrawableObject {
    imageCache = {};
    img;
    currentImage = 0;
    x = 120;
    y = 250;
    height = 150;
    width = 100;
    offsetTop = 5;
    offsetRight = 5;
    offsetBottom = 5;
    offsetLeft = 5;

    /**
    * this function loads the first image.
    * It finds application in the child objects.
    * @param {string} path 
    */
    loadImage(path) {
        this.img = new Image();
        this.img.src = path;
    }


    /**
    * It loads all images from the array .
    * @param {Array} arr - ['img/image1.png', 'img/image2.png', ...]
    */
    loadImages(arr) {
        arr.forEach((path) => {
            let img = new Image();
            img.src = path;
            this.imageCache[path] = img;
        });
    }

    /**
    * this function draws the image on the canvas
    * @param {CanvasRenderingContext2D} ctx 
    */
    draw(ctx) {
        ctx.drawImage(this.img, this.x, this.y, this.width, this.height);
    }

    /**
    * Drawing a rectangle around the object from the given instances -> here you define how it should look like
    */
    drawFrame(ctx) {
        if (this instanceof Character || this instanceof Chicken || this instanceof Chick || this instanceof Endboss || this instanceof ThrowableObject) {
            ctx.beginPath();
            ctx.lineWidth = '5';
            ctx.strokeStyle = 'transparent';  // 'blue' for example for showing a blue rectangle; 
            ctx.rect(this.x, this.y, this.width, this.height);
            ctx.stroke();
        }
    }

    /**
    * @returns calculates the percentage of the health-, coin- and bottle-bar
    * It finds application in the child objects.
    */
    resolveImageIndex() {
        if (this.percentage >= 100) return 5;
        else if (this.percentage >= 80) return 4;
        else if (this.percentage >= 60) return 3;
        else if (this.percentage >= 40) return 2;
        else if (this.percentage >= 20) return 1;
        else return 0
    }
}



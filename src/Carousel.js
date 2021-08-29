class Carousel {
    images = [];
    component = null;
    viewport = null;
    currentIndex = 0;
    constructor(element = null, images = []) {
        this.component = element;
        this.images = images;
        this.viewport = null;
        if (!this.component) {
            return null;
        }
        this.viewport = this.component.querySelector('[data-hook="viewport"]');
        this.renderImage();
    }

    renderImage() {
        const src = this.images[this.currentIndex] || '';
        this.viewport.innerHTML = `<img src=${src} />`;
    }

    next() {
        if (this.currentIndex < (this.images.length - 1)){
            this.currentIndex++;
        } else {
            this.currentIndex = 0;
        }
        this.renderImage();
    }

    prev() {
        if (this.currentIndex === 0){
            this.currentIndex = this.images.length - 1;
        } else {
            this.currentIndex--;
        }
        this.renderImage();
    }
}

module.exports = Carousel;
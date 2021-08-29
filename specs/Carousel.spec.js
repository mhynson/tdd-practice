const chai = require("chai");
chai.use(require("chai-dom"));
const expect = chai.expect;
const { JSDOM } = require("jsdom");

const Carousel = require("../src/Carousel");

describe("Carousel functionality", () => {
    beforeEach(() => {
        const dom = new JSDOM(`
            <html>
                <body>
                    <div class="carousel" data-cmp="carousel">
                        <div class="viewport" data-hook="viewport">
                        </div>
                        <nav>
                            <a href="#"
                               class="button button-prev"
                               data-button="prev">Prev</a>
                            <a href="#"
                               class="button button-next"
                               data-button="next">Next</a>
                        </nav>
                    </div>
                </body>
            </html>
        `,
        { url: 'http://localhost'});

        global.window = dom.window;
        global.document = dom.window.document;
    });

    it("should create an instance of a Carousel with an element and images", () => {
        // Arrange
        const images = [];
        const carouselElement = document.querySelector('[data-cmp="carousel"]');

        // Act
        const carousel = new Carousel(carouselElement, images);

        // Assert
        expect(carousel).to.be.an("object");
        expect(carousel.component).to.be.equal(carouselElement);
        expect(carousel.images).to.be.an('array');
        expect(carousel.images.length).to.be.equal(0);
    });

    it("should create an instance of a Carousel with a null component property", () => {
        // Arrange
        // Act
        const carousel = new Carousel();

        // Assert
        expect(carousel.component).to.be.null;
    });

    it("should create an instance of a Carousel and display the first image in the viewport", () => {
        // Arrange
        const firstImage = 'https://picsum.photos/id/1002/4312/2868';
        const images = [
            firstImage,
            'https://picsum.photos/id/1003/1181/1772',
            'https://picsum.photos/id/1015/6000/4000'
        ];
        const carouselElement = document.querySelector('[data-cmp="carousel"]');

        // Act
        const carousel = new Carousel(carouselElement, images);

        // Assert
        expect(carousel.viewport).to.exist;

        // Act
        const image = carousel.viewport.querySelector('img');
        
        // Assert
        expect(image).to.have.attr('src').equal(firstImage);
    });

    it("render the next image after next method invoked", () => {
        // Arrange
        const secondImage = 'https://picsum.photos/id/1003/1181/1772';
        const images = [
            'https://picsum.photos/id/1002/4312/2868',
            secondImage,
            'https://picsum.photos/id/1015/6000/4000'
        ];
        const carouselElement = document.querySelector('[data-cmp="carousel"]');
        const carousel = new Carousel(carouselElement, images);

        // Act
        carousel.next();
        const image = carousel.viewport.querySelector('img');
        
        // Assert
        expect(image).to.have.attr('src').equal(secondImage);
    });

    it("render the first image after reaching the end of the list of images", () => {
        // Arrange
        const firstImage = 'https://picsum.photos/id/1002/4312/2868';
        const images = [
            firstImage,
            'https://picsum.photos/id/1003/1181/1772',
            'https://picsum.photos/id/1015/6000/4000'
        ];
        const carouselElement = document.querySelector('[data-cmp="carousel"]');
        const carousel = new Carousel(carouselElement, images);

        // Act
        carousel.next();    // goto 2nd image
        carousel.next();    // goto 3rd image
        carousel.next();    // goto 1st image
        const image = carousel.viewport.querySelector('img');
        
        // Assert
        expect(image).to.have.attr('src').equal(firstImage);
    });

    it("render the first image after calling next, then prev methods", () => {
        // Arrange
        const firstImage = 'https://picsum.photos/id/1002/4312/2868';
        const images = [
            firstImage,
            'https://picsum.photos/id/1003/1181/1772',
            'https://picsum.photos/id/1015/6000/4000'
        ];
        const carouselElement = document.querySelector('[data-cmp="carousel"]');
        const carousel = new Carousel(carouselElement, images);

        // Act
        carousel.next();    // goto 2nd image
        carousel.prev();    // goto 1st image
        const image = carousel.viewport.querySelector('img');
        
        // Assert
        expect(image).to.have.attr('src').equal(firstImage);
    });

    it("render the last image after immediately calling prev method", () => {
        // Arrange
        const images = [
            'https://picsum.photos/id/1002/4312/2868',
            'https://picsum.photos/id/1003/1181/1772',
            'https://picsum.photos/id/1015/6000/4000'
        ];
        const carouselElement = document.querySelector('[data-cmp="carousel"]');
        const carousel = new Carousel(carouselElement, images);

        // Act
        carousel.prev();    // goto last image
        const image = carousel.viewport.querySelector('img');
        
        // Assert
        expect(image).to.have.attr('src').equal(images[2]);
    });
});
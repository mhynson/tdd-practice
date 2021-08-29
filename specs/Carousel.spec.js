const chai = require("chai");
chai.use(require("chai-dom"));
const expect = chai.expect;
const { JSDOM } = require("jsdom");

const Carousel = require("../src/Carousel");

describe("Carousel functionality", () => {
    // Arrange
    const testImages = [
        'https://picsum.photos/id/1002/4312/2868',
        'https://picsum.photos/id/1003/1181/1772',
        'https://picsum.photos/id/1015/6000/4000'
    ];

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

        // Act
        const carouselElement = global.document.querySelector('[data-cmp="carousel"]');
        global.carouselElement = carouselElement;
        global.carousel = new Carousel(carouselElement, testImages);
    });

    

    it("should create an instance of a Carousel with an element and images", () => {
        // Arrange
        const images = [];
        
        // Act
        const carousel = new Carousel(carouselElement, images);
        
        // Assert
        expect(carousel).to.be.an("object");
        expect(carousel.component).to.be.equal(carouselElement);
        expect(carousel.images).to.be.an('array');
        expect(carousel.images.length).to.be.equal(0);
    });

    it("should create an instance of a Carousel with a null component property", () => {
        // Act
        const carousel = new Carousel();

        // Assert
        expect(carousel.component).to.be.null;
    });

    it("should create an instance of a Carousel and display the first image in the viewport", () => {
        // Act
        const image = carousel.viewport.querySelector('img');
        
        // Assert
        expect(carousel.viewport).to.exist;
        expect(image).to.have.attr('src').equal(testImages[0]);
    });

    it("render the next image after next method invoked", () => {
        // Act
        carousel.next();
        const image = carousel.viewport.querySelector('img');
        
        // Assert
        expect(image).to.have.attr('src').equal(testImages[1]);
    });

    it("render the first image after reaching the end of the list of images", () => { 
        // Act
        carousel.next();    // goto 2nd image
        carousel.next();    // goto 3rd image
        carousel.next();    // goto 1st image
        const image = carousel.viewport.querySelector('img');
        
        // Assert
        expect(image).to.have.attr('src').equal(testImages[0]);
    });

    it("render the first image after calling next, then prev methods", () => {
        // Act
        carousel.next();    // goto 2nd image
        carousel.prev();    // goto 1st image
        const image = carousel.viewport.querySelector('img');
        
        // Assert
        expect(image).to.have.attr('src').equal(testImages[0]);
    });

    it("render the last image after immediately calling prev method", () => {
        // Act
        carousel.prev();    // goto last image
        const image = carousel.viewport.querySelector('img');
        
        // Assert
        expect(image).to.have.attr('src').equal(testImages[2]);
    });
});
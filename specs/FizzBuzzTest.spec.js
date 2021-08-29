const chai = require("chai");
const expect = chai.expect;
const FizzBuzz = require("../src/FizzBuzz");

describe("Test FizzBuzz", () => {
    it("should create a fizz buzz instance", () => {
        const fizzBuzz = new FizzBuzz();
        expect(fizzBuzz).to.be.a("object");
    });

    it("should not convert a 1", () => {
        const fizzBuzz = new FizzBuzz();
        const result = fizzBuzz.convert(1);
        expect(result).to.be.equal(1);
    });

    it("should not convert a 2", () => {
        const fizzBuzz = new FizzBuzz();
        const result = fizzBuzz.convert(2);
        expect(result).to.be.equal(2);
    });

    it("should convert a 3 to Fizz", () => {
        const fizzBuzz = new FizzBuzz();
        const result = fizzBuzz.convert(3);
        expect(result).to.be.equal("Fizz");
    });

    it("should convert a 5 to Buzz", () => {
        const fizzBuzz = new FizzBuzz();
        const result = fizzBuzz.convert(5);
        expect(result).to.be.equal("Buzz");
    });

    it("should convert a 15 to FizzBuzz", () => {
        const fizzBuzz = new FizzBuzz();
        const result = fizzBuzz.convert(15);
        expect(result).to.be.equal("FizzBuzz");
    });

    it("should convert a 450 to FizzBuzz", () => {
        const fizzBuzz = new FizzBuzz();
        const result = fizzBuzz.convert(450);
        expect(result).to.be.equal("FizzBuzz");
    });

    it("should return the expected output for a list of numbers", () => {
        const expectedOutput = [
            1, 2, "Fizz", 4, "Buzz",
            "Fizz", 7, 8, "Fizz", "Buzz",
            11, "Fizz", 13, 14, "FizzBuzz",
            16, 17, "Fizz", 19, "Buzz"
        ];

        const fizzBuzz = new FizzBuzz();
        const outcome = [];
        let i=1;
        while(i<=20) {
            const result = fizzBuzz.convert(i);
            outcome.push(result);
            i++;
        }
        expect(outcome).to.eql(expectedOutput);
    });
});
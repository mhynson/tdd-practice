class FizzBuzz {
    convert(num) {
        let result = "";
        if (num % 3 == 0) result += "Fizz";
        if (num % 5 == 0) result += "Buzz";
        if (result.length < 1) result = num;
        return result;
    }  
}

module.exports = FizzBuzz;
let dict = {
}

function createMatrix(rows, cols) {
    const matrix = [];
    for (let i = 0; i < rows; i++) {
        matrix[i] = [];
        for (let j = 0; j < cols; j++) {
            matrix[i][j] = 0;
        }
    }
    return matrix;
}

const matrix = createMatrix(7,7);

export function checkPattern(selectedNumbers) {
    isEven(selectedNumbers);
    isDiagoanal(selectedNumbers);
    atleastThreeAreNextToEachother(selectedNumbers)
    isPrime(selectedNumbers);
    return dict;
}

function isEven(selectedNumbers)
{
    dict["isEven"] = false;
    dict["isEven"] = !!selectedNumbers.every(num => num % 2 === 0);
}

function isDiagoanal(selectedNumbers)
{
    dict["isDiagonal"] = false;
    let copySelectedNumbers = selectedNumbers.slice();
    copySelectedNumbers.sort((a, b) => a - b);
    let initialDifference = copySelectedNumbers[1] - copySelectedNumbers[0];

    // Stelle sicher, dass die erste Differenz entweder 6 oder 8 ist
    if (initialDifference !== 6 && initialDifference !== 8) {
        console.log(copySelectedNumbers);
        return dict["isDiagonal"] = false;
    }

    for (let i = 1; i < copySelectedNumbers.length - 1; i++) {
        let difference = copySelectedNumbers[i + 1] - copySelectedNumbers[i];

        // Überprüfe, ob die Differenz mit der initialen Differenz übereinstimmt
        if (difference !== initialDifference) {
            return dict["isDiagonal"] = false;
        }
    }

    return dict["isDiagonal"] = true;
}

function atleastThreeAreNextToEachother(selectedNumbers)
{
    dict["atleastThreeAreNextToEachother"] = false;
    let copySelectedNumbers = selectedNumbers.slice();
    copySelectedNumbers.sort((a, b) => a - b);
    for (let i = 0; i <= copySelectedNumbers.length - 3; i++) {
        if (copySelectedNumbers[i] + 1 === copySelectedNumbers[i + 1] && copySelectedNumbers[i + 1] + 1 === copySelectedNumbers[i + 2]) {
            return dict["atleastThreeAreNextToEachother"] = true;
        }
    }

    return dict["atleastThreeAreNextToEachother"] = false;
}

function isPrime(selectedNumbers)
{
    dict["isPrime"] = [false, 0];
    function isPrime(num) {
        if (num <= 1) return false;
        if (num <= 3) return true;
        if (num % 2 === 0 || num % 3 === 0) return false;
        for (let i = 5; i * i <= num; i += 6) {
            if (num % i === 0 || num % (i + 2) === 0) return false;
        }
        return true;
    }

    let primeCount = 0;

    for (let i = 0; i < selectedNumbers.length; i++) {
        if (isPrime(selectedNumbers[i])) {
            primeCount++;
        }
    }

    return dict["isPrime"] = [primeCount > 0, primeCount];
}


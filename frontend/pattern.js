let dict = {
};

export function checkPattern(selectedNumbers) {
    isEven(selectedNumbers);
    isDiagonal(selectedNumbers);
    atleastThreeAreNextToEachother(selectedNumbers);
    atleastThreeAreStacked(selectedNumbers);
    allAreNextToEachother(selectedNumbers);
    allAreStacked(selectedNumbers);
    isPrime(selectedNumbers);
    allNumbersAreClose(selectedNumbers);
    sameIntervall(selectedNumbers);
    allDifferentRows(selectedNumbers);
    allDifferentColumns(selectedNumbers);
    atleastThreeNumbersAreClustered(selectedNumbers);
    notConnectedButInAnArea(selectedNumbers);
    // Hier weitere Funktionen hinzufügen
    return Object.entries(dict);
}

function isEven(selectedNumbers)
{
    dict["isEven"] = !!selectedNumbers.every(num => num % 2 === 0);
    return dict["isEven"];
}

function isDiagonal(selectedNumbers) {
    selectedNumbers.slice().sort((a, b) => a - b);
    let initialDifference = selectedNumbers[1] - selectedNumbers[0];

    if (initialDifference !== 6 && initialDifference !== 8) {
        return dict["isDiagonal"] = false;
    }

    let isDiagonal = selectedNumbers.every((num, i, arr) => {
        if (i === 0) return true;
        return arr[i] - arr[i - 1] === initialDifference;
    });

    dict["isDiagonal"] = isDiagonal;
    return dict["isDiagonal"];
}

function atleastThreeAreNextToEachother(selectedNumbers) {
    dict["atleastThreeAreNextToEachother"] = selectedNumbers.some(num => {
        return selectedNumbers.includes(num + 1) && selectedNumbers.includes(num + 2);
    });
    return dict["atleastThreeAreNextToEachother"];
}

function atleastThreeAreStacked(selectedNumbers) {
    dict["atleastThreeAreStacked"] = selectedNumbers.some((num) => {
        return selectedNumbers.includes(num + 7) && selectedNumbers.includes(num + 14);
    });
    return dict["atleastThreeAreStacked"];
}

function allAreNextToEachother(selectedNumbers) {
    selectedNumbers.slice().sort((a, b) => a - b);
    const reihenIndex = Math.floor((selectedNumbers[0] - 1) / 7);
    dict["allAreNextToEachother"]  = selectedNumbers.every((num, i, arr) =>
        Math.floor((num - 1) / 7) === reihenIndex && (i === 0 || num === arr[i - 1] + 1)
    );
    return dict["allAreNextToEachother"];
}

function allAreStacked(selectedNumbers) {
    selectedNumbers.slice().sort((a, b) => a - b);
    dict["allAreStacked"] = selectedNumbers.every((num, i, arr) =>
        i === 0 || arr[i] - arr[i - 1] === 7
    );
    return dict["allAreStacked"];
}

function isPrime(selectedNumbers) {
    const checkPrime = num => {
        if (num <= 1) return false;
        if (num <= 3) return true;
        if (num % 2 === 0 || num % 3 === 0) return false;
        for (let i = 5; i * i <= num; i += 6) {
            if (num % i === 0 || num % (i + 2) === 0) return false;
        }
        return true;
    };
    dict["isPrime"] = selectedNumbers.every(checkPrime);
    return dict["isPrime"];
}

function allNumbersAreClose(selectedNumbers) {
    const field = Array.from({ length: 7 }, () => Array(7).fill(false));

    const getPosition = number => [(number - 1) / 7 | 0, (number - 1) % 7];

    selectedNumbers.forEach(num => {
        const [row, col] = getPosition(num);
        field[row][col] = true;
    });

    const dfs = (row, col, visited) => {
        const directions = [
            [0, 1], [1, 0], [0, -1], [-1, 0]
        ];

        visited[row][col] = true;

        directions.forEach(([dx, dy]) => {
            const newRow = row + dx, newCol = col + dy;
            if (newRow >= 0 && newRow < 7 && newCol >= 0 && newCol < 7 &&
                field[newRow][newCol] && !visited[newRow][newCol]) {
                dfs(newRow, newCol, visited);
            }
        });
    };

    const visited = Array.from({ length: 7 }, () => Array(7).fill(false));
    const [startRow, startCol] = getPosition(selectedNumbers[0]);
    dfs(startRow, startCol, visited);

    dict["areNumbersClose"] = selectedNumbers.every(num => {
        const [row, col] = getPosition(num);
        return visited[row][col];
    });
    return dict["areNumbersClose"];
}


function sameIntervall(selectedNumbers) {
    selectedNumbers.sort((a, b) => a - b);
    const abstand = selectedNumbers[1] - selectedNumbers[0];
    dict["sameIntervall"] = selectedNumbers.every((num, i, arr) =>
        i === 0 || arr[i] - arr[i - 1] === abstand
    );
    return dict["sameIntervall"];
}

function allDifferentRows(selectedNumbers) {
    const rows = new Set(
        selectedNumbers.map(num => Math.floor((num - 1) / 7))
    );
    dict["allDifferentRows"] = rows.size === selectedNumbers.length;
    return dict["allDifferentRows"];
}

function allDifferentColumns(selectedNumbers) {
    const columns = new Set(
        selectedNumbers.map(num => (num - 1) % 7)
    );
    dict["allDifferentColumns"] = columns.size === selectedNumbers.length;
    return dict["allDifferentColumns"]
}

function atleastThreeNumbersAreClustered(selectedNumbers) {
    function getNeighbors(num) {
        const row = Math.floor((num - 1) / 7);
        const col = (num - 1) % 7;
        const neighbors = [
            num - 1, num + 1, num - 7, num + 7
        ];
        return neighbors.filter(n => n > 0 && n <= 7 * 7 &&
            Math.abs(Math.floor((n - 1) / 7) - row) <= 1 &&
            Math.abs((n - 1) % 7 - col) <= 1);
    }
    function bfs(startIndex) {
        const visited = new Set();
        const queue = [selectedNumbers[startIndex]];
        visited.add(selectedNumbers[startIndex]);

        while (queue.length > 0) {
            const current = queue.shift();
            const neighbors = getNeighbors(current).filter(n => selectedNumbers.includes(n) && !visited.has(n));
            neighbors.forEach(n => {
                visited.add(n);
                queue.push(n);
            });
        }
        return visited.size;
    }
    for (let i = 0; i < selectedNumbers.length; i++) {
        if (bfs(i) >= 3) {
            return dict["isClustered"] = true;
        }
    }
    return dict["isClustered"] = false;
}


function notConnectedButInAnArea(numbers) {
    const upperField = {start: 1, end: 21};
    const lowerField = {start: 29, end: 49};
    const leftFieldCols = [0, 1, 2];
    const rightFieldCols = [4, 5, 6];

    dict["numbersAreInUpperFieldAndNotConnected"] = false;
    dict["numbersAreInLowerFieldAndNotConnected"] = false;
    dict["numbersAreInLeftFieldAndNotConnected"] = false;
    dict["numbersAreInRightFieldAndNotConnected"] = false;

    function areNeighbors(num1, num2) {
        let row1 = Math.floor((num1 - 1) / 7);
        let col1 = (num1 - 1) % 7;
        let row2 = Math.floor((num2 - 1) / 7);
        let col2 = (num2 - 1) % 7;
        return (Math.abs(row1 - row2) + Math.abs(col1 - col2)) === 1;
    }

    function checkField(start, end, isColumnCheck = false, columns = []) {
        if (isColumnCheck) {
            return numbers.every(num => {
                let col = (num - 1) % 7;
                return columns.includes(col);
            }) && !numbers.some((num, idx) => numbers.slice(idx + 1).some(otherNum => areNeighbors(num, otherNum)));
        } else {
            return numbers.every(num => num >= start && num <= end) && !numbers.some((num, idx) => numbers.slice(idx + 1).some(otherNum => areNeighbors(num, otherNum)));
        }
    }

    if (checkField(upperField.start, upperField.end)) {
        return dict["numbersAreInUpperFieldAndNotConnected"] = true;
    }
    if (checkField(lowerField.start, lowerField.end)) {
        return dict["numbersAreInLowerFieldAndNotConnected"] = true;
    }
    if (checkField(0, 0, true, leftFieldCols)) {
        return dict["numbersAreInLeftFieldAndNotConnected"] = true;
    }
    if (checkField(0, 0, true, rightFieldCols)) {
        return dict["numbersAreInRightFieldAndNotConnected"] = true;
    }
}

// Hier weiter Funktionen hinzufügen. Das dict zu erweitern nicht vergessen!
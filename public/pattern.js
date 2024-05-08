export function checkPattern(selectedNumbers) {
    let dict = {
        "isEven": false
    }
    if (selectedNumbers.every(num => num % 2 === 0)){
        dict["isEven"] = true;
    }
    return dict;
}


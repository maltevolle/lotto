import { checkPattern } from '/frontend/pattern.js';

const app = Vue.createApp({
    data() {
        return {
            buttonNumbers: [],
            selectedNumbers: [],
            inputValue: '',
            inputText: '',
            message: '',
            dict: {},
            patternMessages: [],
            showToggle: true,
            showDict: false,
            toggleActivated: false,
            toggleDisabled: true
        };
    },
    methods: {
        handleButtonClick(number) {
            this.showDict = false;
            this.toggleDisabled = true;

            // Überprüfen, ob die maximale Anzahl von 6 Buttons erreicht wurde
            if (this.selectedNumbers.length >= 6) {
                // Überprüfen, ob die ausgewählte Zahl bereits ausgewählt wurde
                if (this.selectedNumbers.includes(number)) {
                    // Wenn die Zahl bereits ausgewählt wurde, entferne sie aus dem Array
                    const index = this.selectedNumbers.indexOf(number);
                    this.selectedNumbers.splice(index, 1);
                    this.message = '';
                } else {
                    this.message = "Sie können nicht mehr als 6 Zahlen auswählen.";
                    this.messageClass = 'error';
                }
            } else {
                // Füge die ausgewählte Zahl zum Array hinzu
                if (this.selectedNumbers.includes(number)) {
                    // Wenn die Zahl bereits ausgewählt wurde, entferne sie aus dem Array
                    const index = this.selectedNumbers.indexOf(number);
                    this.selectedNumbers.splice(index, 1);
                    this.message = '';
                } else {
                    this.selectedNumbers.push(number);
                    this.message = '';
                }
            }
        },
        submitForm() {
            // Setze den Toggle-Switch zurück, wenn der Absende-Button geklickt wird
            this.showDict = false;
            this.toggleDisabled = true;

            if (this.selectedNumbers.length < 6) {
                switch (this.selectedNumbers.length) {
                    case 0:
                        this.message = "Du hast zu wenig Zahlen ausgewählt! Bitte wähle sechs Zahlen aus!";
                        this.messageClass = 'error';
                        break;
                    case 1:
                        this.message = "Du hast zu wenig Zahlen ausgewählt! Bitte wähle fünf weitere Zahlen aus!";
                        this.messageClass = 'error';
                        break;
                    case 2:
                        this.message = "Du hast zu wenig Zahlen ausgewählt! Bitte wähle vier weitere Zahlen aus!";
                        this.messageClass = 'error';
                        break;
                    case 3:
                        this.message = "Du hast zu wenig Zahlen ausgewählt! Bitte wähle drei weitere Zahlen aus!";
                        this.messageClass = 'error';
                        break;
                    case 4:
                        this.message = "Du hast zu wenig Zahlen ausgewählt! Bitte wähle zwei weitere Zahlen aus!";
                        this.messageClass = 'error';
                        break;
                    case 5:
                        this.message = "Du hast zu wenig Zahlen ausgewählt! Bitte wähle eine weitere Zahl aus!";
                        this.messageClass = 'error';
                        break;
                }
            } else {
                this.message = '';
                this.inputText = this.inputValue;
                this.dict = Object.fromEntries(checkPattern(this.selectedNumbers));
                this.patternMessages = this.generatePatternMessages();
                console.log(this.dict);
                // HTTP-POST-Anfrage senden
                fetch('http://localhost:8000/api/submitForm', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                        selectedNumbers: this.selectedNumbers,
                        inputText: this.inputText,
                        dict: this.dict
                    })
                })
                .then(response => {
                    if (!response.ok) {
                        throw new Error('Fehler beim Senden an den Server');
                    }
                    return response.json();
                })
                .then(data => {
                    this.message = "Die Zahlen wurden erfolgreich an den Server gesendet!";
                    this.messageClass = 'success';
                    this.showToggle = true;
                    this.toggleDisabled = false;
                })
                .catch(error => {
                    this.message = "Fehler beim Senden an den Server: " + error.message;
                    this.messageClass = 'error';
                });
            }
        },
        generatePatternMessages() {
            let messages = [];
            if (this.dict["isEven"]) {
                messages.push("Die ausgewählten Zahlen sind alle Gerade.");
            }
            if (this.dict["isDiagonal"]) {
                messages.push("Die Zahlen wurden in einem diagonalen Muster ausgewählt.");
            }
            if (this.dict["atleastThreeAreNextToEachother"]) {
                if (this.dict["allAreNextToEachother"]) {
                    messages.push("Alle ausgewählten Zahlen sind nebeneinander.");
                } else {
                    messages.push("Mindestens drei der ausgewählten Zahlen sind aufeinanderfolgend.");
                }
            }
            if (this.dict["atleastThreeAreStacked"]) {
                if (this.dict["allAreStacked"]) {
                    messages.push("Alle ausgewählten Zahlen sind aufeinander gestapelt.");
                } else {
                    messages.push("Mindestens drei der ausgewählten Zahlen sind übereinander gestapelt.");
                }
            }
            if (this.dict["isPrime"]) {
                messages.push("Die ausgewählten Zahlen sind alle Primzahlen.");
            }
            if (this.dict["areNumbersClose"]) {
                messages.push("Die ausgewählten Zahlen liegen alle nahe beieinander.");
            }
            if (this.dict["sameIntervall"]) {
                messages.push("Die ausgewählten Zahlen haben alle den selben Abstand zueinander.");
            }
            return messages;
        },
        showPasswordPrompt(event) {
            event.preventDefault();
            var password = prompt("Bitte geben Sie das Passwort ein:");
            if (password === "123") {
                this.requestData();
            } else {
                this.message = "Falsches Passwort!";
                this.messageClass = 'error';
            }
        },
        requestData() {
            this.message = "Daten werden abgerufen...";
            fetch('http://localhost:8000/csv')
                .then(response => {
                    if (!response.ok) {
                        throw new Error('Fehler beim Abrufen der Daten');
                    }
                    return response.text(); // CSV-Daten als Text erhalten
                })
                .then(data => {
                    const blob = new Blob([data], { type: 'text/csv' });
                    const url = window.URL.createObjectURL(blob);
                    const a = document.createElement('a');
                    a.style.display = 'none';
                    a.href = url;
                    a.download = 'daten.csv';
                    document.body.appendChild(a);
                    a.click();
                    window.URL.revokeObjectURL(url);
                    this.message = "Daten wurden erfolgreich abgerufen!";
                    this.messageClass = 'success';
                })
                .catch(error => {
                    this.message = "Fehler beim Abrufen der Daten: " + error.message;
                    this.messageClass = 'error';
                });
        }
    },
    watch: {
        showDict(newValue) {
            if (newValue) {
                this.toggleActivated = true;
                this.message = '';
            }
        }
    },
    mounted() {
        for (let i = 1; i <= 49; i++) {
            this.buttonNumbers.push(i);
        }
    },
    computed: {
        toggleText() {
            return this.showDict ? "Erkannte Muster ausblenden" : "Erkannte Muster anzeigen";
        }
    }
});

app.mount('#app');

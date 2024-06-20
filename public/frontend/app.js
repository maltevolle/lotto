import { checkPattern } from './pattern.js';

const app = Vue.createApp({
    data() {
        return {
            buttonNumbers: [],
            selectedNumbers: [],
            inputValue: '',
            inputText: '',
            message: '',
            dict: ''
        };
    },
    methods: {
        handleButtonClick(number) {
            // Überprüfen, ob die maximale Anzahl von 6 Buttons erreicht wurde
            if (this.selectedNumbers.length >= 6) {
                // Überprüfen, ob die ausgewählte Zahl bereits ausgewählt wurde
                if (this.selectedNumbers.includes(number)) {
                    // Wenn die Zahl bereits ausgewählt wurde, entferne sie aus dem Array
                    const index = this.selectedNumbers.indexOf(number);
                    this.selectedNumbers.splice(index, 1);
                    this.message = ''; // Zurücksetzen der Nachricht, falls eine vorherige Meldung angezeigt wurde
                } else {
                    // Ansonsten informiere den Benutzer, dass er nicht mehr als 6 Buttons auswählen kann
                    this.message = "Sie können nicht mehr als 6 Buttons auswählen.";
                }
            } else {
                // Füge die ausgewählte Zahl zum Array hinzu
                if (this.selectedNumbers.includes(number)) {
                    // Wenn die Zahl bereits ausgewählt wurde, entferne sie aus dem Array
                    const index = this
                        .selectedNumbers.indexOf(number);
                    this.selectedNumbers.splice(index, 1);
                    this.message = ''; // Zurücksetzen der Nachricht, falls eine vorherige Meldung angezeigt wurde
                } else {
                    this.selectedNumbers.push(number);
                    this.message = ''; // Zurücksetzen der Nachricht, falls eine vorherige Meldung angezeigt wurde
                }
            }
        },
        submitForm() {
            if (this.selectedNumbers.length < 6) {
                this.message = "Zu wenig Zahlen ausgewählt!";
            } else {
                this.message = ''; // Zurücksetzen der Nachricht, falls eine vorherige Meldung angezeigt wurde
                this.inputText = this.inputValue;
                this.dict = checkPattern(this.selectedNumbers);
                console.log(this.dict);
                // HTTP-POST-Anfrage senden
                fetch('', {
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
                })
                .catch(error => {
                    this.message = "Fehler beim Senden an den Server: " + error.message;
                });
            }
        },
    },
    mounted() {
        // Fülle das Array mit den Zahlen von 1 bis 49
        for (let i = 1; i <= 49; i++) {
            this.buttonNumbers.push(i);
        }
    }
});

app.mount('#app');

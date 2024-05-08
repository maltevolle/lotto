import { checkPattern } from './pattern.js';

const app = Vue.createApp({
    data() {
        return {
            buttonNumbers: [],
            selectedNumbers: [],
            inputText: ''
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
                } else {
                    // Ansonsten informiere den Benutzer, dass er nicht mehr als 6 Buttons auswählen kann
                    console.log("Sie können nicht mehr als 6 Buttons auswählen.");
                }
            } else {
                // Füge die ausgewählte Zahl zum Array hinzu
                if (this.selectedNumbers.includes(number)) {
                    // Wenn die Zahl bereits ausgewählt wurde, entferne sie aus dem Array
                    const index = this.selectedNumbers.indexOf(number);
                    this.selectedNumbers.splice(index, 1);
                } else {
                    this.selectedNumbers.push(number);
                }
            }
        },
        submitForm() {
            if (this.selectedNumbers.length < 6) {
                console.log("Zu wenig Zahlen ausgewählt!"); // Ausgabe der ausgewählten Zahlen
            }
            else
            {
                console.log(checkPattern(this.selectedNumbers));
                this.inputText = this.inputValue
                // HTTP-POST-Anfrage senden
                fetch('http://localhost:8000', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                        selectedNumbers: this.selectedNumbers,
                        inputText: this.inputText
                    })
                    })
                    .then(response => {
                        if (!response.ok) {
                            throw new Error('Fehler beim Senden an den Server');
                        }
                        return response.json();
                    })
                    .then(data => {
                        console.log("Erfolgreich an den Server gesendet:", data);
                    })
                    .catch(error => {
                        console.error("Fehler beim Senden an den Server:", error);
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

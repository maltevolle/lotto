const app = Vue.createApp({
    data() {
        return {
            buttonNumbers: []
        };
    },
    methods: {
        handleButtonClick(number) {
            console.log("Button clicked:", number);
            // Hier kannst du die Logik für den Klick-Handler implementieren
        }
    },
    mounted() {
        // Fülle das Array mit den Zahlen von 1 bis 49
        for (let i = 1; i <= 49; i++) {
            this.buttonNumbers.push(i);
        }
    }
});

app.mount('#app');
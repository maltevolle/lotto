# Lotto


## Pattern hinzufügen
Um ein Pattern hinzuzufügen, muss man in der pattern.js Funktionen erstellen und diese dann ebenfalls in der checkPattern() ergänzen. Beim Schreiben der Funktionen sollte darauf geachtet werden, dass das Dictionary dict mit dem sich ausgedachten Schlüssel-Wert Paar erweitert wird, damit die Werte auch in die Datenbank übertragen werden und auf der Webseite angezeigt werden. Um das erkannte Muster auf der Webseite anzuzeigen, muss in der app.js generatePatternMessages() angepasst werden.

## Pattern Erklärung
- Das isEven Pattern überprüft, ob alle ausgewählten Zahlen gerade sind.
- Das isDiagonal Pattern überprüft, ob alle ausgewählten Zahlen in einer Diagonalen liegen.
- Das atLeastThreeAreNextToEachother überprüft, ob mindestens drei der ausgewählten Zahlen nebeneinander liegen.
- Das atLeastThreeAreStacked überprüft, ob mindestens drei der ausgewählten Zahlen aufeinander liegen.
- Das Pattern allAreNextToEachother überprüft, ob alle ausgewählten Zahlen nebeneinander stehen.
- Das Pattern allAreStacked überprüft, ob alle ausgewählten Zahlen aufeinander stehen.
- Das Pattern isPrime überprüft, ob es sich bei allen ausgewählten Zahlen um Primzahlen handelt.
- Die Funktion areNumbersClose überprüft, ob sich die ausgewählten Zahlen direkt nebeneinander und/oder untereinander befinden.
- Das Pattern sameIntervall prüft, ob sich alle ausgewählten Zahlen den gleichen numerischen Abstand zueinander haben.
- Die Pattern allDifferentRows und allDifferentColumns überprüfen, ob die ausgewählten Zahlen sich alle in unterschiedlichen Zeilen beziehungsweise Spalten befinden.
- Das Pattern atleastThreeNumbersAreClustered überprüft, ob mindestens drei der ausgewählten Zahlen sich Häufen.
- Das Pattern notConnectedButInAnArea überprüft, ob die ausgewählten Zahlen in bestimmten vordefinierten Bereichen des Lottofeldes liegen und ob diese Zahlen nicht direkt benachbart sind.

## Installation
1. Clone the repository: `git clone https://gitlab.ruhr-uni-bochum.de/studienprojekt-ai-sose-2024/lotto.git`
2. Navigate to the project directory: `cd lotto`
3. Create a virtual environment: `python -m venv env`
4. Activate the virtual environment:
   - On Windows: `.\env\Scripts\activate`
   - On MacOS/Linux: `source env/bin/activate`
5. Install the requirements: `pip install -r requirements.txt`


## Autoren
Malte Volle <br>
Harun Cebeci


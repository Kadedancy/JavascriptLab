document.addEventListener('DOMContentLoaded', function () {
    let L = [0, 34, 10, 21, 28, 4, 18, 9, 27, 22, 12, 3, 17, 20, 11, 33, 2, 10, 32, 0o0, 15, 8, 25, 1, 31, 20, 14, 30, 7, 24, 29, 35, 6, 13, 23, 19, 5, 36];
    let spinHistory = [];

    function randomNumber(min, max) {
        min = Math.ceil(min);
        max = Math.floor(max);
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }

    function spinRoulette() {
        let r = randomNumber(0, 37);
        let result = {
            number: L[r],
            color: (r + 1) % 2 === 0 ? 'rouge' : 'noir',
            parity: L[r] % 2 === 0 ? 'pair' : 'impair',
            range: L[r] > 18 ? 'passe' : 'manque'
        };

        let currentResultRow = document.getElementById('spinHistoryTable').insertRow(-1);

        for (let i = 0; i < 4; i++) {
            currentResultRow.insertCell(i);
        }

        if (currentResultRow.cells.length >= 4) {
            currentResultRow.cells[1].style.backgroundColor = result.color === 'rouge' ? 'red' : 'grey';
            currentResultRow.cells[2].style.backgroundColor = result.parity === 'impair' ? 'orange' : 'green';
            currentResultRow.cells[3].style.backgroundColor = result.range === 'passe' ? 'purple' : 'yellow';
            currentResultRow.cells[0].style.backgroundColor = '';
        } else {
            console.error("currentResultRow does not have enough cells.");
        }

        for (let i = 0; i < currentResultRow.cells.length; i++) {
            currentResultRow.cells[i].style.color = 'black';
        }

        currentResultRow.cells[0].textContent = result.number;
        currentResultRow.cells[1].textContent = result.color;
        currentResultRow.cells[2].textContent = result.parity;
        currentResultRow.cells[3].textContent = result.range;

        spinHistory.push(result);
    }

    document.getElementById('spinButton').addEventListener('click', spinRoulette);
});

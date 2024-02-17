document.addEventListener('DOMContentLoaded', function () {

    "use strict";

    let sock;
    let L = [0, 34, 10, 21, 28, 4, 18, 9, 27, 22, 12, 3, 17, 20, 11, 33, 2, 10, 32, 0o0, 15, 8, 25, 1, 31, 20, 14, 30, 7, 24, 29, 35, 6, 13, 23, 19, 5, 36];
    let spinHistory = [];

    function keyPressed(ev) {
        if (ev.key === "Enter") {
            sendMessage();
        }
    }

    function sendMessage() {
        console.log("SENDING!");
        let inp = document.getElementById("chatmessage");
        let msg = inp.value;
        inp.value = "";
        sock.send(msg);
    }

    function messageReceived(ev) {
        let box = document.getElementById("chatbox");
        let msg = ev.data;
        console.log(msg);
        box.value += "\n" + msg;
    }

    function main() {
        sock = new WebSocket("ws://" + document.location.host + "/sock");
        sock.addEventListener("open", () => {
            let spinButton = document.getElementById("sendButton");
            spinButton.disabled = false;
        });
        sock.addEventListener("message", messageReceived);
    }

    main();

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

        // Broadcast the spin result to all connected clients
        sock.send(JSON.stringify(result));
    }

    // Event listener for the "spinButton" click
    document.getElementById('sendButton').addEventListener('click', () => {
        // Trigger a spin request when the button is clicked
        spinRoulette();
    });
});
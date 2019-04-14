// ==UserScript==
// @name         Critters+
// @namespace    http://tampermonkey.net/
// @version      1.1.2
// @description  try to take over the world!
// @author       slaggo
// @match        https://boxcritters.com/play/*
// @grant        none
// ==/UserScript==

var jokes = [
    {"j":"What do you call a hamster in a tophat?","p":"Abrahamster Lincoln!"},
    {"j":"Where does a hamster go for vacation?","p":"Hamsterdam!"},
    {"j":"What do you call a hamster with no legs?","p":"A furball!"},
    {"j":"What do you call a hamster that can't run in a wheel?","p":"Hamateur"},
    {"j":"Why was the hamster upset with his job?","p":"It didn't pay enough celery"},
    {"j":"What do you call a hamster with three legs?","p":"Hamputee"}
]

// Code for delay function

var delay = ( function() {
    var timer = 0;
    return function(callback, ms) {
        clearTimeout (timer);
        timer = setTimeout(callback, ms);
    };
})();

// Runs on page load

window.addEventListener('load', function() {

    var chatBar = document.getElementsByClassName("input-group")[0];
    var jokeBtnHTML = `<span class="input-group-btn"><button id="jokebtn" class="btn btn-success">Joke</button></span>`;
    var clapBtnHTML = `<span class="input-group-btn"><button id="clapbtn" class="btn btn-warning">Clap</button></span>`;
    var balonoffBtnHTML = `<span class="input-group-btn"><button id="balonoffbtn" class="btn btn-info">Chat Balloons On/Off</button></span>`;
    chatBar.insertAdjacentHTML('beforeend', jokeBtnHTML);
    chatBar.insertAdjacentHTML('beforeend', clapBtnHTML);
    chatBar.insertAdjacentHTML('afterend', balonoffBtnHTML);

    function sendJoke() {
        document.getElementById("inputMessage").value="";
        var joke = jokes[(Math.floor(Math.random() * jokes.length))]; // Retrieve random joke from variable
        world.sendMessage(joke.j); // Send the first part of the joke
        delay(function(){
            world.sendMessage(joke.p); // Send the punchline
        }, 5000 ); // end delay
    }

    function sendClap() {
        var message = document.getElementById("inputMessage").value;
        document.getElementById("inputMessage").value="";
        message = message.split(" ").join("👏 ");
        message = "👏 " + message + "👏"
        console.log(message);
        world.sendMessage(message);
    }

    function balonoff() {
        document.getElementById("inputMessage").value="";
        world.sendMessage("/balloons"); // Turn chat balloons off
    }

    var jokeBtn = document.querySelector ("#jokebtn");
    if (jokeBtn) {
        jokeBtn.addEventListener ("click", sendJoke, false);
    }
    var clapBtn = document.querySelector ("#clapbtn");
    if (clapBtn) {
        clapBtn.addEventListener ("click", sendClap, false);
    }

    var balonoffBtn = document.querySelector ("#balonoffbtn");
    if (balonoffBtn) {
        balonoffBtn.addEventListener ("click", balonoff, false);
    }
}, false);



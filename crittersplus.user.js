// ==UserScript==
// @name         Critters+
// @namespace    http://discord.gg/G3PTYPy
// @version      2.3.23.56
// @description  Adds new features to BoxCritters to improve your experience!
// @author       slaggo,TumbleGamer
// @match        https://boxcritters.com/play/
// @match        https://boxcritters.com/play/?*
// @match        https://boxcritters.com/play/#*
// @match        https://boxcritters.com/play/index.html
// @match        https://boxcritters.com/play/index.html?*
// @match        https://boxcritters.com/play/index.html#*
// @require      https://code.jquery.com/jquery-3.5.1.slim.min.js
// @require      https://cdnjs.cloudflare.com/ajax/libs/popper.js/2.4.0/umd/popper.min.js
// @require      https://maxcdn.bootstrapcdn.com/bootstrap/4.5.0/js/bootstrap.min.js
// @icon         https://raw.githubusercontent.com/boxcritters/CrittersPlus/master/icon.png
// @updateURL    https://github.com/boxcritters/CrittersPlus/raw/master/crittersplus.user.js
// @run-at       document-end
// @grant        unsafeWindow
// ==/UserScript==

console.info("-----------------------------------");
console.info("[CRITTERS+]");
console.info("A mod created by Slaggo, current development under TumbleGamer");
console.info("-----------------------------------");

window = unsafeWindow || window;
var CrittersPlus = {};
var BCMacros = window.BCMacros;
window.CrittersPlus = CrittersPlus;
var chatBox = document.getElementsByClassName(
	"row justify-content-center"
)[1];

var jokes = [
	{
		j: "What do you call a hamster in a tophat?",
		p: "Abrahamster Lincoln!",
	},
	{ j: "Where does a hamster go for vacation?", p: "Hamsterdam!" },
	{ j: "What do you call a hamster with no legs?", p: "A furball!" },
	{
		j: "What do you call a hamster that can't run in a wheel?",
		p: "Hamateur.",
	},
	{
		j: "Why was the hamster upset with his job?",
		p: "It didn't pay enough celery.",
	},
	{ j: "What do you call a hamster with three legs?", p: "Hamputee." },
	{
		j: "What happens when two snails get into a fight?",
		p: "They slug it out!",
	},
	{
		j: "Why is the snail the strongest animal?",
		p: "Because he carries a house on his back!",
	},
	{ j: "How do snails make important calls?", p: "On shell phones." },
	{ j: "What kind of car does a raccoon drive?", p: "A furrari." },
]


// Code for delay function
var delay = (function () {
	var timer = 0;
	return function (callback, ms) {
		clearTimeout(timer);
		timer = setTimeout(callback, ms);
	};
})();

function camelize(str) {
	return str.replace(/(?:^\w|[A-Z]|\b\w|\s+)/g, function (match, index) {
		if (+match === 0) return ""; // or if (/\s+/.test(match)) for white spaces
		return index === 0 ? match.toLowerCase() : match.toUpperCase();
	});
}


if (!BCMacros) {
	{
		let dialogueHTML = `<div id="CP_modal" class="modal fade" tabindex="-1" role="dialog">
			<div class="modal-dialog" role="document">
				<div class="modal-content">
					<div class="modal-header"><button type="button" class="close" data-dismiss="CP_model" aria-label="Close">
					<span aria-hidden="true">&times;</span>
				  </button></div>
					<div class="modal-body"></div>
					<div class="modal-footer"></div>
				</div>
			</div>
		</div>`;
		document.body.insertAdjacentHTML("afterbegin", dialogueHTML);
	}

	function createDialogue(header, body, footer) {
		$("#CP_modal").modal();
		$("#CP_modal").modal("show");
		if (header) $("#CP_modal .modal-header").html(header);
		if (body) $("#CP_modal .modal-body").html(body);
		if (footer) $("#CP_modal .modal-footer").html(footer);
		return $("#CP_model");
	}
	createDialogue("Macro Info", /*`
	/*The Macros API has grown apart from Criters plus to become its own API only mod.
	Please click the link below to install. <strong>Make sure to uninstall Critters+ and reinstall after you have installed the macro API as this will cause problems when installed out of order.</strong>`,
		'<a class="btn btn-primary" href="https://boxcrittersmods.ga/mods/bcmacro-api/">Install Macro API</a>'*/`
		There was a error loading BCMacro mod`)
}

// Runs on page load

window.addEventListener("load", async function () {
	function sendJoke() {
		document.getElementById("message").value = "";
		var joke = jokes[Math.floor(Math.random() * jokes.length)]; // Retrieve random joke from variable
		BCMacros.sendMessage(joke.j); // Send the first part of the joke
		delay(function () {
			BCMacros.sendMessage(joke.p); // Send the punchline
		}, 5000); // end delay
	}

	function sendClap() {
		var message = document.getElementById("message").value;
		document.getElementById("message").value = "";
		message = message.split(" ").join(" 👏 ");
		message = "👏" + message + "👏";
		console.log("[CP]", message);
		BCMacro.sendMessage(message);
	}

	CrittersPlus.sendJoke = sendJoke;
	CrittersPlus.sendClap = sendClap;
	{
		console.log("[CP] Setting up macros...");
		var cpMacros = BCMacros.CreateMacroPack({
			name: "Critters Plus"
		})
		cpMacros.createMacro({
			name: "Joke",
			action: CrittersPlus.sendJoke,
			button: {
				color:"warning"
				//color: "#28a245"
			}
		})
		/*cpMacros.createMacro({
			name: "Clap",
			action: CrittersPlus.sendClap,
			button: {
				color: "#ffc107"
			}
		})*/
		cpMacros.createMacro({
			name: "Chat Balloons",
			action: _ => {
				world.stage.room.balloons.visible ^= true;
			},
			button: {}
		})
		cpMacros.createMacro({
			name: "NameTags",
			action: _ => {
				world.stage.room.nicknames.visible ^= true;
			},
			button: {}
		})

		cpMacros.createMacro({
			name: "freeitem",
			action: _ => {
				BCMacros.sendMessage("/freeitem");
			},
			button: {}
		})

		cpMacros.createMacro({
			name: "pop",
			action: _ => {
				BCMacros.sendMessage("/pop");
			},
			button: {}
		})

		cpMacros.createMacro({
			name: "beep",
			action: _ => {
				BCMacros.sendMessage("/beep");
			},
			button: {}
		})

		cpMacros.createMacro({
			name: "darkmode",
			action: _ => {
				BCMacros.sendMessage("/darkmode");
			},
			button: {}
		})

		cpMacros.createMacro({
			name: "game",
			action: _ => {
				BCMacros.sendMessage("/game");
			},
			button: {}
		})
	}

	//-------------------------------------------------------------------------------------------------------------------------

	var darkmodeHTML = `<div id="dmDiv" class="row justify-content-center"><span><input class="form-check-input" type="checkbox" value="" id="darkmode"><label class="form-check-label" for="darkmode" style="color:#696f75;">Dark Mode</label></span></div>`;
	chatBox.insertAdjacentHTML("afterend", darkmodeHTML);

	if (localStorage.getItem("theme") == "dark") {
		document.body.style = "background-color:rgb(16, 21, 31);transition:0.5s;";
		document.getElementById("darkmode").checked = true;
	}

	function darkmodeToggle() {
		if (darkmodeBox.checked == true) {
			localStorage.setItem("theme", "dark");
			document.body.style =
				"background-color:rgb(16, 21, 31);transition:0.5s;";
		} else {
			localStorage.setItem("theme", "light");
			document.body.style = "background-color:#f7f7f7;transition:0.5s;";
		}
	}

	var redeemallitemsBtn = document.querySelector("#redeemallitemsbtn");
	if (redeemallitemsBtn) {
		redeemallitemsBtn.addEventListener("click", redeemallitems, false);
	}
},
	false
);

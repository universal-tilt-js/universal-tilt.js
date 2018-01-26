// LOAD PLUGIN (JAVASCRIPT) ...
var tilts = document.querySelectorAll('.tilt');
var liveTilt = new UniversalTilt(tilts);

// ... (JQUERY)
//$('.tilt').UniversalTilt();

let eventBox = document.querySelector("#event");
let outputContainer = document.querySelector(".output");

eventBox.addEventListener("tiltChange", function(event) {
	let li = document.createElement("li");
	li.innerHTML = `<strong>X</strong>: ${event.detail.X} | <strong>Y</strong>: ${event.detail.Y}`;
	outputContainer.insertBefore(li, outputContainer.firstChild);
});

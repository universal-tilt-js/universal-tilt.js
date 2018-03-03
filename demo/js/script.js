const tilts = document.querySelectorAll('.tilt');
const liveTilt = new UniversalTilt(tilts, {
	'shadow-color': 'rgba(255, 255, 255, 0.2)'
});

let eventBox = document.querySelector("#event");
let outputContainer = document.querySelector(".output");

eventBox.addEventListener("tiltChange", function(event) {
	let li = document.createElement("li");
	li.innerHTML = `<strong>X</strong>: ${event.detail.X} | <strong>Y</strong>: ${event.detail.Y}`;
	outputContainer.insertBefore(li, outputContainer.firstChild);
});

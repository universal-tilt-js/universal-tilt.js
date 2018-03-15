const tilts = document.querySelectorAll('.tilt');
const liveTilt = new UniversalTilt(tilts, {
	'shadow-color': 'rgba(255, 255, 255, 0.2)'
});

let eventBox = document.querySelector("#event");
let outputContainer = document.querySelector(".output");

eventBox.addEventListener("tiltChange", (event) => {
	let li = document.createElement("li");
	li.innerHTML = `<strong>X</strong>: ${event.detail.tiltX} | <strong>Y</strong>: ${event.detail.tiltY}`;
	outputContainer.insertBefore(li, outputContainer.firstChild);
});

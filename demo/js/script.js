const tilts = document.querySelectorAll('.tilt');
const liveTilt = new UniversalTilt(tilts, {
	onMouseEnter: el => {
		el.style.boxShadow = '0 45px 100px rgba(255, 255, 255, 0.3)';
	},

	onMouseLeave: el => {
		el.style.boxShadow = '0 45px 100px rgba(255, 255, 255, 0)';
	},

	onDeviceMove: el => {
		el.style.boxShadow = '0 45px 100px rgba(255, 255, 255, 0.3)';
	}
});

const eventBox = document.querySelector('#event');
const outputContainer = document.querySelector('.output');

eventBox.addEventListener('tiltChange', event => {
	let li = document.createElement('li');
	li.innerHTML = `<strong>X</strong>: ${event.detail.tiltX} | <strong>Y</strong>: ${event.detail.tiltY}`;
	outputContainer.insertBefore(li, outputContainer.firstChild);
});

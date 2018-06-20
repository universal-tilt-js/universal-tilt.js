const elems = document.querySelectorAll('.tilt');
const universalTilt = new UniversalTilt(elems, {
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

eventBox.addEventListener('tiltChange', e => {
	let li = document.createElement('li');
	li.innerHTML = `<strong>X</strong>: ${e.detail.tiltX} | <strong>Y</strong>: ${e.detail.tiltY}`;
	outputContainer.insertBefore(li, outputContainer.firstChild);
});

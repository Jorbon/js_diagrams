

// let mx = 0;
// let my = 0;

// canvas.addEventListener("mousemove", event => {
// 	mx = event.x + window.scrollX;
// 	my = event.y + window.scrollY;
// });

// canvas.addEventListener("mousedown", event => {
	
// });

// window.addEventListener("mouseup", event => {
	
// });

function save_canvas() {
	let link = document.createElement("a");
	link.download = t + ".png";
	canvas.toBlob(blob => {
		link.href = URL.createObjectURL(blob);
		link.click();
	}, "image/png");
}

window.addEventListener("keydown", event => {
	switch (event.key) {
	case "ArrowRight":
		play = false;
		t = Math.round(t * 10 + 1) * 0.1;
		break;
	case "ArrowLeft":
		play = false;
		t = Math.round(t * 10 - 1) * 0.1;
		if (t < 0) t = 0;
		break;
	case "ArrowDown":
	case "r":
		play = false;
		t = 0;
		break;
	case " ":
		play = !play;
		break;
	case ",":
		speed *= 0.5;
		break;
	case ".":
		speed *= 2;
		break;
	case "/":
		speed = 0.125;
		break;
	}
});


let play = false;
let speed = 0.125;

let t = 0;

function draw() {
	if (play) {
		// save_canvas();
		t += speed;
	}
	
	ctx.fillStyle = "#ffffff";
	ctx.fillRect(0, 0, canvas.width, canvas.height);
	
	for (let thing of things) thing.draw(t);
	
	requestAnimationFrame(draw);
}

requestAnimationFrame(draw);
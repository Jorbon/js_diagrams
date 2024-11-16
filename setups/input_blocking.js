


input_size = 500;
input_height = 25;
kernel_width = 9;
kernel_height = 5;

let pos1 = new Vec2(150, 75);
let pos2 = new Vec2(pos1.x + (input_size - (kernel_width * (50 + 25) - 25)) * 0.5, 250);

let pes = [];

new Text(pos1.add(input_size * 0.5, -20), 20, "Input Vector");

for (let x = 0; x < kernel_width; x++) {
	pes.push([]);
	for (let y = 0; y < kernel_height; y++) {
		pes[x].push(new Box(pos2.add(x * 75, y * 75), pos2.add(x * 75, y * 75), new Vec2(50, 50), "PE"));
	}
}

for (let x = 0; x < kernel_width; x++) {
	new Arrow(new Vec2(pos1.x + (x + 0.5) * input_size/kernel_width, pos1.y + input_height + 25), pes[x][0].top_side(25), 7, "#00cf00");
}


for (let x = 0; x < kernel_width; x++) {
	for (let y = 0; y < kernel_height; y++) {
		new Box(pos1.add(x * input_size/kernel_width, 0), pes[x][y].startpos.add(pes[x][y].size.add(-input_size/kernel_width, -input_height).mult(0.5)), new Vec2(input_size/kernel_width, input_height), "", 0, "#0040802f");
	}
}










output_size = 400;
output_width = 25;
kernel_width = 5;
kernel_height = 7;

let pos1 = new Vec2(50, 50);
let pos2 = new Vec2(700, pos1.x - (output_size - (kernel_height * (50 + 25) - 25)) * 0.5);

let pes = [];

new Text(pos2.add(output_width * 0.5, -20), 20, "Output Vector");

for (let x = 0; x < kernel_width; x++) {
	pes.push([]);
	for (let y = 0; y < kernel_height; y++) {
		pes[x].push(new Box([pos1.add(x * 75, y * 75)], new Vec2(50, 50), "PE"));
	}
}

for (let y = 0; y < kernel_height; y++) {
	new Arrow(pes[pes.length-1][y].right_side(25), new Vec2(pos2.x - 25, pos2.y + (y + 0.5) * output_size/kernel_height), 7, "#00cf00");
}


for (let x = 0; x < kernel_width; x++) {
	for (let y = 0; y < kernel_height; y++) {
		new Box([
			pes[x][y].pos[0].add(pes[x][y].size.add(-output_width, -output_size/kernel_height).mult(0.5)),
			pes[pes.length-1][y].pos[0].add(pes[pes.length-1][y].size.add(-output_width, -output_size/kernel_height).mult(0.5)),
			pos2.add(0, y * output_size/kernel_height),
		], new Vec2(output_width, output_size/kernel_height), "", 0, "#8000402f");
	}
}







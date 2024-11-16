
let pos1 = new Vec2(80, 80);

let N = 400;
let d = 20;
let spacing = 100;

let w = 5;
let h = 7;
let pe_size = 50;
let pe_space = new Vec2(30, 30);

let arrow_space = 10;
let arrow_size = 10;
let arrow_small_space = 3;
let arrow_small_size = 7;

let text_size = 25;
let text_spacing = 16;

let matrix = [];
let pes = [];

for (let x = 0; x < w; x++) {
	matrix.push([]);
	pes.push([]);
	for (let y = 0; y < h; y++) {
		matrix[x].push(new Box([pos1.add(x * N/w + d + spacing, y * N/h)], new Vec2(N/w, N/h), "", 0, "#8040002f"));
		pes[x].push(new Box([pos1.add(N/2 + (x - (w-1)/2) * (pe_size + pe_space.x) - pe_size/2 + d + spacing, y * (pe_size + pe_space.y) + N + spacing)], new Vec2(pe_size, pe_size), "PE", 0.7));
	}
}

for (let y = 0; y < h; y++) {
	let ypos = y * N/h + (h-1)/2*(pe_size + pe_space.y) + pe_size/2 + N/2 + spacing;
	new Box([pos1.add(0, ypos)], new Vec2(d, N/h), "", 0, "#0040802f");
	new Arrow(pos1.add(d + arrow_space, ypos + N/h/2), pes[0][y].pos[0].add(-arrow_space, pe_size/2), arrow_size, "#0040805f");
}

for (let x = 0; x < w; x++) {
	new Arrow(matrix[x][h-1].pos[0].add(N/w/2, N/h + arrow_space), pes[x][0].pos[0].add(pe_size/2, -arrow_space), arrow_size, "#8040005f");
	
	let xpos = x * N/w + d + spacing;
	let ypos = N + spacing*2 + h*pe_size + (h-1)*pe_space.y;
	new Box([pos1.add(xpos, ypos)], new Vec2(N/w, d), "", 0, "#8000402f");
	new Arrow(pes[x][h-1].pos[0].add(pe_size/2, pe_size + arrow_space), pos1.add(xpos + N/w/2, ypos - arrow_space), arrow_size, "#8000405f");
}

for (let x = 0; x < w-1; x++) {
	for (let y = 0; y < h; y++) {
		new Arrow(pes[x][y].pos[0].add(pe_size + arrow_small_space, pe_size/2), pes[x+1][y].pos[0].add(-arrow_small_space, pe_size/2), arrow_small_size, "#0040805f")
	}
}

for (let x = 0; x < w; x++) {
	for (let y = 0; y < h-1; y++) {
		new Arrow(pes[x][y].pos[0].add(pe_size/2, pe_size + arrow_small_space), pes[x][y+1].pos[0].add(pe_size/2, -arrow_small_space), arrow_small_size, "#8000405f")
	}
}



new Text(pos1.add(d + spacing + N/2, -text_spacing), text_size, "Circuit Matrix");
new Text(pos1.add(d + spacing + N/2 + 300, -text_spacing), text_size, "Input Vector");
new Text(pos1.add(d + spacing + N/2, N + pe_size*h + pe_space.y*(h-1) + spacing*2 + d + text_size*0.8 + text_spacing), text_size, "Output Vector");


new Arrow(new Vec2(700, 200), new Vec2(700, 500), 60, "#000000");




let matrix_color = "#ffd484";
let matrix_arrow_color = "#fba72f";
let vector_color = "#9fe3ff";
let vector_arrow_color = "#34c4fb";
let output_color = "#ffb3f1";
let output_arrow_color = "#f728c9";


let pos1 = new Vec2(50, 50);

let N = 400;
let d = 20;
let spacing = 300;

let w = 7;
let h = 9;
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
let inputs = [];
let outputs = [];

let pe_grid_width = w * pe_size + (w - 1) * pe_space.x;
let pe_grid_height = h * pe_size + (h - 1) * pe_space.y;

// matrix
for (let x = 0; x < w; x++) {
	matrix.push([]);
	pes.push([]);
	for (let y = 0; y < h; y++) {
		pes[x].push(pos1.add(N/2 + (x - (w-1)/2) * (pe_size + pe_space.x) - pe_size/2 + N + spacing, y * (pe_size + pe_space.y)));
		matrix[x].push(new Box([
			pos1.add(x * N/w, y * N/h + pe_grid_height/2 - N/2),
			pes[x][y].add(pe_size/2 - (N/w)/2, pe_size/2 - (N/h)/2),
			new Vec2(NaN, NaN),
		], new Vec2(N/w, N/h), "", 0, matrix_color));
	}
}

// vector
for (let x = 0; x < w; x++) {
	inputs.push([]);
	for (let y = 0; y < h; y++) {
		inputs[x].push(new Box([
			new Vec2(NaN, NaN),
			new Vec2(NaN, NaN),
			pos1.add((N-d)/2, y * N/h + pe_grid_height/2 - N/2),
			pes[0][y].add(pe_size/2 - d/2, pe_size/2 - N/h/2),
			pes[x][y].add(pe_size/2 - d/2, pe_size/2 - N/h/2),
			new Vec2(NaN, NaN),
		], new Vec2(d, N/h), "", 0, vector_color));
	}
}

// output

for (let x = 0; x < w; x++) {
	outputs.push([]);
	for (let y = 0; y < h; y++) {
		let frames = [];
		for (let i = 0; i < 5; i++) frames.push(new Vec2(NaN, NaN));
		frames.push(pes[x][y].add(pe_size/2 - N/w/2, pe_size/2 - d/2));
		for (let i = 0; i < y; i++) frames.push(null);
		if (y < h - 1) frames.push(
			pes[x][y + 1].add(pe_size/2 - N/w/2, pe_size/2 - d/2),
			new Vec2(NaN, NaN)
		);
		for (let i = 0; i < h-y-1; i++) frames.push(null);
		frames.push(pos1.add(x * N/w, (N-d)/2 + pe_grid_height/2 - N/2));
		
		
		// frames.push(
		// 	pes[x][h-1].add(pe_size/2 - N/w/2, pe_size/2 - d/2),
		// 	pos1.add((N-d)/2, y * N/h + pe_grid_height/2 - N/2),
		// 	new Vec2(NaN, NaN)
		// );
		outputs[x].push(new Box(frames, new Vec2(N/w, d), "", 0, output_color));
	}
}

// PEs
for (let x = 0; x < w; x++) {
	for (let y = 0; y < h; y++) {
		pes[x][y] = new Box([pes[x][y]], new Vec2(pe_size, pe_size), "PE", 0.7, "#ffffff00");
	}
}


// for (let x = 0; x < w; x++) {
// 	new Arrow(matrix[x][h-1].pos[0].add(N/w/2, N/h + arrow_space), pes[x][0].pos[0].add(pe_size/2, -arrow_space), arrow_size, matrix_arrow_color);
	
// 	let xpos = x * N/w + d + spacing;
// 	let ypos = N + spacing*2 + h*pe_size + (h-1)*pe_space.y;
// 	new Box([pos1.add(xpos, ypos)], new Vec2(N/w, d), "", 0, output_color);
// 	new Arrow(pes[x][h-1].pos[0].add(pe_size/2, pe_size + arrow_space), pos1.add(xpos + N/w/2, ypos - arrow_space), arrow_size, output_arrow_color);
// }

// for (let x = 0; x < w-1; x++) {
// 	for (let y = 0; y < h; y++) {
// 		new Arrow(pes[x][y].pos[0].add(pe_size + arrow_small_space, pe_size/2), pes[x+1][y].pos[0].add(-arrow_small_space, pe_size/2), arrow_small_size, vector_arrow_color)
// 	}
// }

// for (let x = 0; x < w; x++) {
// 	for (let y = 0; y < h-1; y++) {
// 		new Arrow(pes[x][y].pos[0].add(pe_size/2, pe_size + arrow_small_space), pes[x][y+1].pos[0].add(pe_size/2, -arrow_small_space), arrow_small_size, output_arrow_color)
// 	}
// }

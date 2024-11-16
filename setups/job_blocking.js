
let matrix_color = "#ffd484";
let vector_color = "#9fe3ff";
let output_color = "#ffb3f1";


single_size = 400;
single_width = 12;
input_parts = 8;
output_parts = 5;

region_margin = 25;

kernel_width = 9;
kernel_height = 12;
pe_scale = 20;

let pes = [];

let pos0 = new Vec2(50, 50);
let pos1 = pos0.add(0, 50 + region_margin);
let pos2 = pos0.add(single_size + region_margin, 0);
let pos3 = pos0.add(single_size * 1.5 + region_margin - (kernel_width * pe_scale * 0.75 - pe_scale * 0.25), region_margin + 75);
let pos4 = pos0.add(2 * (single_size + region_margin) + 50, 50 + region_margin);

for (let x = 0; x < kernel_width; x++) {
	pes.push([]);
	for (let y = 0; y < kernel_height; y++) {
		pes[x].push(pos3.add(x * pe_scale * 1.5, y * pe_scale * 1.5));
	}
}

new Text(pos3.add(pe_scale * kernel_width * 0.75 - pe_scale * 0.25, pe_scale * kernel_height * 1.5 + 25), 20, "WSE Fabric");

new Text(pos1.add(single_size * 0.5, -15), 20, "Circuit Matrix");
new Text(pos2.add(single_size * 0.5, 10), 20, "Input Vector");
new Text(pos4.add(single_width * 0.5, -10), 20, "Output Vector");


let sx = 5;
let sy = 1;

for (let x = 0; x < input_parts; x++) {
	for (let y = 0; y < output_parts; y++) {
		if (x == sx && y == sy) continue;
		new Box([
			pos1.add(x * single_size/input_parts, y * single_size/output_parts)
		], new Vec2(single_size/input_parts, single_size/output_parts), "", 0, matrix_color);
	}
}

for (let x = 0; x < kernel_width; x++) {
	for (let y = 0; y < kernel_height; y++) {
		new Box([
			pos1.add(sx * single_size/input_parts + x * single_size/(input_parts*kernel_width), sy * single_size/output_parts + y * single_size/(output_parts*kernel_height)),
			pes[x][y].add((pe_scale - single_size/(input_parts*kernel_width))/2, (pe_scale - single_size/(output_parts*kernel_height))/2)
		], new Vec2(single_size/(input_parts*kernel_width), single_size/(output_parts*kernel_height)), "", 0, matrix_color);
	}
}


for (let x = 0; x < input_parts; x++) {
	if (x == sx) continue;
	new Box([
		pos2.add(x * single_size/input_parts, 25)
	], new Vec2(single_size/input_parts, single_width), "", 0, vector_color);
}

for (let x = 0; x < kernel_width; x++) {
	for (let y = 0; y < kernel_height; y++) {
		new Box([
			pos2.add(sx * single_size/input_parts + x * single_size/(input_parts*kernel_width), 25),
			null,
			pes[x][0].add((pe_scale - single_size/(input_parts*kernel_width))/2, (pe_scale - single_width)/2),
			pes[x][y].add((pe_scale - single_size/(input_parts*kernel_width))/2, (pe_scale - single_width)/2)
		], new Vec2(single_size/(input_parts*kernel_width), single_width), "", 0, vector_color);
	}
}



for (let y = 0; y < output_parts; y++) {
	if (y == sy) continue;
	new Box([
		pos4.add(0, y * single_size/output_parts)
	], new Vec2(single_width, single_size/output_parts), "", 0, output_color);
}

for (let x = 0; x < kernel_width; x++) {
	for (let y = 0; y < kernel_height; y++) {
		new Box([
			pes[x][y].add((pe_scale - single_width)/2, (pe_scale - single_size/(output_parts*kernel_height))/2),
			null,
			null,
			null,
			pes[pes.length-1][y].add((pe_scale - single_width)/2, (pe_scale - single_size/(output_parts*kernel_height))/2),
			pos4.add(0, sy * single_size/output_parts + y * single_size/(output_parts*kernel_height))
		], new Vec2(single_width, single_size/(output_parts*kernel_height)), "", 0, output_color);
	}
}


for (let x = 0; x < kernel_width; x++) {
	for (let y = 0; y < kernel_height; y++) {
		pes[x][y] = new Box([pes[x][y]], new Vec2(pe_scale, pe_scale), "PE", 0.8, "#ffffff00");
	}
}


// for (let y = 0; y < kernel_height; y++) {
// 	new Arrow(pes[pes.length-1][y].right_side(25), new Vec2(pos2.x - 25, pos2.y + (y + 0.5) * output_size/kernel_height), 7, "#00cf00");
// }


// for (let x = 0; x < kernel_width; x++) {
// 	for (let y = 0; y < kernel_height; y++) {
// 		new Box([
// 			pes[x][y].pos[0].add(pes[x][y].size.add(-output_width, -output_size/kernel_height).mult(0.5)),
// 			pes[pes.length-1][y].pos[0].add(pes[pes.length-1][y].size.add(-output_width, -output_size/kernel_height).mult(0.5)),
// 			pos2.add(0, y * output_size/kernel_height),
// 		], new Vec2(output_width, output_size/kernel_height), "", 0, output_color);
// 	}
// }







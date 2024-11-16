


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
		pes[x].push(new Box([pos3.add(x * pe_scale * 1.5, y * pe_scale * 1.5)], new Vec2(pe_scale, pe_scale), "PE", 0.8));
	}
}

new Text(pos3.add(pe_scale * kernel_width * 0.75 - pe_scale * 0.25, pe_scale * kernel_height * 1.5 + 25), 20, "WSE Fabric");

new Text(pos1.add(single_size * 0.5, -15), 20, "Circuit Matrix");
new Text(pos2.add(single_size * 0.5, 10), 20, "Input Vector");
new Text(pos4.add(single_width * 0.5, -10), 20, "Output Vector");


let step_count = 0;

for (let sy = 0; sy < output_parts; sy++) {
	for (let sx = 0; sx < input_parts; sx++) {
		for (let x = 0; x < kernel_width; x++) {
			for (let y = 0; y < kernel_height; y++) {
				let anim_pos = [pos1.add(sx * single_size/input_parts + x * single_size/(input_parts*kernel_width), sy * single_size/output_parts + y * single_size/(output_parts*kernel_height))];
				for (let i = 0; i < step_count; i++) anim_pos.push(null);
				anim_pos.push(pes[x][y].pos[0].add(pes[x][y].size.add(-single_size/(input_parts*kernel_width), -single_size/(output_parts*kernel_height)).mult(0.5)));
				anim_pos.push(null);
				anim_pos.push(null);
				anim_pos.push(new Vec2(NaN, NaN));
				new Box(anim_pos, new Vec2(single_size/(input_parts*kernel_width), single_size/(output_parts*kernel_height)), "", 0, "#8040002f");
			}
		}
		step_count += 1;
		
		for (let x = 0; x < kernel_width; x++) {
			for (let y = 0; y < kernel_height; y++) {
				let anim_pos = [pos2.add(sx * single_size/input_parts + x * single_size/(input_parts*kernel_width), 25)];
				for (let i = 0; i < step_count; i++) anim_pos.push(null);
				anim_pos.push(pes[x][0].pos[0].add(pes[x][0].size.add(-single_size/(input_parts*kernel_width), -single_width).mult(0.5)));
				anim_pos.push(pes[x][y].pos[0].add(pes[x][y].size.add(-single_size/(input_parts*kernel_width), -single_width).mult(0.5)));
				anim_pos.push(new Vec2(NaN, NaN));
				new Box(anim_pos, new Vec2(single_size/(input_parts*kernel_width), single_width), "", 0, "#0040802f");
			}
		}
		step_count += 2;
	}
	
	for (let x = 0; x < kernel_width; x++) {
		for (let y = 0; y < kernel_height; y++) {
			let anim_pos = [new Vec2(NaN, NaN)];
			for (let i = 0; i < step_count - (input_parts - 1) * 3 - 1; i++) anim_pos.push(null);
			anim_pos.push(pes[x][y].pos[0].add(pes[x][y].size.add(-single_width, -single_size/(output_parts*kernel_height)).mult(0.5)));
			for (let i = 0; i < (input_parts - 1) * 3; i++) anim_pos.push(null);
			anim_pos.push(pes[pes.length-1][y].pos[0].add(pes[pes.length-1][y].size.add(-single_width, -single_size/(output_parts*kernel_height)).mult(0.5)));
			anim_pos.push(pos4.add(0, sy * single_size/output_parts + y * single_size/(output_parts*kernel_height)));
			new Box(anim_pos, new Vec2(single_width, single_size/(output_parts*kernel_height)), "", 0, "#8000402f");
		}
	}
	step_count += 2;
}










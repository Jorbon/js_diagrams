


input_parts = 5;
output_parts = 3;
part_size = 25;


let pos1 = new Vec2(50, 100);
let pos2 = pos1.add(0, 150);
let pos3 = pos1.add(part_size*2*input_parts + 100, part_size*1.5);

let mem = new Box([pos1.add(-20, -50)], new Vec2(pos3.x - pos1.x + part_size*1.5 + 60, part_size*4 + 70));

new Text(pos1.add((input_parts*part_size*2 - part_size)*0.5, -20), 20, "Input Vector");
new Text(pos2.add((input_parts*part_size*2 - part_size)*0.5, output_parts*part_size*2 - part_size + 35), 20, "Circuit Matrix");
new Text(pos3.add(part_size*0.75, -45), 20, "Output");
new Text(pos3.add(part_size*0.75, -20), 20, "Element");
new Text(mem.pos[0].add(mem.size.x*0.5, -15), 20, "PE Memory");

let inputs = [];
for (let x = 0; x < input_parts; x++) {
	inputs.push(new Box([pos1.add(x * part_size*2, 0)], new Vec2(part_size, part_size), Math.floor(Math.random()*10), 0.6, "#0040802f"));
}




let last_output;
let mes = [];

let step_count = 0;
for (let y = 0; y < output_parts; y++) {
	mes.push([]);
	for (let x = 0; x < input_parts; x++) {
		let times_anim_pos = [new Vec2(NaN, NaN)];
		for (let i = 0; i < step_count; i++) times_anim_pos.push(null);
		times_anim_pos.push(inputs[x].pos[0].add(0, part_size*1.5));
		times_anim_pos.push(new Vec2(NaN, NaN));
		new Box(times_anim_pos, new Vec2(part_size, part_size), "×", 0.9, "#ffffff", "#ffffff");
		
		let plus_anim_pos = [new Vec2(NaN, NaN)];
		for (let i = 0; i < step_count+1; i++) plus_anim_pos.push(null);
		plus_anim_pos.push(pos3.add(-part_size*1.5, 0));
		plus_anim_pos.push(new Vec2(NaN, NaN));
		new Box(plus_anim_pos, new Vec2(part_size, part_size), "+", 0.9, "#ffffff", "#ffffff");
		
		let anim_pos = [pos2.add(x * part_size*2, y * part_size*2)];
		for (let i = 0; i < step_count; i++) anim_pos.push(null);
		anim_pos.push(pos1.add(x * part_size*2, part_size*3));
		anim_pos.push(new Vec2(NaN, NaN));
		mes[y].push(new Box(anim_pos, new Vec2(part_size, part_size), Math.floor(Math.random()*10), 0.6, "#8040002f"));
		step_count += 1;
		
		anim_pos = [new Vec2(NaN, NaN)];
		for (let i = 0; i < step_count-1; i++) anim_pos.push(null);
		anim_pos.push(inputs[x].pos[0].add(part_size*1.5, part_size*1.5));
		anim_pos.push(pos3.add(-part_size*3, 0));
		anim_pos.push(new Vec2(NaN, NaN));
		new Box(anim_pos, new Vec2(part_size, part_size), inputs[x].label * mes[y][x].label, 0.7, "#0080402f");
		step_count += 1;
	}
	
	let output_anim_pos = [new Vec2(NaN, NaN)];
	for (let i = 0; i < step_count; i++) output_anim_pos.push(null);
	output_anim_pos[step_count - input_parts*2] = pos3;
	output_anim_pos.push(pos3.add(120, 0));
	output_anim_pos.push(new Vec2(NaN, NaN));
	last_output = new Box(output_anim_pos, new Vec2(part_size*1.5, part_size), 0, 0.7, "#8000402f");
	last_output.label_function = function(t) {
		let sum = 0;
		for (let x = 0; x < (t - y * (input_parts*2+1))*0.5-1 && x < input_parts; x++) sum += inputs[x].label * mes[y][x].label;
		return sum;
	};
	step_count += 1;
}









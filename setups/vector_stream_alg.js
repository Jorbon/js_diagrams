


input_parts = 5;
output_parts = 3;
part_size = 25;


let pos1 = new Vec2(50, 70);
let pos2 = pos1.add(0, 150);
let pos3 = pos2.add(part_size*3*input_parts + 100, 0);

let mem = new Box([pos2.add(-20, -part_size*3 - 20)], new Vec2(pos3.x - pos2.x + part_size*1.5 + 80, output_parts*part_size*2 + part_size*2 + 80));

new Text(pos1.add((input_parts*part_size*3 - part_size*2)*0.5, -25), 20, "Input Vector");
new Text(pos2.add((input_parts*part_size*3 - part_size*2)*0.5, output_parts*part_size*2 - part_size + 35), 20, "Circuit Matrix");
new Text(pos3.add(part_size*0.75, output_parts*part_size*2 - part_size + 35), 20, "Output Vector");
new Text(mem.pos[0].add(mem.size.x*0.5, mem.size.y + 30), 20, "PE Memory");

let mes = [];

for (let x = 0; x < input_parts; x++) {
	mes.push([]);
	for (let y = 0; y < output_parts; y++) {
		mes[x].push(new Box([pos2.add(x * part_size*3, y * part_size*2)], new Vec2(part_size, part_size), Math.floor(Math.random()*10).toString(), 0.6, "#8040002f"));
	}
}

let inputs = [];

let outputs = [];
let output_nums = [];
for (let y = 0; y < output_parts; y++) {
	outputs.push(new Box([pos3.add(0, y * part_size*2)], new Vec2(part_size*1.5, part_size), "0", 0.7, "#8000402f"));
	output_nums.push(Math.floor(Math.random()*50));
	outputs[y].label_function = function(t) {
		let sum = output_nums[y];
		for (let x = 0; x < t*0.5-1 && x < input_parts; x++) sum += parseFloat(inputs[x].label) * parseFloat(mes[x][y].label);
		return sum.toString();
	};
}


let step_count = 0;


for (let sx = 0; sx < input_parts; sx++) {
	let times_anim_pos = [new Vec2(NaN, NaN)];
	for (let i = 0; i < step_count; i++) times_anim_pos.push(null);
	times_anim_pos.push(mes[sx][0].pos[0].add(0, -part_size*1.5));
	times_anim_pos.push(new Vec2(NaN, NaN));
	new Box(times_anim_pos, new Vec2(part_size, part_size), "×", 0.9, "#ffffff", "#ffffff");
	
	for (let y = 0; y < output_parts; y++) {
		let plus_anim_pos = [new Vec2(NaN, NaN)];
		for (let i = 0; i < step_count+1; i++) plus_anim_pos.push(null);
		plus_anim_pos.push(outputs[y].pos[0].add(-part_size*1.25, 0));
		plus_anim_pos.push(new Vec2(NaN, NaN));
		new Box(plus_anim_pos, new Vec2(part_size, part_size), "+", 0.9, "#ffffff", "#ffffff");
	}
	
	
	let anim_pos = [pos1.add(sx * part_size*3, 0)];
	for (let i = 0; i < step_count; i++) anim_pos.push(null);
	anim_pos.push(pos1.add(sx * part_size*3, part_size*3));
	anim_pos.push(new Vec2(NaN, NaN));
	inputs.push(new Box(anim_pos, new Vec2(part_size, part_size), Math.floor(Math.random()*10), 0.6, "#0040802f"));
	step_count += 1;
	
	for (let y = 0; y < output_parts; y++) {
		let anim_pos = [pos2.add(new Vec2(NaN, NaN))];
		for (let i = 0; i < step_count - 1; i++) anim_pos.push(null);
		anim_pos.push(mes[sx][y].pos[0].add(part_size*1.25, 0));
		anim_pos.push(outputs[y].pos[0].add(-part_size*2.5, 0));
		anim_pos.push(new Vec2(NaN, NaN));
		new Box(anim_pos, new Vec2(part_size, part_size), (parseFloat(inputs[sx].label) * parseFloat(mes[sx][y].label)).toString(), 0.7, "#0080402f");
	}
	step_count += 1;
}











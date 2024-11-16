
canvas.width = 850;
canvas.height = 750;


let pos = new Vec2(200, 50);

let pes = [];

for (let x = 0; x < 5; x++) {
	pes.push([]);
	for (let y = 0; y < 7; y++) {
		pes[x].push(new Box(pos.add(x * 100, y * 100), new Vec2(50, 50), "PE"));
	}
}

let host_in = new Box(pes[0][0].pos.add(-150, 0), new Vec2(75, 50), "Host", 0.5, "#ffffaf");
let host_out = new Box(pes[pes.length-1][pes[0].length-1].pos.add(125, 0), new Vec2(75, 50), "Host", 0.5, "#ffffaf");
new Arrow(host_in.right_side(5), pes[0][0].left_side(5), 5, "#ff0000");
new Arrow(pes[pes.length-1][pes[0].length-1].right_side(5), host_out.left_side(5), 5, "#ff0000");

for (let y = 0; y < pes[0].length; y++) {
	if (y < pes[0].length - 1) {
		new Arrow(pes[0][y].bottom_side(5), pes[0][y+1].top_side(5), 5, "#4040ff");
		new Arrow(pes[pes.length-1][y].bottom_side(5), pes[pes.length-1][y+1].top_side(5), 5, "#4040ff");
	}
	
	for (let x = 0; x < pes.length - 1; x++) {
		new Arrow(pes[x][y].right_side(5), pes[x+1][y].left_side(5), 5, "#00cf00");
	}
}









let pos1 = new Vec2(120, 120);
let graph = new Box([pos1], new Vec2(1000, 300));

new GraphLine(graph, [
	new Vec2(   0, 200),
	new Vec2( 260, 200),
	new Vec2( 270, 100),
	new Vec2( 310, 100),
	new Vec2( 320, 200),
	new Vec2( 580, 200),
	new Vec2( 590, 100),
	new Vec2( 630, 100),
	new Vec2( 640, 200),
	new Vec2( 900, 200),
	new Vec2( 910, 100),
	new Vec2( 950, 100),
	new Vec2( 960, 200),
	new Vec2(1000, 200),
], "#00cf00", lerp_cubic);

new GraphLine(graph, [
	new Vec2(   0,  10),
	new Vec2( 260,  10),
	new Vec2( 270, 200),
	new Vec2( 310, 200),
	new Vec2( 320,  10),
	new Vec2( 580,  10),
	new Vec2( 590, 200),
	new Vec2( 630, 200),
	new Vec2( 640,  10),
	new Vec2( 900,  10),
	new Vec2( 910, 200),
	new Vec2( 950, 200),
	new Vec2( 960,  10),
	new Vec2(1000,  10),
], "#ff0000", lerp_cubic);

new GraphLine(graph, [
	new Vec2(0, 200),
	new Vec2(1000, 200),
], "#0000005f");


new Box([pos1.add(250, -20)], new Vec2(200, 0), "", 0, "#00cf00", "#00cf00");
new Text(pos1.add(350, -30), 20, "IO Utilization");
new Box([pos1.add(550, -20)], new Vec2(200, 0), "", 0, "#ff0000", "#ff0000");
new Text(pos1.add(650, -30), 20, "Compute Utilization");

let t1 = new Text(pos1.add(125, graph.size.y + 40), 20, "Sending Matrix");
new Arrow(t1.pos.add(0, -25), t1.pos.add(0, -70), 5, "#000000");
let t2 = new Text(pos1.add(290, graph.size.y + 75), 20, "Sending Input Vector");
new Arrow(t2.pos.add(0, -25), t2.pos.add(0, -105), 5, "#000000");

new Text(graph.pos[0].add(graph.size.x*0.5, graph.size.y + 30), 20, "Time →");

new Text(graph.top_side(70), 25, "Vector Streaming Resource Utilization Over Time");

new Text(pos1.add(-50, 95), 16, "Maximum");
new Text(pos1.add(-50, 115), 16, "Utilization");

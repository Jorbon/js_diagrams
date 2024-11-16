

let pos1 = new Vec2(120, 120);
let graph = new Box([pos1], new Vec2(1000, 300));

new GraphLine(graph, [
	new Vec2(0, 200),
	new Vec2(1000, 200),
], "#00cf00");

new GraphLine(graph, [
	new Vec2(   0,  10),
	new Vec2(  20,  10),
	new Vec2(  30,  50),
	new Vec2( 290,  50),
	new Vec2( 300,  10),
	new Vec2( 320,  10),
	new Vec2( 330,  50),
	new Vec2( 590,  50),
	new Vec2( 600,  10),
	new Vec2( 620,  10),
	new Vec2( 630,  50),
	new Vec2( 890,  50),
	new Vec2( 900,  10),
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

let t1 = new Text(pos1.add(160, graph.size.y + 40), 20, "Sending Matrix");
new Arrow(t1.pos.add(0, -25), t1.pos.add(0, -70), 5, "#000000");
let t2 = new Text(pos1.add(310, graph.size.y + 75), 20, "Sending Input Vector");
new Arrow(t2.pos.add(0, -25), t2.pos.add(0, -70), 5, "#000000");

new Text(graph.pos[0].add(graph.size.x*0.5, graph.size.y + 30), 20, "Time →");

new Text(graph.top_side(70), 25, "Matrix Streaming Resource Utilization Over Time");

new Text(pos1.add(-50, 95), 16, "Maximum");
new Text(pos1.add(-50, 115), 16, "Utilization");

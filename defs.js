

function lerp(a, b, t) {
	return a + (b - a) * t;
}

function prel(a, b, y) {
	return (y - a) / (b - a);
}

function lerp_cubic(a, b, t) {
	return a + (b - a) * (3 - 2*t)*t*t;
}

class Vec2 {
	constructor(x, y) {
		if (x instanceof Vec2) {
			this.x = x.x;
			this.y = x.y;
		} else {
			this.x = x;
			this.y = y;
		}
	}
	add(x, y) {
		if (x instanceof Vec2) return new Vec2(this.x + x.x, this.y + x.y);
		return new Vec2(this.x + x, this.y + y);
	}
	sub(other) { return new Vec2(this.x - other.x, this.y - other.y); }
	mult(c) { return new Vec2(this.x * c, this.y * c); }
	len2() { return this.x*this.x + this.y*this.y; }
	len() { return Math.sqrt(this.x*this.x + this.y*this.y); }
	norm() { return this.mult(1/this.len()); }
	left() { return new Vec2(this.y, -this.x); }
	right() { return new Vec2(-this.y, this.x); }
	d() { return [this.x, this.y]; }
	static lerp(a, b, t) {
		return a.add(b.sub(a).mult(t));
	}
}

class Box {
	constructor(pos, size, label="", label_size=0.5, color="#ffffff", outline_color="#000000") {
		if (pos instanceof Box) {
			this.pos = [];
			for (let p of pos.pos) this.pos.push(new Vec2(p));
			this.size = new Vec2(pos.size);
			this.label = pos.label;
			this.label_size = pos.label_size;
			this.color = pos.color;
			this.outline_color = pos.outline_color;
		} else {
			this.pos = pos;
			this.size = size;
			this.label = label;
			this.label_size = label_size;
			this.color = color;
			this.outline_color = outline_color;
		}
		
		for (let p of this.pos) {
			if (p === null) continue;
			if (p.x + size.x + 50 > canvas.width) canvas.width = p.x + size.x + 50;
			if (p.y + size.y + 50 > canvas.height) canvas.height = p.y + size.y + 50;
		}
		
		things.push(this);
	}
	draw(t) {
		if (Math.abs(t - Math.round(t)) < 0.001) t = Math.round(t);
		
		let at = Math.floor(t);
		let bt = Math.ceil(t);
		
		let pos;
		if (at < 0) pos = this.pos[0];
		else if (bt >= this.pos.length) {
			bt = this.pos.length - 1;
			while (this.pos[bt] == null) bt--;
			pos = this.pos[bt];
		} else {
			while (this.pos[at] === null) at--;
			while (this.pos[bt] === null) bt--;
			pos = Vec2.lerp(this.pos[at], this.pos[bt], t % 1);
		}
		
		if (this.label_function) this.label = this.label_function(t);
		
		ctx.fillStyle = this.color;
		ctx.strokeStyle = this.outline_color;
		ctx.lineWidth = 2;
		ctx.fillRect(pos.x, pos.y, this.size.x, this.size.y);
		ctx.strokeRect(pos.x, pos.y, this.size.x, this.size.y);
		
		ctx.fillStyle = "#000000";
		let font_size = 12;
		ctx.font = font_size + "px Sans-serif";
		let label_width = ctx.measureText(this.label).width;
		let label_height = font_size * 0.7;
		font_size = Math.round(font_size * Math.min((this.size.x * this.label_size) / label_width, (this.size.y * this.label_size) / label_height));
		ctx.font = font_size + "px Sans-serif";
		label_width = ctx.measureText(this.label).width;
		label_height = font_size * 0.7;
		ctx.fillText(this.label, pos.x + (this.size.x - label_width) * 0.5, pos.y + (this.size.y + label_height) * 0.5);
	}
	left_side(distance=0) { return this.pos[0].add(-distance, this.size.y * 0.5); }
	right_side(distance=0) { return this.pos[0].add(this.size.x + distance, this.size.y * 0.5); }
	top_side(distance=0) { return this.pos[0].add(this.size.x * 0.5, -distance); }
	bottom_side(distance=0) { return this.pos[0].add(this.size.x * 0.5, this.size.y + distance); }
}

class Arrow {
	constructor(start, end, width, color) {
		this.start = start;
		this.end = end;
		this.width = width;
		this.color = color;
		
		things.push(this);
	}
	draw(t) {
		ctx.fillStyle = this.color;
		ctx.beginPath();
		
		let f = this.end.sub(this.start);
		let m = f.sub(f.norm().mult(this.width * 2));
		let s = f.norm().mult(this.width * 0.5).right();
		let w = s.mult(2.5);
		ctx.moveTo(...this.start.add(s).d());
		ctx.lineTo(...this.start.sub(s).d());
		ctx.lineTo(...this.start.sub(s).add(m).d());
		ctx.lineTo(...this.start.sub(w).add(m).d());
		ctx.lineTo(...this.start.add(f).d());
		ctx.lineTo(...this.start.add(w).add(m).d());
		ctx.lineTo(...this.start.add(s).add(m).d());
		ctx.closePath();
		
		ctx.fill();
	}
}

class Text {
	constructor(pos, font_size, text) {
		this.pos = pos;
		this.font_size = font_size;
		this.text = text;
		
		ctx.font = "bold " + this.font_size + "px Sans-serif";
		let text_width = ctx.measureText(this.text).width;
		if (this.pos.x + text_width * 0.5 + 50 > canvas.width) canvas.width = this.pos.x + text_width * 0.5 + 50;
		if (this.pos.y + 50 > canvas.height) canvas.height = this.pos.y + 50;
		
		things.push(this);
	}
	draw(t) {
		ctx.fillStyle = "#000000";
		ctx.font = "bold " + this.font_size + "px Sans-serif";
		let text_width = ctx.measureText(this.text).width;
		ctx.fillText(this.text, this.pos.x - text_width * 0.5, this.pos.y);
	}
}

class GraphLine {
	constructor(box, points, color="#000000", lerp_function=lerp) {
		this.box = box;
		this.points = points;
		this.color = color;
		this.lerp_function = lerp_function;
		
		things.push(this);
	}
	draw(t) {
		ctx.lineWidth = 2;
		ctx.strokeStyle = this.color;
		ctx.beginPath();
		let i = 0;
		outer:
		for (let x = 0; x <= this.box.size.x; x++) {
			if (x < this.points[i].x) continue;
			while (this.points[i+1].x < x) {
				i++;
				if (i >= this.points.length - 1) break outer;
			}
			ctx.lineTo(this.box.pos[0].x + x, this.box.pos[0].y + this.box.size.y - (
				this.lerp_function(this.points[i].y, this.points[i+1].y, prel(this.points[i].x, this.points[i+1].x, x))
			));
		}
		ctx.stroke();
	}
}





let things = [];

let canvas = document.getElementById("canvas");
let ctx = canvas.getContext("2d");

canvas.width = 100;
canvas.height = 100;






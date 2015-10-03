export function fromDisc(radius) {
	radius *= Math.sqrt(Math.random());
	
	let angle = 2 * Math.PI * Math.random();
	
	return [
		radius * Math.cos(angle),
		radius * Math.sin(angle),
	];
}

export function fromCircle(radius) {
	let angle = 2 * Math.PI * Math.random();
	
	return [
		radius * Math.cos(angle),
		radius * Math.sin(angle),
	];
}

import Random from './random';

function lerp(a, b, t) {
	return a + t * (b - a);
}

export function gradient(values, value) {
	while (value < 0) {
		value += 1;
	}
	
	value = value % 1;
	value *= values.length - 1;
	
	let index0 = Math.floor(value);
	let index1 = index0 + 1;
	
	value -= index0;
	
	return [
		lerp(values[index0][0], values[index1][0], value),
		lerp(values[index0][1], values[index1][1], value),
		lerp(values[index0][2], values[index1][2], value),
	];
};

let rainbowValues = [
	[ 1, 0, 0 ],
	[ 1, 1, 0 ],
	[ 0, 1, 0 ],
	[ 0, 1, 1 ],
	[ 0, 0, 1 ],
	[ 1, 0, 1 ],
];

export function rainbow(value) {
	return gradient(rainbowValues, value);
};

let randomVariable = new Random();
randomVariable.useGoldenRatio();

export function random() {
	return rainbow(randomVariable.sample());
};

export default { gradient, rainbow, random };

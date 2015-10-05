export default class RNG {
	constructor(x = 0, a = 1103515245, c = 12345, m = Math.pow(2, 32)) {
		this._x = x;
		this._a = a;
		this._c = c;
		this._m = m;
	}
	
	useGoldenRatio() {
		this._a = 1;
		this._c = 0.618033988749895;
		this._m = 1;
	}
	
	sample() {
		this._x = (this._a * this._x + this._c) % this._m;
		
		return this._x / this._m;
	}
}

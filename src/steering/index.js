import Debug from 'debug';
let debug = Debug('app:agent');

import Emitter from 'emitter';
import Vec3 from 'gl-matrix/vec3';

export default class Steering extends Emitter {
	constructor(track) {
		debug('construct');
		
		super();
		
		if (track) {
			this._position = track.position;
		}
		
		this.speed = 1;
		this.velocity = Vec3.fromValues(1, 0, 0);
		this.position = Vec3.fromValues(0, 0, 0);
	}
	
	update(dt) {
		let force = Vec3.create();
		
		Vec3.set(force, 0, 0, 0);
		this.emit('steer', force);
		
		Vec3.scale(force, force, dt);
		
		Vec3.add(this.velocity, this.velocity, force);
		Vec3.normalize(this.velocity, this.velocity);
		Vec3.scale(this.velocity, this.velocity, this.speed);
		
		Vec3.add(this.position, this.position, Vec3.scale([], this.velocity, dt));
	}
}

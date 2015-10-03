import Behaviour from '../behaviour';

import Vec3 from 'gl-matrix/vec3';

export default class Seek extends Behaviour {
	constructor(agent, { weight, target, radius = 0 }) {
		super(agent, weight);
		
		this.target = target;
		this.radius = radius;
		
		agent.on('steer').then((force) => {
			let delta = seek(agent, this.target, this.radius);
			
			Behaviour.addForce(force, delta, this.weight);
		});
	}
}

export function seek(agent, target, radius) {
	let seek = Vec3.sub([], target.position, agent.position);
	let distance = Vec3.length(seek);
	
	Vec3.normalize(seek, seek);
	Vec3.scale(seek, seek, agent.speed);
	
	if (distance < radius) {
		Vec3.scale(seek, seek, distance / radius);
	}
	
	Vec3.sub(seek, seek, agent.velocity);
	
	Vec3.normalize(seek, seek);
	
	return seek;
}

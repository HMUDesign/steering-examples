import Behaviour from '../behaviour';

import Vec3 from 'gl-matrix/vec3';

export default class Flee extends Behaviour {
	constructor(agent, { weight, target, radius = 0 }) {
		super(agent, weight);
		
		this.target = target;
		this.radius = radius;
		
		agent.on('steer').then((force) => {
			let delta = flee(agent, this.target, this.radius);
			
			Behaviour.addForce(force, delta, this.weight);
		});
	}
}

export function flee(agent, target, radius) {
	let flee = Vec3.sub([], target.position, agent.position);
	let distance = Vec3.length(flee);
	
	Vec3.normalize(flee, flee);
	Vec3.scale(flee, flee, -agent.speed);
	
	if (distance < radius) {
		Vec3.scale(flee, flee, distance / radius);
	}
	
	Vec3.sub(flee, flee, agent.velocity);
	
	Vec3.normalize(flee, flee);
	
	return flee;
}

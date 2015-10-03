import Behaviour from '../behaviour';

import Vec3 from 'gl-matrix/vec3';

export default class Wander extends Behaviour {
	constructor(agent, { weight, radius = .5, distance = 1, volatility = .5 }) {
		super(agent, weight);
		
		this.angle = 0;
		this.radius = radius;
		this.distance = distance;
		this.volatility = volatility;
		
		agent.on('steer').then((force) => {
			this.angle += (Math.random() * 2 - 1) * volatility;
			
			let displacement = Vec3.fromValues(
				Math.cos(this.angle) * this.radius,
				Math.sin(this.angle) * this.radius,
				0
			);
			
			let wander = Vec3.fromValues(...agent.velocity);
			Vec3.scale(wander, wander, this.distance);
			Vec3.add(wander, wander, displacement);
			
			Vec3.normalize(wander, wander);
			
			Behaviour.addForce(force, wander, this.weight);
		});
	}
}

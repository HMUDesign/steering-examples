import Behaviour from '../behaviour';

import Vec3 from 'gl-matrix/vec3';
import { flee } from './flee';

export default class Pursue extends Behaviour {
	constructor(agent, { weight, target, radius = 0 }) {
		super(agent, weight);
		
		this.target = target;
		this.radius = radius;
		
		agent.on('steer').then((force) => {
			let distance = Vec3.length(Vec3.sub([], this.target.position, agent.position));
			let time = distance / agent.speed;
			
			let position = Vec3.scale([], this.target.velocity, time);
			Vec3.add(position, position, this.target.position);
			
			let pursue = flee(agent, { position }, this.radius);
			
			Behaviour.addForce(force, pursue, this.weight);
		});
	}
}

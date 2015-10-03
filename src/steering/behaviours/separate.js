import Behaviour from '../behaviour';

import Vec3 from 'gl-matrix/vec3';

export default class Cohere extends Behaviour {
	constructor(agent, { weight, agents, radius = 0 }) {
		super(agent, weight);
		
		this.agents = agents;
		this.radius = radius;
		
		agent.on('steer').then((force) => {
			let agents = Behaviour.neighborhoodDistance(agent, this.agents, this.radius);
			
			if (!agents.length) {
				return;
			}
			
			let position = agents.reduce((position, agent) => {
				return Vec3.add(position, position, agent.agent.position);
			}, Vec3.create());
			
			Vec3.scale(position, position, 1 / agents.length);
			Vec3.sub(position, position, agent.position);
			Vec3.scale(position, position, -1);
			
			Vec3.normalize(position, position);
			
			Behaviour.addForce(force, position, this.weight);
		});
	}
}

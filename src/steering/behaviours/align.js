import Behaviour from '../behaviour';

import Vec3 from 'gl-matrix/vec3';

export default class Align extends Behaviour {
	constructor(agent, { weight, agents, radius = 0 }) {
		super(agent, weight);
		
		this.agents = agents;
		this.radius = radius;
		
		agent.on('steer').then((force) => {
			let agents = Behaviour.neighborhoodDistance(agent, this.agents, this.radius);
			
			if (!agents.length) {
				return;
			}
			
			let delta = agents.reduce((average, agent) => {
				return Vec3.add(average, average, agent.agent.velocity);
			}, Vec3.create());
			
			Vec3.normalize(delta, delta);
			
			Behaviour.addForce(force, delta, this.weight);
		});
	}
}

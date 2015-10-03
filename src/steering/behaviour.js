import Vec3 from 'gl-matrix/vec3';

export default class Behaviour {
	static addForce(force, delta, weight) {
		Vec3.scale(delta, delta, weight);
		Vec3.add(force, force, delta);
	}
	
	static neighborhoodDistance(source, agents, radius) {
		return agents
			.map((agent) => {
				let delta = Vec3.sub([], source.position, agent.position);
				
				return {
					distance: Vec3.length(delta),
					agent: agent,
				};
			})
			.filter((agent) => {
				return source !== agent.agent && agent.distance < radius;
			})
		;
	}
	
	constructor(agent, weight = 1) {
		this.agent = agent;
		this.weight = weight;
	}
}

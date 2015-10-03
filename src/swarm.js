import Agent from './agent';
import Wander from './steering/behaviours/wander';
import Align from './steering/behaviours/align';
import Cohere from './steering/behaviours/cohere';
import Separate from './steering/behaviours/separate';

export default function() {
	let agents = [];
	let steerings = [];
	
	for (var i = 0; i < 150; i++) {
		let agent = new Agent();
		agents.push(agent);
		
		steerings.push(agent.steering);
		
		agent.steering.speed = Math.random() + 4;
		agent.steering.wander = new Wander(agent.steering, { weight: 20 });
		agent.steering.align = new Align(agent.steering, { weight: 10, agents: steerings, radius: 15 });
		agent.steering.cohere = new Cohere(agent.steering, { weight: 5, agents: steerings, radius: 9 });
		agent.steering.separate = new Separate(agent.steering, { weight: 15, agents: steerings, radius: 3 });
	}
	
	return agents;
}

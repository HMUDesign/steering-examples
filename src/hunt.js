import Agent from './agent';
import Wander from './steering/behaviours/wander';
import Pursue from './steering/behaviours/pursue';
import Evade from './steering/behaviours/evade';

export default function() {
	let agents = [];
	
	let predator = new Agent();
	agents.push(predator);
	
	predator.steering.wander = new Wander(predator.steering, { weight: 25 });
	predator.steering.speed = 5;
	
	let prey = new Agent();
	agents.push(prey);
	
	prey.steering.wander = new Wander(prey.steering, { weight: 25 });
	prey.steering.speed = 5 * 1.5;
	
	predator.steering.pursue = new Pursue(predator.steering, { weight: 5, target: prey.steering, radius: 0 });
	prey.steering.evade      = new  Evade(prey.steering, { weight: 5, target: predator.steering, radius: 0 });
	
	return agents;
}

import Debug from 'debug';
let debug = Debug('app');

import BaseApp from 'hedra/app';
import Resize from 'hedra/plugins/resize';

import { fromDisc, fromCircle } from './lib/random';

import Agent from './agent';
import hunt from './hunt';
import swarm from './swarm';

export default class App extends BaseApp {
	static load() {
		return Promise.all([
			Agent.load(),
		]);
	}
	
	constructor(config) {
		debug('construct');
		
		super(config);
		
		Resize(this, { ratio: 16 / 9 });
		
		this.camera.position.set(0, 0, 150);
		this.camera.lookAt(this.scene.position);
		
		let width;
		let height;
		
		this.on('resize-post').then((event) => {
			width  = 150 * Math.tan(event.fovx / 2 * Math.PI / 180) * 2;
			height = 150 * Math.tan(event.fovy / 2 * Math.PI / 180) * 2;
		});
		
		for (let agent of swarm()) {
			this.add(agent);
			
			agent.steering.position = [ ...fromDisc(50), 0 ];
			agent.steering.velocity = [ ...fromCircle(1), 0 ];
			
			agent.on('update').then(() => {
				while (agent.position.x > width / 2) {
					agent.position.x -= width;
				}
				
				while (agent.position.x < -width / 2) {
					agent.position.x += width;
				}
				
				while (agent.position.y > height / 2) {
					agent.position.y -= height;
				}
				
				while (agent.position.y < -height / 2) {
					agent.position.y += height;
				}
				
				agent.steering.position = agent.position.toArray();
			});
		}
	}
}

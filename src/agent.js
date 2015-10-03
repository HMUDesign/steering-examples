import Debug from 'debug';
let debug = Debug('app:agent');

import Hedra from 'hedra';
import THREE from 'three';
import Steering from './steering';

let geometry;
let material;

export default class Agent extends Hedra {
	static load() {
		return new Promise((resolve) => {
			var vertices = [
				 0,  0, -1,
				 1,  1,  1,
				-1,  1,  1,
				-1, -1,  1,
				 1, -1,  1,
			];
			
			var faces = [
				2, 1, 0,
				3, 2, 0,
				4, 3, 0,
				1, 4, 0,
				
				1, 2, 3,
				3, 4, 1,
			];
			
			geometry = new THREE.PolyhedronGeometry(vertices, faces, 1);
			
			material = new THREE.MeshNormalMaterial();
			
			resolve();
		});
	}
	
	constructor(config) {
		debug('construct');
		
		config = config || {};
		config.geometry = geometry;
		config.material = material;
		
		super(config);
		
		this.steering = new Steering(this);
		
		this.on('update').then((dt, t) => {
			this.steering.update(dt);
			
			this.position.set(...this.steering.position);
			
			this.quaternion.setFromRotationMatrix(
				new THREE.Matrix4().lookAt(new THREE.Vector3(), new THREE.Vector3(...this.steering.velocity), new THREE.Vector3(0, 0, 1))
			);
		});
	}
}


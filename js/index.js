import { PointerLockControls } from './pointerLocksControls.js';
import { createRoom } from './createRoom.js';

let camera, scene, renderer, controls, moveForward, moveBackward, moveLeft, moveRight, canJump;

moveForward = moveBackward = moveLeft = moveRight = canJump = false;

let cameraHeight = 50;
let prevTime = performance.now();

let velocity = new THREE.Vector3();
let direction = new THREE.Vector3();
			

init();

animate();



function init () {

	camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 1, 1000);
	camera.position.set(0, cameraHeight, 50)

	scene = new THREE.Scene();
	scene.background = new THREE.Color(0x000000);

	controls = new PointerLockControls(camera, document.body);

	document.body.addEventListener('click', () => {
		controls.lock();
	});


	scene.add(controls.getObject());

	function onKeyDown (event) {
		switch (event.code) {
			case 'ArrowUp': case 'KeyW': moveForward = true; break;
			case 'ArrowLeft': case 'KeyA': moveLeft = true; break;
			case 'ArrowDown': case 'KeyS': moveBackward = true; break;
			case 'ArrowRight': case 'KeyD': moveRight = true; break;
			case 'Space': if (canJump === true) velocity.y += 250; canJump = false; break;
		}
	};

	function onKeyUp (event) {
		switch (event.code) {
			case 'ArrowUp': case 'KeyW': moveForward = false; break;
			case 'ArrowLeft': case 'KeyA': moveLeft = false; break;
			case 'ArrowDown': case 'KeyS': moveBackward = false; break;
			case 'ArrowRight': case 'KeyD': moveRight = false; break;
		}
	};

	document.addEventListener('keydown', onKeyDown);
	document.addEventListener('keyup', onKeyUp);


	createRoom(scene);


	renderer = new THREE.WebGLRenderer({antialias: true});
	renderer.setPixelRatio(window.devicePixelRatio);
	renderer.setSize(window.innerWidth, window.innerHeight);
	document.body.appendChild(renderer.domElement);

	window.addEventListener('resize', () => {
		camera.aspect = window.innerWidth / window.innerHeight;
		camera.updateProjectionMatrix();
		renderer.setSize(window.innerWidth, window.innerHeight);
	});

}



function animate() {

	requestAnimationFrame(animate);

	let time = performance.now();
	
	if (controls.isLocked === true) {

		let delta = (time - prevTime) / 1000;

		velocity.x -= velocity.x * 10.0 * delta;
		velocity.z -= velocity.z * 10.0 * delta;

		velocity.y -= 9.8 * 100.0 * delta; // 100.0 = mass

		direction.z = Number(moveForward) - Number(moveBackward);
		direction.x = Number(moveRight) - Number(moveLeft);
		direction.normalize(); // this ensures consistent movements in all directions

		if (moveForward || moveBackward) velocity.z -= direction.z * 750.0 * delta;
		if (moveLeft || moveRight) velocity.x -= direction.x * 750.0 * delta;

		controls.moveRight(-velocity.x * delta);
		controls.moveForward(-velocity.z * delta);
		controls.getObject().position.y += (velocity.y * delta);

		if (controls.getObject().position.y < cameraHeight) {
			velocity.y = 0;
			controls.getObject().position.y = cameraHeight;
			canJump = true;
		}

		if (camera.position.z > 140) camera.position.z = 139.9;
		if (camera.position.z < -140) camera.position.z = -139.9;
		if (camera.position.x > 140) camera.position.x = 139.9;
		if (camera.position.x < -140) camera.position.x = -139.9;

	}

	prevTime = time;

	renderer.render(scene, camera);

}
function createRoom (scene) {

  let imgLoader = new THREE.TextureLoader();
	


	let floor = new THREE.Mesh(
		new THREE.PlaneGeometry(300, 300),
		new THREE.MeshBasicMaterial({map: imgLoader.load('floor-texture.jpg')})
	);
	floor.rotateX(-Math.PI / 2);
	scene.add(floor);

	let ceiling = new THREE.Mesh(
		new THREE.PlaneGeometry(300, 300),
		new THREE.MeshBasicMaterial({color: 0xfafafa})
	);
	ceiling.rotateX(Math.PI / 2);
	ceiling.position.set(0, 100, 0);
	scene.add(ceiling);
	


  let wallGeometry = new THREE.PlaneGeometry(300, 100);
  let wallMaterial = new THREE.MeshBasicMaterial({map: imgLoader.load('wall-texture.jpg')});

	let backWall = new THREE.Mesh(wallGeometry, wallMaterial);
	backWall.position.set(0, 50, 150);
	backWall.rotateY(Math.PI);
	scene.add(backWall);

	let frontWall = new THREE.Mesh(wallGeometry, wallMaterial);
	frontWall.position.set(0, 50, -150);
	scene.add(frontWall);


	let rightWall = new THREE.Mesh(wallGeometry, wallMaterial);
	rightWall.rotateY(-Math.PI / 2);
	rightWall.position.set(150, 50, 0);
	scene.add(rightWall);

	let leftWall = new THREE.Mesh(wallGeometry, wallMaterial);
	leftWall.rotateY(Math.PI / 2);
	leftWall.position.set(-150, 50, 0);
	scene.add(leftWall);
}

export {createRoom};
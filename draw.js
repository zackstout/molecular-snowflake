
var THREE = require('three');
var OrbitControls = require('three-orbit-controls')(THREE);

// function Oxygen(pos) {
//   this.pos = pos;
// }

var size = 40;
// -Global variables-
var pos = new THREE.Vector3();
// pos.z = -size/2;
// pos.x = -size;
var color = new THREE.Color("rgb(100, 50, 30)");
// var color2 = new THREE.Color("rgb(0, 0, 255)");
var color2 = new THREE.Color("rgb(255, 0, 0)");
var geometry, cube;
var material = new THREE.MeshLambertMaterial( { color: color } );

var material2 = new THREE.MeshLambertMaterial( { color: color2 } );

var scene = new THREE.Scene();
scene.background = new THREE.Color( 0xB0E0E6 );
var camera = new THREE.PerspectiveCamera( 75, window.innerWidth/window.innerHeight, 0.1, 1000 );
var renderer = new THREE.WebGLRenderer({ alpha: true });
renderer.setSize( window.innerWidth, window.innerHeight );
document.body.appendChild( renderer.domElement );

camera.position.y = 10;
camera.position.x = 5;

geometry = new THREE.BoxGeometry(1, 2, 1);

cube = new THREE.Mesh( geometry, material );

cube.position.copy( pos );
cube.receiveShadow = true;
cube.castShadow = true;

scene.add(cube);

for (var i=0; i < 6; i++) {
  geometry = new THREE.SphereGeometry(2);
  sphere = new THREE.Mesh(geometry, material2);
  // sphere.position.copy( pos );
  sphere.position.x = 6*Math.cos(i*Math.PI/3);
  sphere.position.y = 6*Math.sin(i*Math.PI/3);

  sphere.receiveShadow = true;
  sphere.castShadow = true;

  scene.add(sphere);
}

var controls = new OrbitControls( camera );
controls.target.set( 0, 2, 0 );
controls.update();

var light = new THREE.PointLight(0xffffff);
light.position.set(5,10,5);
scene.add(light);

function animate() {
  requestAnimationFrame( animate );
  renderer.render( scene, camera );
}

animate();

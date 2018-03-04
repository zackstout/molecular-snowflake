
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
var color = new THREE.Color("rgb(0, 0, 255)");
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

// camera.position.y = 10;
camera.position.x = 12;

geometry = new THREE.BoxGeometry(1, 2, 1);

cube = new THREE.Mesh( geometry, material );

cube.position.copy( pos );
cube.receiveShadow = true;
cube.castShadow = true;

// scene.add(cube);

for (var i=0; i < 6; i++) {
  geometry = new THREE.SphereGeometry(2);
  sphere = new THREE.Mesh(geometry, material2);
  pos.x = 0;
  pos.z = 6*Math.cos(i*Math.PI/3);
  pos.y = 6*Math.sin(i*Math.PI/3);
  sphere.position.copy( pos );
  sphere.receiveShadow = true;
  sphere.castShadow = true;
  scene.add(sphere);

  geometry = new THREE.SphereGeometry(1);
  var hydrogen1 = new THREE.Mesh(geometry, material);
  var hydrogen2 = new THREE.Mesh(geometry, material);
  hydrogen1.receiveShadow = true;
  hydrogen1.castShadow = true;
  hydrogen2.receiveShadow = true;
  hydrogen2.castShadow = true;
  if (i%2) {
    pos.x = 0;
    pos.z = sphere.position.z - 2 * Math.cos(104.5 * Math.PI/360);
    pos.y = sphere.position.y + 2 * Math.sin(104.5 * Math.PI/360);
    hydrogen1.position.copy( pos );

    pos.z = sphere.position.z - 2 * Math.cos(104.5 * Math.PI/360);
    pos.y = sphere.position.y - 2 * Math.sin(104.5 * Math.PI/360);
    hydrogen2.position.copy( pos );
  } else {
    // pos.x = 0;
    pos.y = sphere.position.y;
    pos.z = sphere.position.z - 2 * Math.cos(104.5 * Math.PI/360);
    pos.x = 2 * Math.sin(104.5 * Math.PI/360);
    hydrogen1.position.copy( pos );

    pos.z = sphere.position.z - 2 * Math.cos(104.5 * Math.PI/360);
    pos.x = - 2 * Math.sin(104.5 * Math.PI/360);
    hydrogen2.position.copy( pos );
  }
  scene.add(hydrogen1);
  scene.add(hydrogen2);
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

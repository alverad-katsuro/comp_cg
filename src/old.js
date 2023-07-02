import * as THREE from 'three'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'

var loader = new THREE.TextureLoader();
// Instanciar cena
const scene = new THREE.Scene();
// Instanciar câmera
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
// Instanciar renderizador
const renderer = new THREE.WebGLRenderer({ antialias: true });
//renderer.setClearColor(0xB0C4DE, 10)
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

const modelLoader = new GLTFLoader();
const textureLoader = new THREE.TextureLoader();
const controlador = new OrbitControls(camera, renderer.domElement);

const light = new THREE.PointLight(0xffffff, 1.3)
light.castShadow = true
// const helper = new THREE.PointLightHelper(light)

light.position.y = -60

const ambient = new THREE.AmbientLight(0x888888)
scene.add(ambient)

camera.position.z = 0;
camera.position.y = 20;
camera.position.x = 20;

let citie;
modelLoader.load('sports_car_racing_moscow/scene.gltf', gltf => {
  citie = gltf.scene
  scene.add(citie)
  citie.traverse((o) => {
    if (o.isMesh) {
      const texture = o.material.map
      o.material = new THREE.MeshPhongMaterial({ map: texture })
      o.castShadow = true
      o.receiveShadow = true
    }
  })
  citie.scale.set(40, 40, 40)
  citie.position.y = 0
  citie.position.z = 0
}, undefined, error => {
  console.error(error)
})


let carro;
modelLoader.load('hcr_race_car/scene.gltf', gltf => {
  carro = gltf.scene
  scene.add(carro)
  carro.traverse((o) => {
    if (o.isMesh) {
      const texture = o.material.map
      o.material = new THREE.MeshPhongMaterial({ map: texture })
      o.castShadow = true
      o.receiveShadow = true
    }
  })
  carro.scale.set(1, 1, 1)
  carro.position.y = 0
  carro.position.z = 0
}, undefined, error => {
  console.error(error)
})


// CUBO
function CriarCubo(cor, largura, altura, profundidade) { // (cor, x, y, z)
  let geometria = new THREE.BoxGeometry(largura, altura, profundidade);
  let material = new THREE.MeshBasicMaterial({ map: loader.load("https://upload.wikimedia.org/wikipedia/commons/a/af/Bananas_%28Alabama_Extension%29.jpg") });
  material.flatShading = true;
  const cubo = new THREE.Mesh(geometria, material);
  scene.add(cubo);
  cubo.position.x = 0;
  return cubo;
}

// Cilindro
function CriarCilindro(cor, raioCima, raioBaixo, altura) {
  var geometria = new THREE.CylinderGeometry(raioCima, raioBaixo, altura, 20);
  var material = new THREE.MeshBasicMaterial({ map: loader.load("https://upload.wikimedia.org/wikipedia/commons/a/af/Bananas_%28Alabama_Extension%29.jpg") })
  const cilindro = new THREE.Mesh(geometria, material); scene.add(cilindro);
  cilindro.position.x = 3;
  return cilindro;
}

//Esfera
function CriarEsfera(cor, raio, qtdSegLargura, qtdSegAltura) {
  var geometria = new THREE.SphereGeometry(raio, qtdSegAltura, qtdSegAltura)
  var material = new THREE.MeshBasicMaterial({ map: loader.load("https://media0.giphy.com/media/RjFaYc5ARSRtjVcMaa/giphy.gif") })
  const esfera = new THREE.Mesh(geometria, material); scene.add(esfera);
  esfera.position.x = 7;
  return esfera;
}



let cilindro = CriarCilindro(new THREE.Color(0x1E90FF), 1, 1, 2); // (cor, raioCima, raioBaixo, altura)

cilindro.position.z = 4;

let cubo = CriarCubo(new THREE.Color(0xff0000), 1, 1, 1);

let esfera = CriarEsfera(new THREE.Color(0xffab15), 1, 20, 20);


esfera.position.x = 0;
esfera.position.z = 0;
esfera.position.y = 0;


function animate() {
  requestAnimationFrame(animate);
  renderer.render(scene, camera);
  cubo.rotation.z += 0.005;
  cilindro.rotation.x += 0.005;
  esfera.rotation.x += 0.02;
  //esfera.translateX(0.05);
  //esfera.translateY(0.08);
  esfera.translateY(0.5);
}
animate();
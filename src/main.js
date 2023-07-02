import * as THREE from 'three';

import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';

const scene = new THREE.Scene();

const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
const cameraDistance = 10; // Distância entre a câmera e o carro
const cameraHeight = 5; // Altura da câmera em relação ao carro
camera.position.set(20, 20, 0);

const renderer = new THREE.WebGLRenderer({ antialiasing: true });

renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);
renderer.shadowMap.enabled = true;
renderer.physicallyCorrectLights = true;
renderer.setClearColor(0xFEFEFE);

const modelLoader = new GLTFLoader();
const textureLoader = new THREE.TextureLoader();

const controlador = new OrbitControls(camera, renderer.domElement);

const ambient = new THREE.AmbientLight(0xFFFFFF)
scene.add(ambient)

const skyboxG = new THREE.SphereGeometry(1000, 32, 16);
const skyboxT = textureLoader.load('/textures/sky-seamless-texture-5892.jpg')
skyboxT.wrapS = skyboxT.wrapT = THREE.RepeatWrapping
skyboxT.repeat = new THREE.Vector2(5, 5)
const skyboxM = new THREE.MeshBasicMaterial({ map: skyboxT, side: THREE.BackSide })
const skybox = new THREE.Mesh(skyboxG, skyboxM)
scene.add(skybox)

// create an AudioListener and add it to the camera
const listener = new THREE.AudioListener();
camera.add(listener);

// create a global audio source
const sound = new THREE.Audio(listener);

// load a sound and set it as the Audio object's buffer
const audioLoader = new THREE.AudioLoader();
audioLoader.load('/sounds/02_Escape_from_the_City.mp3',
  function (buffer) {
    sound.setBuffer(buffer);
    sound.setLoop(true);
    sound.setVolume(0.5);
    sound.play();

  },

  function (xhr) {
    console.log((xhr.loaded / xhr.total * 100) + '% loaded');
  },

  // onError callback
  function (err) {
    console.log('Un error ha ocurrido');
  }
);

let city;
modelLoader.load('/sports_car_racing_moscow/scene.gltf', gltf => {
  city = gltf.scene
  scene.add(city)
  city.traverse((o) => {
    if (o.isMesh) {
      const texture = o.material.map
      o.material = new THREE.MeshPhongMaterial({ map: texture })
      o.castShadow = true
      o.receiveShadow = true
    }
  })
  city.scale.set(40, 40, 40)
  city.position.set(0, 0, 0)
}, undefined, error => {
  console.error(error)
})

const lightIntensity = 1000;
const lightDistance = 100;

const group = new THREE.Group();
const lightCentro = new THREE.PointLight(0xffff00, lightIntensity, lightDistance);
lightCentro.castShadow = true
lightCentro.position.set(-5, 23, -25);
group.add(lightCentro);
scene.add(group)
group.position.set(-7, 23, -25)

let torre_centro;
modelLoader.load('/lighthouse/scene.gltf', gltf => {
  torre_centro = gltf.scene
  scene.add(torre_centro)
  torre_centro.traverse((o) => {
    if (o.isMesh) {
      const texture = o.material.map
      o.material = new THREE.MeshPhongMaterial({ map: texture })
      o.castShadow = true
      o.receiveShadow = true
    }
  })
  torre_centro.scale.set(0.5, 0.5, 0.5)
  torre_centro.position.set(-7, 0, -25)
}, undefined, error => {
  console.error(error)
})

const group2 = new THREE.Group();
const lightDireita = new THREE.PointLight(0xffff00, lightIntensity, lightDistance);
lightDireita.castShadow = true
lightDireita.position.set(-5, 23, -25);
group2.add(lightDireita);
scene.add(group2)
group2.position.set(218.5, 23, 157.2)

let torre_direita;
modelLoader.load('/lighthouse/scene.gltf', gltf => {
  torre_direita = gltf.scene
  scene.add(torre_direita)
  torre_direita.traverse((o) => {
    if (o.isMesh) {
      const texture = o.material.map
      o.material = new THREE.MeshPhongMaterial({ map: texture })
      o.castShadow = true
      o.receiveShadow = true
    }
  })
  torre_direita.scale.set(0.5, 0.5, 0.5)
  torre_direita.position.set(218.5, 0, 157.2)
},
  undefined, error => {
    console.error(error)
  })

const group3 = new THREE.Group();
const lightEsquerda = new THREE.PointLight(0xffff00, lightIntensity, lightDistance);
lightEsquerda.castShadow = true
lightEsquerda.position.set(-5, 23, -25);
group3.add(lightEsquerda);
scene.add(group3)
group3.position.set(-135, 23, 42)

let torre_esquerda;
modelLoader.load('/lighthouse/scene.gltf', gltf => {
  torre_esquerda = gltf.scene
  scene.add(torre_esquerda)
  torre_esquerda.traverse((o) => {
    if (o.isMesh) {
      const texture = o.material.map
      o.material = new THREE.MeshPhongMaterial({ map: texture })
      o.castShadow = true
      o.receiveShadow = true
    }
  })
  torre_esquerda.scale.set(0.5, 0.5, 0.5)
  torre_esquerda.position.set(-135, 0, 42)
}, undefined, error => {
  console.error(error)
})

const group4 = new THREE.Group();
const lightCima = new THREE.PointLight(0xffff00, lightIntensity, lightDistance);
lightCima.castShadow = true
lightCima.position.set(-5, 23, -25);
group4.add(lightCima);
scene.add(group4)
group4.position.set(-145, 23, -145)

let torre_cima;
modelLoader.load('/lighthouse/scene.gltf', gltf => {
  torre_cima = gltf.scene
  scene.add(torre_cima)
  torre_cima.traverse((o) => {
    if (o.isMesh) {
      const texture = o.material.map
      o.material = new THREE.MeshPhongMaterial({ map: texture })
      o.castShadow = true
      o.receiveShadow = true
    }
  })
  torre_cima.scale.set(0.5, 0.5, 0.5)
  torre_cima.position.set(-145, 0, -145)

}, undefined, error => {
  console.error(error)
})

const group5 = new THREE.Group();
const lightBaixo = new THREE.PointLight(0xffff00, lightIntensity, lightDistance);
lightBaixo.castShadow = true
lightBaixo.position.set(-5, 23, -25);
group5.add(lightBaixo);
scene.add(group5)
group5.position.set(-23, 23, 52)

let torre_baixo;
modelLoader.load('/lighthouse/scene.gltf', gltf => {
  torre_baixo = gltf.scene
  scene.add(torre_baixo)
  torre_baixo.traverse((o) => {
    if (o.isMesh) {
      const texture = o.material.map
      o.material = new THREE.MeshPhongMaterial({ map: texture })
      o.castShadow = true
      o.receiveShadow = true
    }
  })
  torre_baixo.scale.set(0.5, 0.5, 0.5)
  torre_baixo.position.set(-23, 0, 52)

}, undefined, error => {
  console.error(error)
})


let bomb1;
modelLoader.load('/shear_heart_attack/scene.gltf', gltf => {
  bomb1 = gltf.scene
  scene.add(bomb1)
  bomb1.traverse((o) => {
    if (o.isMesh) {
      const texture = o.material.map
      o.material = new THREE.MeshPhongMaterial({ map: texture })
      o.castShadow = true
      o.receiveShadow = true
    }
  })
  bomb1.scale.set(0.005, 0.005, 0.005)
  bomb1.position.set(240, 0, 157.2)

}, undefined, error => {
  console.error(error)
})

let bomb2;
modelLoader.load('/shear_heart_attack/scene.gltf', gltf => {
  bomb2 = gltf.scene
  scene.add(bomb2)
  bomb2.traverse((o) => {
    if (o.isMesh) {
      const texture = o.material.map
      o.material = new THREE.MeshPhongMaterial({ map: texture })
      o.castShadow = true
      o.receiveShadow = true
    }
  })
  bomb2.scale.set(0.005, 0.005, 0.005)
  bomb2.position.set(-115, 23, 42)

}, undefined, error => {
  console.error(error)
})

let bomb3;
modelLoader.load('/shear_heart_attack/scene.gltf', gltf => {
  bomb3 = gltf.scene
  scene.add(bomb3)
  bomb3.traverse((o) => {
    if (o.isMesh) {
      const texture = o.material.map
      o.material = new THREE.MeshPhongMaterial({ map: texture })
      o.castShadow = true
      o.receiveShadow = true
    }
  })
  bomb3.scale.set(0.005, 0.005, 0.005)
  bomb3.position.set(-115, 0, -145)

}, undefined, error => {
  console.error(error)
})

let carro;
modelLoader.load('/hcr_race_car/scene.gltf', gltf => {
  carro = gltf.scene
  scene.add(carro)
  carro.traverse((o) => {
    if (o.isMesh) {
      const texture = o.material.map
      o.material = new THREE.MeshStandardMaterial({ map: texture })
      o.castShadow = true
      o.receiveShadow = true
    }
  })
  carro.scale.set(1, 1, 1)
  carro.position.y = 0
  carro.position.z = 0
  carro.scale.z = -1;
}, undefined, error => {
  console.error(error)
})

// CUBO
function CriarCubo(cor, largura, altura, profundidade) { // (cor, x, y, z)
  let geometria = new THREE.BoxGeometry(largura, altura, profundidade);
  let material = new THREE.MeshBasicMaterial({ map: textureLoader.load("https://upload.wikimedia.org/wikipedia/commons/a/af/Bananas_%28Alabama_Extension%29.jpg") });
  material.flatShading = true;
  const cubo = new THREE.Mesh(geometria, material);
  scene.add(cubo);
  cubo.position.x = 0;
  return cubo;
}

// Cilindro
function CriarCilindro(cor, raioCima, raioBaixo, altura) {
  var geometria = new THREE.CylinderGeometry(raioCima, raioBaixo, altura, 20);
  var material = new THREE.MeshBasicMaterial({ map: textureLoader.load("https://upload.wikimedia.org/wikipedia/commons/a/af/Bananas_%28Alabama_Extension%29.jpg") })
  const cilindro = new THREE.Mesh(geometria, material); scene.add(cilindro);
  cilindro.position.x = 3;
  return cilindro;
}

//Esfera
function CriarEsfera(cor, raio, qtdSegLargura, qtdSegAltura) {
  var geometria = new THREE.SphereGeometry(raio, qtdSegAltura, qtdSegAltura)
  var material = new THREE.MeshBasicMaterial({ map: textureLoader.load("https://media0.giphy.com/media/RjFaYc5ARSRtjVcMaa/giphy.gif") })
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

const keyboard = {};
const maxSpeed = 4;
const acceleration = 0.4;
const deceleration = 0.01;
const resistance = 0.1;
const turnSpeed = 0.1;

let carSpeed = 0;
let carDirection = 0;
let turningLeft = false;
let turningRight = false;
let toggleCam = true;
function keyDown(event) {
  keyboard[event.code] = true;

  if (event.code === 'KeyA') {
    turningLeft = true;
  } else if (event.code === 'KeyD') {
    turningRight = true;
  } else if (event.code === 'KeyT') {
    toggleCam = !toggleCam;
  }
}

function keyUp(event) {
  keyboard[event.code] = false;

  if (event.code === 'KeyA') {
    turningLeft = false;
    carDirection = 0;
  } else if (event.code === 'KeyD') {
    turningRight = false;
    carDirection = 0;
  }
}

document.addEventListener('keydown', keyDown);
document.addEventListener('keyup', keyUp);

// Create a text geometry
var textGeometry = new THREE.TextGeometry("Hello, Three.js!", {
  font: "helvetiker", // Font type (must be loaded separately)
  size: 0.5, // Text size
  height: 0.2, // Extrusion depth
  curveSegments: 12, // Number of curved segments
  bevelEnabled: true, // Enable bevel
  bevelThickness: 0.03, // Bevel thickness
  bevelSize: 0.02, // Bevel size
  bevelSegments: 5, // Number of bevel segments
});

// Create a material for the text
var material = new THREE.MeshBasicMaterial({ color: 0xff0000 });

// Create a text mesh
var textMesh = new THREE.Mesh(textGeometry, material);
scene.add(textMesh);

function handleCarMovement() {
  const speed = carSpeed;

  if (keyboard['ArrowLeft']) {
    camera.position.applyAxisAngle(new THREE.Vector3(0, 1, 0), turnSpeed);
    camera.lookAt(carro.position);
  } else if (keyboard['ArrowRight']) {
    camera.position.applyAxisAngle(new THREE.Vector3(0, 1, 0), -turnSpeed);
    camera.lookAt(carro.position);
  } else if (keyboard['KeyW']) {
    if (carSpeed < maxSpeed) {
      carSpeed += acceleration;
    }
  } else if (keyboard['KeyS']) {
    carSpeed -= acceleration; // Diminuir a velocidade quando a tecla 'KeyS' for pressionada
  } else if (!turningLeft && !turningRight) {
    if (carSpeed > 0) {
      carSpeed -= resistance;
      if (carSpeed < 0) {
        carSpeed = 0;
      }
    } else if (carSpeed < 0) {
      carSpeed += resistance;
      if (carSpeed > 0) {
        carSpeed = 0;
      }
    }
    carDirection = 0; // Parar a rotação quando as teclas forem liberadas
  }

  if (keyboard['KeyA']) {
    turningLeft = true;
    carDirection += turnSpeed;
  } else if (keyboard['KeyD']) {
    turningRight = true;
    carDirection -= turnSpeed;
  }

  const angle = carro.rotation.y + carDirection;
  const xSpeed = Math.sin(angle) * speed;
  const zSpeed = Math.cos(angle) * speed;

  carro.rotation.y += carDirection;
  carro.position.x -= xSpeed;
  carro.position.z -= zSpeed;

  // Limitar a velocidade mínima a zero
  if (carSpeed < 0) {
    carSpeed = 0;
  }
}
const light_rotation_speed = 0.2
const twopi = Math.PI * 2
function animate() {
  requestAnimationFrame(animate);
  renderer.render(scene, camera);

  group.rotation.y += (group.rotation.y >= twopi) ? -twopi : light_rotation_speed; // Adjust the rotation speed as needed
  group2.rotation.y += (group2.rotation.y >= twopi) ? -twopi : light_rotation_speed; // Adjust the rotation speed as needed
  group3.rotation.y += (group3.rotation.y >= twopi) ? -twopi : light_rotation_speed; // Adjust the rotation speed as needed
  group4.rotation.y += (group4.rotation.y >= twopi) ? -twopi : light_rotation_speed; // Adjust the rotation speed as needed
  group5.rotation.y += (group5.rotation.y >= twopi) ? -twopi : light_rotation_speed; // Adjust the rotation speed as needed

  handleCarMovement();

  if (toggleCam) {
    // Atualizar a posição da câmera

    lightCentro.rotation.y += 0.1
    const cameraOffset = new THREE.Vector3(0, cameraHeight, +cameraDistance);
    const carPosition = carro.position.clone();
    const cameraPosition = carPosition.add(cameraOffset);
    camera.position.copy(cameraPosition);
    camera.lookAt(carro.position);
  } else {
    controlador.update(); // Atualiza o controle da câmera OrbitControls
  }
}
animate();
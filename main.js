import './style.css'

import * as THREE from "three"
import {OrbitControls} from "three/examples/jsm/controls/OrbitControls.js"
import { TextureLoader } from 'three'

const scene = new THREE.Scene()
const camera = new THREE.PerspectiveCamera(75, window.innerWidth/window.innerHeight,1,1000)

const renderer = new THREE.WebGLRenderer()


renderer.setPixelRatio = window.devicePixelRatio;
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

//OrbitControles ================================================================
const controles =new OrbitControls( camera, renderer.domElement );

controles.maxDistance=5
camera.position.z=5

const textureImg=[
  'circle_01.png',
  'circle_02.png',
  'circle_03.png',
  'circle_04.png',
  'circle_05.png',
  'dirt_01.png',
  'dirt_02.png',
  'dirt_03.png',
  'fire_01.png',
  'fire_02.png',
  'flame_01.png',
  'flame_02.png',
  'flame_03.png',
  'flame_04.png',
  'flame_05.png',
  'flame_06.png',
  
]

//Load Texture
const textureLoader = new THREE.TextureLoader()
const texture = textureLoader.load("./textures/"+textureImg[9])
//Create Geometry
const geometry = new THREE.BufferGeometry()

const count=5000
const positions= new Float32Array(count*3)

for(let i=0;i<count*3;i++){
  positions[i]=(Math.random()-0.5)*10
}

geometry.setAttribute('position',new THREE.BufferAttribute(positions,3))
const material = new THREE.PointsMaterial()

material.size=0.2
material.sizeAttenuation=true
material.transparent=true
material.color= new THREE.Color('#FF5A00')
material.alphaMap=texture
material.depthWrite=false


const particle =  new THREE.Points(geometry,material)
scene.add(particle)





// For Resizing the Window
function onWindowResize(){

  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();

  renderer.setSize( window.innerWidth, window.innerHeight );

}

const clock = new THREE.Clock()
function animate() {
  const elapsedTime= clock.getElapsedTime()
  requestAnimationFrame(animate);
  // particle.rotation.y=elapsedTime*0.2
  particle.rotation.x=elapsedTime*0.2
  onWindowResize()
  renderer.render(scene, camera);
}

animate()
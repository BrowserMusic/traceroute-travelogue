<template>
  <div class="fine-dining">
    <div class="the-whole-plate"></div>
    <NutritionInfo :selected="selected" />
  </div>
</template>

<script>
import * as THREE from "three";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
import NutritionInfo from "./NutritionInfo.vue";
const mouse = new THREE.Vector2();
let sceneObjs = [];
let INTERSECTED;
let parentElem;

export default {
  name: "FineDining",
  components: { NutritionInfo },
  data() {
    return {
      selected: "",
    };
  },
  mounted() {
    parentElem = document.querySelector(".the-whole-plate");
    const width = parentElem.clientWidth;
    const height = parentElem.clientHeight;
    const objs = this.$store.getters["dining/getRandomFoods"];
    const scene = new THREE.Scene();
    const raycaster = new THREE.Raycaster();
    const camera = new THREE.PerspectiveCamera(75, width / height, 0.1, 1000);

    camera.position.set(0.25, 0.75, 1);

    const renderer = new THREE.WebGLRenderer();
    renderer.setSize(width, height);
    renderer.setClearColor("#e5e5e5");
    parentElem.appendChild(renderer.domElement);

    const axesHelper = new THREE.AxesHelper(5);
    const gridHelper = new THREE.GridHelper(10, 10);
    scene.add(axesHelper, gridHelper);

    const loader = new GLTFLoader();

    for (let o of objs) {
      load3DObject(`/gltf/food/${o.name}`, o, loader, scene);
    }

    const led = this.$store.getters["dining/getRandomParts"];
    load3DObject(`/gltf/parts/${led.name}`, led, loader, scene);

    const plate = this.$store.getters["dining/getRandomPlate"];
    load3DObject(`/gltf/plates/${plate.name}`, plate, loader, scene);

    const tools = this.$store.getters["dining/getRandomTools"];
    for (let o of tools) {
      load3DObject(`/gltf/tools/${o.name}`, o, loader, scene);
    }

    makePointLight(scene, [2.5, 2.5, 1]);
    makePointLight(scene, [-2.5, -2.5, -1]);
    // makeSpotlight(scene, [2.5, 2.5, 1]);
    // makeSpotlight(scene, [-2.5, -2.5, -1]);

    const controls = new OrbitControls(camera, renderer.domElement);
    controls.update();
    controls.autoRotate = true;

    function animate() {
      requestAnimationFrame(animate);
      controls.update();

      raycaster.setFromCamera(mouse, camera);
      const intersects = raycaster.intersectObjects(sceneObjs, true);

      if (intersects.length > 0) {
        if (INTERSECTED != intersects[0].object) {
          if (INTERSECTED) {
            unhighlightObject(INTERSECTED);
          }

          INTERSECTED = intersects[0].object;

          highlightObject(INTERSECTED);
        }
      } else {
        if (INTERSECTED) unhighlightObject(INTERSECTED);
        INTERSECTED = null;
      }

      renderer.render(scene, camera);
    }
    animate();

    parentElem.addEventListener("mousemove", onMouseMove, false);
    parentElem.addEventListener("click", this.onMouseDown, false);
  },
  beforeDestroy() {
    parentElem.removeEventListener("mousemove", onMouseMove);
  },
  methods: {
    onMouseDown() {
      if (INTERSECTED == null) return;
      this.selected = findGrandParent(INTERSECTED).name;
    },
  },
};

function highlightObject(obj) {
  if (obj.parent && obj.parent != null) {
    for (let c of obj.parent.children) {
      if (c.material != undefined && c.material.emissive == undefined) {
        return;
      } else if (c.material != undefined) {
        c.currentHex = c.material.emissive.getHex();
        c.material.emissive.setHex(0xff0000);
      }
    }
  } else {
    obj.currentHex = obj.material.emissive.getHex();
    obj.material.emissive.setHex(0xff0000);
  }
}

function unhighlightObject(obj) {
  if (obj.parent && obj.parent != null) {
    for (let c of obj.parent.children) {
      if (c.material != undefined && c.material.emissive != undefined) {
        c.material.emissive.setHex(c.currentHex);
      }
    }
  } else {
    obj.material.emissive.setHex(obj.currentHex);
  }
}

function onMouseMove(event) {
  const offset = parentElem.getBoundingClientRect();
  mouse.x = ((event.clientX - offset.x) / parentElem.clientWidth) * 2 - 1;
  mouse.y = -((event.clientY - offset.y) / parentElem.clientHeight) * 2 + 1;
}

function findGrandParent(obj) {
  if (!("parent" in obj) || obj.parent == null || obj.parent.type == "Scene") {
    return obj;
  } else {
    return findGrandParent(obj.parent);
  }
}

// eslint-disable-next-line no-unused-vars
function makeSpotlight(scene, pos) {
  const spotLight = new THREE.SpotLight(0xffffff);
  spotLight.position.set(pos);

  // spotLight.castShadow = true;
  spotLight.castShadow = true;
  spotLight.angle = 0.3;
  spotLight.penumbra = 0.2;
  spotLight.decay = 2;
  spotLight.distance = 50;

  // spotLight.shadow.mapSize.width = 1024;
  // spotLight.shadow.mapSize.height = 1024;

  // spotLight.shadow.camera.near = 500;
  // spotLight.shadow.camera.far = 4000;
  // spotLight.shadow.camera.fov = 30;
  scene.add(spotLight);

  const spotLightHelper = new THREE.SpotLightHelper(spotLight);
  scene.add(spotLightHelper);
}

function makePointLight(scene, pos) {
  const light2 = new THREE.PointLight(0xffffff, 5, 100);
  light2.position.set(pos[0], pos[1], pos[2]);
  scene.add(light2);
  const pointLightHelper2 = new THREE.PointLightHelper(light2, 1);
  scene.add(pointLightHelper2);
}

function load3DObject(loc, data, loader, scene) {
  loader.load(
    loc,
    function (gltf) {
      let mesh = gltf.scene.children[0];
      mesh.scale.set(data.scale, data.scale, data.scale);

      if ("position" in data || "rotation" in data) {
        if ("position" in data)
          mesh.position.set(
            data.position[0],
            data.position[1],
            data.position[2]
          );
        if ("rotation" in data)
          mesh.rotation.set(
            data.rotation[0],
            data.rotation[1],
            data.rotation[2]
          );
      } else {
        mesh.rotation.setFromVector3(
          new THREE.Vector3(
            randNum(Math.PI * 2),
            randNum(Math.PI * 2),
            randNum(Math.PI * 2)
          )
        );
        mesh.position.set(randNum(0.25), randNum(0.25), randNum(0.15));
      }

      scene.add(mesh);
      sceneObjs.push(mesh);
      return mesh;
    },
    // eslint-disable-next-line no-unused-vars
    function (xhr) {
      // console.log((xhr.loaded / xhr.total) * 100 + "% loaded");
    },
    function (error) {
      console.log(loc);
      console.log(data);
      console.error(error);
    }
  );
}

function randNum(max) {
  const dir = Math.round(Math.random()) ? 1 : -1;
  return Math.random() * max * dir;
}
</script>

<style>
.fine-dining {
  display: flex;
}
.the-whole-plate {
  height: 500px;
  width: 800px;
}
</style>
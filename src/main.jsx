import { createRoot } from 'react-dom/client'
import { Canvas, useFrame } from '@react-three/fiber'
import { OrbitControls } from '@react-three/drei'
import * as THREE from 'three'


let slider_value = 0;
let last_slider_value = 0;
{
    const slider = document.getElementById('slider');
    slider.addEventListener("input", handle_slider);
    slider_value = slider.value;
}

function handle_slider(event) {
    slider_value = event.target.value;
}


// const pos_arr = new Float32Array(4 * tets_count);
const buffer = new Float32Array([
    0, 0, 0,
    0, 1, 0,
  
    0, 0, 0,
    1, 1, 0,
  
    0, 0, 0,
    1, 1, 1,
]);

const material = new THREE.LineBasicMaterial();
const position = new THREE.BufferAttribute( buffer , 3 );
const geometry = new THREE.BufferGeometry();
geometry.setAttribute('position', position);
geometry.setDrawRange(0, 0);

function cuts_useframe(state, dt) {
    if (last_slider_value == slider_value) return;
    last_slider_value = slider_value

    // const attr = geometry.getAttribute('position');
    // const arr = attr.array;
    // arr[0] = slider_value;
    buffer[0] = slider_value;

    const update_start = 0; // f32 at index 0
    const update_count = 1; // only one f32 updated

    const verts_count = 6; //wasm.calcuate_slice(arr, slider.value);

    geometry.setDrawRange(0, verts_count);
    position.clearUpdateRanges();
    position.addUpdateRange(update_start, update_count);
    position.needsUpdate = true;

}

function Cuts() {
    useFrame(cuts_useframe);
    return <lineSegments geometry={geometry} material={material} />
}

createRoot(document.getElementById("main")).render(
    <Canvas camera={{ position: [0, 5, 5] }}>
        <Cuts />
        <gridHelper />
        <OrbitControls  enableDamping={false} />
    </Canvas>
)

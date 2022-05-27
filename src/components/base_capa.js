import React, { Suspense, useRef } from "react"
import { useFrame } from "@react-three/fiber"
import { useGLTF, useTexture  } from "@react-three/drei"

function Capa(value) {
    const ref = useRef()
    
    const { nodes, materials } = useGLTF("models/gltf/capa/base_capa.glb")
    console.log("nodes", nodes);
    console.log("materials", materials);

    // Position model
    useFrame((state) => {
      ref.current.position.x = 0.03;
      ref.current.position.y = 0.0;
      ref.current.position.z = -0.375;
    })
    
    var _material = materials["TT_checker_2048x2048_COLOR_GRID"];

    var [ colorPath, rgbPath, normalPath ] = [];
    switch (value["value"]) {
      case 1:
      default:
        colorPath = 'models/gltf/capa/CAPA V1/CAPA_TT_checker_2048x2048_COLOR_GRID_BaseColor.1001.png';
        rgbPath = 'models/gltf/capa/CAPA V1/rgbMap.png';
        normalPath = 'models/gltf/capa/CAPA V1/CAPA_TT_checker_2048x2048_COLOR_GRID_Normal.1001.png';
        break;
    
      case 2:
        colorPath = 'models/gltf/capa/CAPA V2/CAPA_TT_checker_2048x2048_COLOR_GRID_BaseColor.1001.png';
        rgbPath = 'models/gltf/capa/CAPA V2/rgbMap.png';
        normalPath = 'models/gltf/capa/CAPA V2/CAPA_TT_checker_2048x2048_COLOR_GRID_Normal.1001.png';
        break;
    }
      
    const [ colorMap, rgbMap, normalMap ] = useTexture([ colorPath, rgbPath, normalPath ]);

    console.log(_material);
    _material.map = colorMap;
    _material.map.flipY = false;
    _material.map.wrap = [
      1001,
      1001
    ];
    _material.map.encoding = 3001;

    _material.metalnessMap= rgbMap;
    _material.metalnessMap.flipY = false;
    _material.metalnessMap.wrap = [
      1001,
      1001
    ];

    _material.roughnessMap= rgbMap;
    _material.roughnessMap.flipY = false;
    _material.roughnessMap.wrap = [
      1001,
      1001
    ];

    _material.normalMap= normalMap;
    _material.normalMap.flipY = false;
    _material.normalMap.wrap = [
      1001,
      1001
    ];

    console.log(_material);

    // Using the GLTFJSX output here to wire in app-state and hook up events
    return (
      <group
        ref={ref}
        dispose={null}>
        <mesh receiveShadow castShadow geometry={nodes.Plane.geometry} material={_material} scale={0.6} />
      </group>
    )
  }

export default Capa;
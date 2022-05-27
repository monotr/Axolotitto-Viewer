import React, { Suspense, useRef } from "react"
import { useFrame } from "@react-three/fiber"
import { useGLTF } from "@react-three/drei"

function CoheteDoge() {
    const ref = useRef()
    
    const { nodes, materials } = useGLTF("models/gltf/cohetedoge_v1.glb")
    console.log("nodes", nodes);
    console.log("materials", materials);

    // Position model
    useFrame((state) => {
      ref.current.position.y = 0.7;
      ref.current.position.z = 0.1;
    })

    // Using the GLTFJSX output here to wire in app-state and hook up events
    return (
      <group
        ref={ref}
        dispose={null}>
        <mesh receiveShadow castShadow geometry={nodes.COHETE_DOGE.geometry} material={materials["DefaultMaterial.005"]} scale={0.11} />
      </group>
    )
  }

export default CoheteDoge;
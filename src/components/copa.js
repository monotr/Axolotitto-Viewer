import React, { Suspense, useRef } from "react"
import { useFrame } from "@react-three/fiber"
import { useGLTF } from "@react-three/drei"

function Copa() {
    const ref = useRef()
    
    const { nodes, materials } = useGLTF("models/gltf/copa_v1.glb")
    console.log("nodes", nodes);
    console.log("materials", materials);

    // Position model
    useFrame((state) => {
      ref.current.position.y = 1
    })

    // Using the GLTFJSX output here to wire in app-state and hook up events
    return (
      <group
        ref={ref}
        dispose={null}>
        <mesh receiveShadow castShadow geometry={nodes.SOMBRERO.geometry} material={materials.DefaultMaterial} scale={1} />
      </group>
    )
  }

export default Copa;
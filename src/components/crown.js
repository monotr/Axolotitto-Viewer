import React, { Suspense, useRef } from "react"
import { useFrame } from "@react-three/fiber"
import { useGLTF } from "@react-three/drei"

function Crown() {
    const ref = useRef()
    
    const { nodes, materials } = useGLTF("models/gltf/corona_v1.glb")
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
        <mesh receiveShadow castShadow geometry={nodes.CORONA.geometry} material={materials.Corona_v1} scale={0.25} />
      </group>
    )
  }

export default Crown;
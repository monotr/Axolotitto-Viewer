import React, { Suspense, useRef } from "react"
import { useFrame } from "@react-three/fiber"
import { useGLTF } from "@react-three/drei"

function Tenniss() {
    const ref = useRef()
    
    const { nodes, materials } = useGLTF("models/gltf/teniss_v1.glb")
    console.log("nodes", nodes);
    console.log("materials", materials);

    // Position model
    useFrame((state) => {
      ref.current.position.y = -0.7;
      ref.current.position.z = 0.1;
    })

    // Using the GLTFJSX output here to wire in app-state and hook up events
    return (
      <group
        ref={ref}
        dispose={null}>
        <mesh receiveShadow castShadow geometry={nodes.ZAPATOS_TENNIS.geometry} material={materials["wire_008061138.001"]} scale={0.5} />
      </group>
    )
  }

export default Tenniss;
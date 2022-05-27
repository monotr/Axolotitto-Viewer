import React, { useRef } from "react"
import { useFrame } from "@react-three/fiber"
import { useGLTF, useTexture  } from "@react-three/drei"

function ModelLoader( args ) {
    //console.log(args);
    const ref = useRef()
    
    const { nodes, materials } = useGLTF(args.url)
    //console.log("nodes", nodes);
    //console.log("materials", materials);

    // Position model
    useFrame((state) => {
      if (args.posX) {
        ref.current.position.x = args.posX
      }

      ref.current.position.y = -1.75
      if (args.posY) {
        ref.current.position.y += args.posY
      }
      if (args.posY) {
        ref.current.position.z = args.posZ
      }

      if (args.rotX) {
        ref.current.rotation.x = args.rotX
      }
      if (args.rotZ) {
        ref.current.rotation.z = args.rotZ
      }

      if (args.scale) {
        ref.current.scale.x = args.scale;
        ref.current.scale.y = args.scale;
        ref.current.scale.z = args.scale;
      }
    })

    function Meshy( params ) {
        //console.log(params.node, nodes);

        let _material = materials[nodes[params.node].material.name];
        
        // Texture
        if (args.colorPath) {
          const [ colorMap ] = useTexture([ args.colorPath ]);
          _material.map = colorMap;
          _material.map.flipY = false;
          _material.map.wrap = [
            1001,
            1001
          ];
          _material.map.encoding = 3001;
        }
        /*const [ colorMap, metallicMap, roughnessMap, normalMap ] = useTexture([ args.colorPath, args.metallicPath, args.roughnessPath, args.normalPath ]);

        console.log(_material);
        _material.map = colorMap;
        _material.map.flipY = false;
        _material.map.wrap = [
          1001,
          1001
        ];
        _material.map.encoding = 3001;

        _material.metalnessMap= metallicMap;
        _material.metalnessMap.flipY = false;
        _material.metalnessMap.wrap = [
          1001,
          1001
        ];

        _material.roughnessMap= roughnessMap;
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
        ];*/

        //console.log(_material);

        //console.log("pos", nodes[params.node].position);
        return (<mesh
            receiveShadow
            castShadow
            geometry={nodes[params.node].geometry}
            material={_material}
            position={nodes[params.node].position}
            scale={nodes[params.node].scale}
            quaternion={nodes[params.node].quaternion}
        />);
    }

    return (
      <group
        ref={ref}
        dispose={null}>
        { Object.keys(nodes).map((node, index) =>
            nodes[node].type.includes("Mesh") ?
              <Meshy node={node} /> : <></>
          )
        }
      </group>
    )
  }

export default ModelLoader;
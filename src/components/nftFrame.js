import * as THREE from 'three'
import React, { useState, useRef } from "react"
import { useFrame } from "@react-three/fiber"
import { useGLTF, useTexture } from "@react-three/drei"

function NftFrame( ngtUrl ) {
    console.log(ngtUrl);
    let isVideo = ngtUrl.video;
    ngtUrl = ngtUrl.args;
    const ref = useRef()
    
    const { nodes, materials } = useGLTF("models/frame.glb")
    console.log("nodes", nodes);
    console.log("materials", materials);
    
    console.log(ngtUrl);

    var _material = materials.Rahmen;

    if (!isVideo) {
      const colorMap = useTexture(ngtUrl);
      console.log(colorMap);
  
      _material.map = colorMap;
    } else {
      //Get your video element:
      const video = document.getElementById("video");
      video.src = ngtUrl;
      video.muted = false;
      //video.crossOrigin = 'Anonymous';
      //video.loop = true;
      //video.autoplay = true;
      console.log(video);
      video.onloadeddata = function () {
          console.log("PLAYYYY");
          //video.play();
          //Create your video texture:
          const videoTexture = new THREE.VideoTexture(video);
          videoTexture.needsUpdate = true;
          console.log(videoTexture);
          
          const videoMaterial = new THREE.MeshBasicMaterial({
              map: videoTexture,
              side: THREE.FrontSide,
              toneMapped: false,
          });
          videoMaterial.needsUpdate = true;
    
          _material = videoMaterial;
          console.log(_material);
      };

    }

    function VideoText() {
      const [video] = useState(() => Object.assign(document.getElementById('video')))
      //useEffect(() => void (clicked && video.play()), [video, clicked])
      return (
        <mesh receiveShadow castShadow position={[0, 0, 0.05]}>
          <planeGeometry />
          <meshBasicMaterial toneMapped={false}>
            <videoTexture attach="map" args={[video]} encoding={THREE.sRGBEncoding} />
          </meshBasicMaterial>
        </mesh>
      )
    }
    //const [video] = useState(() => Object.assign(document.createElement('video'), { src: isVideo ? ngtUrl : "", crossOrigin: 'Anonymous', loop: true, autoplay: true }))

    // Position model
    useFrame((state) => {
      ref.current.position.x = -1.5;
      ref.current.position.y = 0.1;
      ref.current.position.z = -0.5;
      ref.current.rotation.y = Math.PI / 4;
    })


    // Using the GLTFJSX output here to wire in app-state and hook up events
    return (
      <group
        ref={ref}
        dispose={null}>
        <mesh receiveShadow castShadow geometry={nodes.Bild_mir_Rahmen_1.geometry} material={_material} scale={0.01}/>
        <mesh receiveShadow castShadow geometry={nodes.Bild_mir_Rahmen_2.geometry} material={materials.Glas} scale={0.01} />
        <mesh receiveShadow castShadow geometry={nodes.Bild_mir_Rahmen_3.geometry} material={materials.R_ckseite} scale={0.01} />
        <mesh receiveShadow castShadow geometry={nodes.Bild_mir_Rahmen_4.geometry} material={materials.R_ckseite} scale={0.01} />
        {isVideo ?
          <VideoText/> : <></>
        }
      </group>
    )
  }

export default NftFrame;
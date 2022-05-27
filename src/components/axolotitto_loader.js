import * as THREE from 'three'
import React, { useRef } from "react"
import { useFrame  } from "@react-three/fiber"
//import { FBXLoader } from 'three/examples/jsm/loaders/FBXLoader'
import { useGLTF, useTexture, useFBX  } from "@react-three/drei"

function AxolotittoLoader( args ) {
    //console.log(args);
    const ref = useRef()

    // Position model
    useFrame((state) => {
        //ref.current.position.x = args.posX
        ref.current.position.y = -1.75
        //ref.current.position.z = args.posZ
    })

    function SetupMaterial(_mat) {
        //console.log(_material)

        _material.map = colorMap;
        _material.map.flipY = true;
        _material.map.wrap = [
            1000,
            1000
        ];
        _material.map.encoding = 3001;

        _material.metalnessMap= metallicMap;
        _material.metalnessMap.flipY = true;
        _material.metalnessMap.wrap = [
            1000,
            1000
        ];

        _material.roughnessMap= roughnessMap;
        _material.roughnessMap.flipY = true;
        _material.roughnessMap.wrap = [
            1000,
            1000
        ];

        if (normalMap) {
            _material.normalMap= normalMap;
            _material.normalMap.flipY = true;
            _material.normalMap.wrap = [
                1000,
                1000
            ];
        }
    }

    /*const axolotitto = useFBX('models/Axolotitto/axolotitto_0.fbx');
    //console.log("axolotitto", axolotitto);
    var [ colorMap, metallicMap, roughnessMap, normalMap ] = useTexture([
        'textures/Axolotitto/CUERPO GRAD V1/CUERPO/AXOLOTTO LOW READY TEXTURAS_CUERPO_BaseColor.1001.png',
        'textures/Axolotitto/CUERPO GRAD V1/CUERPO/AXOLOTTO LOW READY TEXTURAS_CUERPO_Metallic.1001.png',
        'textures/Axolotitto/CUERPO GRAD V1/CUERPO/AXOLOTTO LOW READY TEXTURAS_CUERPO_Roughness.1001.png',
        'textures/Axolotitto/CUERPO GRAD V1/CUERPO/AXOLOTTO LOW READY TEXTURAS_CUERPO_Normal.1001.png'
    ]);
    var _material = axolotitto.children[0].children[1].material;
    _material.shininess = 5;
    SetupMaterial(_material);*/

    const detalles = useFBX('https://firebasestorage.googleapis.com/v0/b/loteriamexicana.appspot.com/o/AxolotittoDesigner%2FAxolotitto%2Fdetalles.fbx?alt=media&token=00041eb1-572b-45bb-b215-04ffcc701e06');
    console.log("detalles");
    var [ colorMap, metallicMap, roughnessMap, normalMap ] = useTexture([
        'https://firebasestorage.googleapis.com/v0/b/loteriamexicana.appspot.com/o/AxolotittoDesigner%2FTEXTURES%2FDetalles%2FAXOLOTTO%20LOW%20READY%20TEXTURAS_MANOS%20OMBLIGO%20COLA_BaseColor.1001.png?alt=media&token=baf2247e-5cad-40e7-99b1-f5aa0e4ea57c',
        'https://firebasestorage.googleapis.com/v0/b/loteriamexicana.appspot.com/o/AxolotittoDesigner%2FTEXTURES%2FDetalles%2FAXOLOTTO%20LOW%20READY%20TEXTURAS_MANOS%20OMBLIGO%20COLA_Metallic.1001.png?alt=media&token=51e48be9-248b-4b52-a3f5-4fd75b8ca8ae',
        'https://firebasestorage.googleapis.com/v0/b/loteriamexicana.appspot.com/o/AxolotittoDesigner%2FTEXTURES%2FDetalles%2FAXOLOTTO%20LOW%20READY%20TEXTURAS_MANOS%20OMBLIGO%20COLA_Roughness.1001.png?alt=media&token=cff6ab29-c442-4159-97d2-0fe6d9aa0af5',
        'https://firebasestorage.googleapis.com/v0/b/loteriamexicana.appspot.com/o/AxolotittoDesigner%2FTEXTURES%2FDetalles%2FAXOLOTTO%20LOW%20READY%20TEXTURAS_MANOS%20OMBLIGO%20COLA_Normal.1001.png?alt=media&token=9a5ba2ec-264c-494a-b71d-0e48d973728b'
    ]);
    var _material = detalles.children[1].material;
    _material.side = 2;
    //_material.shininess = 10;
    SetupMaterial(_material);
    var _details_colors = ["#ff509f", "#ff6d52", "#ffd552", "#c0ff55", "#76ff91", "#5cffbf", "#65d7ff", "#5f7bff", "#a761ff", "#e237ff"];
    _material.color = new THREE.Color(_details_colors[args._colorId-1]);

    //
    var { materials } = useGLTF('https://firebasestorage.googleapis.com/v0/b/loteriamexicana.appspot.com/o/AxolotittoDesigner%2FAxolotitto%2FOjos.glb?alt=media&token=d18686af-31ee-4e35-95b5-fd9c26e2fdc2')
    //console.log(materials);
    let _ojos_mat = materials['OJOS']
    //console.log(_ojos_mat);

    const ojos = useFBX('https://firebasestorage.googleapis.com/v0/b/loteriamexicana.appspot.com/o/AxolotittoDesigner%2FAxolotitto%2Fojos.fbx?alt=media&token=c7189de6-cc66-42f5-8c57-6221efc28b7a')
    console.log("ojos");
    [ colorMap, metallicMap, roughnessMap, normalMap ] = useTexture([
        'https://firebasestorage.googleapis.com/v0/b/loteriamexicana.appspot.com/o/AxolotittoDesigner%2FTEXTURES%2FOjos%2FAXOLOTTO%20LOW%20READY%20TEXTURAS_OJOS_BaseColor.1001.png?alt=media&token=155a3ad6-66f2-4c85-a454-9fa9261e4243',
        'https://firebasestorage.googleapis.com/v0/b/loteriamexicana.appspot.com/o/AxolotittoDesigner%2FTEXTURES%2FOjos%2FAXOLOTTO%20LOW%20READY%20TEXTURAS_OJOS_Metallic.1001.png?alt=media&token=39f0c35b-bf28-4f86-8a9e-673b94eb546e',
        'https://firebasestorage.googleapis.com/v0/b/loteriamexicana.appspot.com/o/AxolotittoDesigner%2FTEXTURES%2FOjos%2FAXOLOTTO%20LOW%20READY%20TEXTURAS_OJOS_Roughness.1001.png?alt=media&token=7fa9d3f0-a163-4ad3-ae7f-d3b684493e30',
        'https://firebasestorage.googleapis.com/v0/b/loteriamexicana.appspot.com/o/AxolotittoDesigner%2FTEXTURES%2FOjos%2FAXOLOTTO%20LOW%20READY%20TEXTURAS_OJOS_Normal.1001.png?alt=media&token=5f3c30e6-a10a-4fb3-a943-53aae6549c60'
    ]);
    _ojos_mat.shininess = 3;
    ojos.children[0].material = _ojos_mat;
    //SetupMaterial(_material);


    const cachetes = useFBX('https://firebasestorage.googleapis.com/v0/b/loteriamexicana.appspot.com/o/AxolotittoDesigner%2FAxolotitto%2Fcachetes.fbx?alt=media&token=7a836be7-7489-42b0-b579-88d0833e0d91')
    console.log("cachetes");
    [ colorMap, metallicMap, roughnessMap, normalMap ] = useTexture([
        'https://firebasestorage.googleapis.com/v0/b/loteriamexicana.appspot.com/o/AxolotittoDesigner%2FTEXTURES%2FCachetes%2FAXOLOTTO%20LOW%20READY%20TEXTURAS_CACHETES_BaseColor.1001.png?alt=media&token=db719ccb-0fcd-405c-ac0a-94a80afb404b',
        'https://firebasestorage.googleapis.com/v0/b/loteriamexicana.appspot.com/o/AxolotittoDesigner%2FTEXTURES%2FCachetes%2FAXOLOTTO%20LOW%20READY%20TEXTURAS_CACHETES_Metallic.1001.png?alt=media&token=452019df-eebc-4b0f-88d8-d8ba5eb4f21a',
        'https://firebasestorage.googleapis.com/v0/b/loteriamexicana.appspot.com/o/AxolotittoDesigner%2FTEXTURES%2FCachetes%2FAXOLOTTO%20LOW%20READY%20TEXTURAS_CACHETES_Roughness.1001.png?alt=media&token=6d483780-3532-4a2a-85ef-2e65a7324c0b',
        'https://firebasestorage.googleapis.com/v0/b/loteriamexicana.appspot.com/o/AxolotittoDesigner%2FTEXTURES%2FCachetes%2FAXOLOTTO%20LOW%20READY%20TEXTURAS_CACHETES_Normal.1001.png?alt=media&token=c484630f-399c-41d0-ad55-8aa2a24a9384'
    ]);
    _material = cachetes.children[0].material;
    SetupMaterial(_material);

    return (
        <group
        ref={ref}
        dispose={null}>
            <primitive
                receiveShadow
                castShadow
                object={ojos}
                scale={[.01,.01,.01]}
            />
            <primitive
                receiveShadow
                castShadow
                object={detalles}
                scale={[.01,.01,.01]}
            />
            <primitive
                receiveShadow
                castShadow
                object={cachetes}
                scale={[.01,.01,.01]}
            />
      </group>
    )
  }

export default AxolotittoLoader;
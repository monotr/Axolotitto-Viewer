import React, { Suspense, useRef, useState, useEffect } from "react"
import {BrowserView, MobileView} from 'react-device-detect';
import { Canvas, useFrame, useThree } from "@react-three/fiber"
import { ContactShadows, Environment, useGLTF, OrbitControls, Html, useProgress, BakeShadows, Backdrop } from "@react-three/drei"
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';

import { proxy, useSnapshot } from "valtio"

import ModelLoader from "./components/base_loader";
import AxolotittoLoader from "./components/axolotitto_loader";

import NftFrame from "./components/nftFrame";

import contract from './contracts/base.json';

import CircularProgress from '@mui/material/CircularProgress';

import axios from 'axios';
//import storage from './components/firebase';

import "./index.css";

// Using a Valtio state model to bridge reactivity between
// the canvas and the dom, both can write to it and/or react to it.
const state = proxy({
  current: null,
  items: {
    head: false
  },
})


export default function App() {
  //document.body.style.backgroundColor = '#e91e63';

  const [curItem, setCurItem] = useState(-1);

  // === BACKGROUND === //
  const background_colors = ["#f06292", "#9575cd", "#64b5f6", "#81c784", "#fff176", "#ff8a65", "#ef5350", "#e0e0e0", "#424242"];
  const [curBackground, setCurBackground] = useState(0);
  
  // === HEAD === //
  const [headItems, setHeadItems] = useState([
    {
      "name": "Crown",
      "model": "https://firebasestorage.googleapis.com/v0/b/loteriamexicana.appspot.com/o/AxolotittoDesigner%2FHead%2FCrown.glb?alt=media&token=818e4405-7fa9-460b-98dd-684a553d6a21",
      "textures": {
        "colorPath": null,
        "rgbPath": null,
        "normalPath": null
      }
    },
  ]);
  const [curHead, setCurHead] = useState(-1);

  // === FACE === //
  const [faceItems, setFaceItems] = useState([
    {
      "name": "Glasses",
      "model": "https://firebasestorage.googleapis.com/v0/b/loteriamexicana.appspot.com/o/AxolotittoDesigner%2FFace%2FGlasses.glb?alt=media&token=96f1ef8c-326f-4bc6-9c8d-e56540f0149b",
      "textures": {
        "colorPath": null,
        "rgbPath": null,
        "normalPath": null
      }
    },
    {
      "name": "Gas Mask",
      "model": "https://firebasestorage.googleapis.com/v0/b/loteriamexicana.appspot.com/o/AxolotittoDesigner%2FFace%2FMask.glb?alt=media&token=fd0d8d47-6ebd-4c6d-8637-662737447cb8",
      "textures": {
        "colorPath": null,
        "rgbPath": null,
        "normalPath": null
      }
    },
    {
      "name": "Cyborg Eye R",
      "model": "https://firebasestorage.googleapis.com/v0/b/loteriamexicana.appspot.com/o/AxolotittoDesigner%2FFace%2FCyborgEye_R.glb?alt=media&token=3825cfb7-ee50-4a83-a8c2-3f86c168f817",
      "textures": {
        "colorPath": null,
        "rgbPath": null,
        "normalPath": null
      }
    },
    {
      "name": "Cyborg Eye L",
      "model": "https://firebasestorage.googleapis.com/v0/b/loteriamexicana.appspot.com/o/AxolotittoDesigner%2FFace%2FMonio.glb?alt=media&token=8810ea01-25a8-45c1-86a5-8e9d836f434f",
      "textures": {
        "colorPath": null,
        "rgbPath": null,
        "normalPath": null
      }
    },
    {
      "name": "Moño",
      "model": "https://firebasestorage.googleapis.com/v0/b/loteriamexicana.appspot.com/o/AxolotittoDesigner%2FFace%2FMonio.glb?alt=media&token=8810ea01-25a8-45c1-86a5-8e9d836f434f",
      "textures": {
        "colorPath": null,
        "rgbPath": null,
        "normalPath": null
      }
    },
    {
      "name": "Monoculo",
      "model": "https://firebasestorage.googleapis.com/v0/b/loteriamexicana.appspot.com/o/AxolotittoDesigner%2FFace%2FMonoculo.glb?alt=media&token=489792e0-c4e8-4704-b3fc-d877e6158338",
      "textures": {
        "colorPath": null,
        "rgbPath": null,
        "normalPath": null
      }
    },
  ]);
  const [curFace, setCurFace] = useState(-1);

  // === NECK === //
  const [neckItems, setNeckItems] = useState([
    {
      "name": "BTC Chain",
      "model": "https://firebasestorage.googleapis.com/v0/b/loteriamexicana.appspot.com/o/AxolotittoDesigner%2FNeck%2FBitcoinChain.glb?alt=media&token=7be1928c-1324-454f-af42-19a24494e798",
      "textures": {
        "colorPath": null,
        "rgbPath": null,
        "normalPath": null
      }
    },
    {
      "name": "Capa",
      "model": "https://firebasestorage.googleapis.com/v0/b/loteriamexicana.appspot.com/o/AxolotittoDesigner%2FNeck%2FCapa.glb?alt=media&token=9abfeba2-7956-45ef-ae4b-d56b8de0aed2",
      "textures": {
        "colorPath": null,
        "rgbPath": null,
        "normalPath": null
      }
    },
    {
      "name": "Moño",
      "model": "https://firebasestorage.googleapis.com/v0/b/loteriamexicana.appspot.com/o/AxolotittoDesigner%2FNeck%2FMonio.glb?alt=media&token=2feabc37-b0b1-4005-8654-ccea0e0f0688",
      "textures": {
        "colorPath": null,
        "rgbPath": null,
        "normalPath": null
      }
    },
  ]);
  const [curNeck, setCurNeck] = useState(-1);
  
  // === CHEST === //
  const [chestItems, setChestItems] = useState([
    {
      "name": "Shirt",
      "model": "https://firebasestorage.googleapis.com/v0/b/loteriamexicana.appspot.com/o/AxolotittoDesigner%2FChest%2FShirt.glb?alt=media&token=97fb3778-738e-4f85-b615-d5f8bac3a28c",
      "textures": {
        "colorPath": null,
        "rgbPath": null,
        "normalPath": null
      }
    },
  ]);
  const [curChest, setCurChest] = useState(-1);

  // === LEGS === //
  const [legsItems, setLegsItems] = useState([
    {
      "name": "Shorts",
      "model": "https://firebasestorage.googleapis.com/v0/b/loteriamexicana.appspot.com/o/AxolotittoDesigner%2FLegs%2FShorts.glb?alt=media&token=67321c52-65a1-4a67-8e1c-629702307b5e",
      "textures": {
        "colorPath": null,
        "rgbPath": null,
        "normalPath": null
      }
    },
    {
      "name": "Cargo Shorts",
      "model": "https://firebasestorage.googleapis.com/v0/b/loteriamexicana.appspot.com/o/AxolotittoDesigner%2FLegs%2FCargo.glb?alt=media&token=5805739e-e0f1-4083-90b6-ad9b15c0f2aa",
      "textures": {
        "colorPath": null,
        "rgbPath": null,
        "normalPath": null
      }
    },
  ]);
  const [curLegs, setCurLegs] = useState(-1);

  // === HANDS === //
  const [handsItems, setHandsItems] = useState([
    {
      "name": "Sword",
      "model": "https://firebasestorage.googleapis.com/v0/b/loteriamexicana.appspot.com/o/AxolotittoDesigner%2FHands%2FSword.glb?alt=media&token=464c9174-478f-4887-bc5d-8574e894efc3",
      "textures": {
        "colorPath": null,
        "rgbPath": null,
        "normalPath": null
      }
    },
    {
      "name": "Shield",
      "model": "https://firebasestorage.googleapis.com/v0/b/loteriamexicana.appspot.com/o/AxolotittoDesigner%2FHands%2FShield.glb?alt=media&token=080c3000-6d48-4843-bb93-d6f220776fbb",
      "textures": {
        "colorPath": null,
        "rgbPath": null,
        "normalPath": null
      }
    },
  ]);
  const [curHands, setCurHands] = useState(-1);

  // === FEET === //
  const [feetItems, setFeetItems] = useState([
    {
      "name": "Tennis",
      "model": "https://firebasestorage.googleapis.com/v0/b/loteriamexicana.appspot.com/o/AxolotittoDesigner%2FFeet%2Ftennis.glb?alt=media&token=941ed917-ee4b-4fd0-a129-38c6ed1a3ae4",
      "textures": {
        "colorPath": null,
        "rgbPath": null,
        "normalPath": null
      }
    }
  ]);
  const [curFeet, setCurFeet] = useState(-1);
  
  // === AROUND === //
  const [aroundItems, setAroundItems] = useState([
    {
      "name": "DOGE Rocket",
      "model": "https://firebasestorage.googleapis.com/v0/b/loteriamexicana.appspot.com/o/AxolotittoDesigner%2FAround%2FDogeRocket.glb?alt=media&token=52c4c122-b41b-4129-a6ea-fec01ae30236",
      "textures": {
        "colorPath": null,
        "rgbPath": null,
        "normalPath": null
      }
    }
  ]);
  const [curAround, setCurAround] = useState(-1);

  //
  const [faceId, setFaceId] = useState(0);
  const [branquiasId, setBranquiasId] = useState(0);
  const [colorId, setColorId] = useState(1);

  const axo_textures = [
    "https://firebasestorage.googleapis.com/v0/b/loteriamexicana.appspot.com/o/AxolotittoDesigner%2FTEXTURES%2FCuerpo%2FAXOLOTTO%20LOW%20READY%20TEXTURAS_CUERPO_BaseColor.1001.png?alt=media&token=d9d11991-da0c-47d3-9b09-a3bb7f3b2839",
    "https://firebasestorage.googleapis.com/v0/b/loteriamexicana.appspot.com/o/AxolotittoDesigner%2FTEXTURES%2FCuerpo%2FAXOLOTTO%20LOW%20READY%20TEXTURAS_CUERPO_BaseColor.1002.png?alt=media&token=970b0a11-4819-4d04-ae52-2b64939dd168",
    "https://firebasestorage.googleapis.com/v0/b/loteriamexicana.appspot.com/o/AxolotittoDesigner%2FTEXTURES%2FCuerpo%2FAXOLOTTO%20LOW%20READY%20TEXTURAS_CUERPO_BaseColor.1003.png?alt=media&token=2884c589-2732-40cc-8e35-554309a6c505",
    "https://firebasestorage.googleapis.com/v0/b/loteriamexicana.appspot.com/o/AxolotittoDesigner%2FTEXTURES%2FCuerpo%2FAXOLOTTO%20LOW%20READY%20TEXTURAS_CUERPO_BaseColor.1004.png?alt=media&token=b40b82d6-543c-4569-9d1a-dbb0fd4f61bd",
    "https://firebasestorage.googleapis.com/v0/b/loteriamexicana.appspot.com/o/AxolotittoDesigner%2FTEXTURES%2FCuerpo%2FAXOLOTTO%20LOW%20READY%20TEXTURAS_CUERPO_BaseColor.1005.png?alt=media&token=317770af-f9d0-4646-9115-3b2046bd2993",
    "https://firebasestorage.googleapis.com/v0/b/loteriamexicana.appspot.com/o/AxolotittoDesigner%2FTEXTURES%2FCuerpo%2FAXOLOTTO%20LOW%20READY%20TEXTURAS_CUERPO_BaseColor.1006.png?alt=media&token=008bfe1f-e345-4b48-93d7-923c93b56634",
    "https://firebasestorage.googleapis.com/v0/b/loteriamexicana.appspot.com/o/AxolotittoDesigner%2FTEXTURES%2FCuerpo%2FAXOLOTTO%20LOW%20READY%20TEXTURAS_CUERPO_BaseColor.1007.png?alt=media&token=263b316a-5d59-48e1-99ff-1189a968f703",
    "https://firebasestorage.googleapis.com/v0/b/loteriamexicana.appspot.com/o/AxolotittoDesigner%2FTEXTURES%2FCuerpo%2FAXOLOTTO%20LOW%20READY%20TEXTURAS_CUERPO_BaseColor.1008.png?alt=media&token=e3322de2-640d-4574-be77-f2ccfead9e72",
    "https://firebasestorage.googleapis.com/v0/b/loteriamexicana.appspot.com/o/AxolotittoDesigner%2FTEXTURES%2FCuerpo%2FAXOLOTTO%20LOW%20READY%20TEXTURAS_CUERPO_BaseColor.1009.png?alt=media&token=a25cfb2c-a8b4-41fd-8302-f654cfca2a37",
    "https://firebasestorage.googleapis.com/v0/b/loteriamexicana.appspot.com/o/AxolotittoDesigner%2FTEXTURES%2FCuerpo%2FAXOLOTTO%20LOW%20READY%20TEXTURAS_CUERPO_BaseColor.1010.png?alt=media&token=2335c490-eb40-4429-a016-ca5eb063575a"

  ]; //"textures/Axolotitto/CUERPO GRAD V1/CUERPO/AXOLOTTO LOW READY TEXTURAS_CUERPO_BaseColor.10{id}.png";
  const branquias_textures = [
    [
      "https://firebasestorage.googleapis.com/v0/b/loteriamexicana.appspot.com/o/AxolotittoDesigner%2FTEXTURES%2FBranquias%2FEsferas%2FFINAL%20BRANQUIA%20ESFERA_DefaultMaterial_BaseColor.1001.png?alt=media&token=b834a22f-5900-4765-991b-43cb9d447d5f",
      "https://firebasestorage.googleapis.com/v0/b/loteriamexicana.appspot.com/o/AxolotittoDesigner%2FTEXTURES%2FBranquias%2FEsferas%2FFINAL%20BRANQUIA%20ESFERA_DefaultMaterial_BaseColor.1002.png?alt=media&token=abfa9b63-d3c7-4742-8c77-aefb372f6f63",
      "https://firebasestorage.googleapis.com/v0/b/loteriamexicana.appspot.com/o/AxolotittoDesigner%2FTEXTURES%2FBranquias%2FEsferas%2FFINAL%20BRANQUIA%20ESFERA_DefaultMaterial_BaseColor.1003.png?alt=media&token=4fd3b7ce-3f27-4b5f-b096-28b5a066ce47",
      "https://firebasestorage.googleapis.com/v0/b/loteriamexicana.appspot.com/o/AxolotittoDesigner%2FTEXTURES%2FBranquias%2FEsferas%2FFINAL%20BRANQUIA%20ESFERA_DefaultMaterial_BaseColor.1004.png?alt=media&token=b63cfd5f-dfb8-471e-ab67-e42996cc9fd0",
      "https://firebasestorage.googleapis.com/v0/b/loteriamexicana.appspot.com/o/AxolotittoDesigner%2FTEXTURES%2FBranquias%2FEsferas%2FFINAL%20BRANQUIA%20ESFERA_DefaultMaterial_BaseColor.1005.png?alt=media&token=0348a13c-0ba3-45cf-bc34-f44aa4b1734d",
      "https://firebasestorage.googleapis.com/v0/b/loteriamexicana.appspot.com/o/AxolotittoDesigner%2FTEXTURES%2FBranquias%2FEsferas%2FFINAL%20BRANQUIA%20ESFERA_DefaultMaterial_BaseColor.1006.png?alt=media&token=46cb3145-6eda-4dbf-b98f-9b29630a5084",
      "https://firebasestorage.googleapis.com/v0/b/loteriamexicana.appspot.com/o/AxolotittoDesigner%2FTEXTURES%2FBranquias%2FEsferas%2FFINAL%20BRANQUIA%20ESFERA_DefaultMaterial_BaseColor.1007.png?alt=media&token=6fb83b16-6384-4c16-aee0-fcf93535a6b3",
      "https://firebasestorage.googleapis.com/v0/b/loteriamexicana.appspot.com/o/AxolotittoDesigner%2FTEXTURES%2FBranquias%2FEsferas%2FFINAL%20BRANQUIA%20ESFERA_DefaultMaterial_BaseColor.1008.png?alt=media&token=1fcd42f6-08a2-4323-838d-cd4446f0635a",
      "https://firebasestorage.googleapis.com/v0/b/loteriamexicana.appspot.com/o/AxolotittoDesigner%2FTEXTURES%2FBranquias%2FEsferas%2FFINAL%20BRANQUIA%20ESFERA_DefaultMaterial_BaseColor.1009.png?alt=media&token=f5788b84-e12d-4fb7-b8c0-57e05e81eac6",
      "https://firebasestorage.googleapis.com/v0/b/loteriamexicana.appspot.com/o/AxolotittoDesigner%2FTEXTURES%2FBranquias%2FEsferas%2FFINAL%20BRANQUIA%20ESFERA_DefaultMaterial_BaseColor.1010.png?alt=media&token=02d9c325-c3c7-4fec-864e-a86b6232353a",
    ],
    [
      "https://firebasestorage.googleapis.com/v0/b/loteriamexicana.appspot.com/o/AxolotittoDesigner%2FTEXTURES%2FBranquias%2FCubo%2FFINAL%20BRANQUIA%20CUBO_DefaultMaterial_BaseColor.1001.png?alt=media&token=b3fddeee-9458-4b65-8935-34102b978224",
      "https://firebasestorage.googleapis.com/v0/b/loteriamexicana.appspot.com/o/AxolotittoDesigner%2FTEXTURES%2FBranquias%2FCubo%2FFINAL%20BRANQUIA%20CUBO_DefaultMaterial_BaseColor.1002.png?alt=media&token=012f8d56-6d39-4f5d-89f7-171e8a92ab40",
      "https://firebasestorage.googleapis.com/v0/b/loteriamexicana.appspot.com/o/AxolotittoDesigner%2FTEXTURES%2FBranquias%2FCubo%2FFINAL%20BRANQUIA%20CUBO_DefaultMaterial_BaseColor.1003.png?alt=media&token=d7c07264-22be-4657-9f3c-ff4d6f11c145",
      "https://firebasestorage.googleapis.com/v0/b/loteriamexicana.appspot.com/o/AxolotittoDesigner%2FTEXTURES%2FBranquias%2FCubo%2FFINAL%20BRANQUIA%20CUBO_DefaultMaterial_BaseColor.1004.png?alt=media&token=b79afe92-2967-4fe1-971e-d28df4c68c06",
      "https://firebasestorage.googleapis.com/v0/b/loteriamexicana.appspot.com/o/AxolotittoDesigner%2FTEXTURES%2FBranquias%2FCubo%2FFINAL%20BRANQUIA%20CUBO_DefaultMaterial_BaseColor.1005.png?alt=media&token=9f3fc081-d8cb-4e08-b9fb-3b6bc51fef61",
      "https://firebasestorage.googleapis.com/v0/b/loteriamexicana.appspot.com/o/AxolotittoDesigner%2FTEXTURES%2FBranquias%2FCubo%2FFINAL%20BRANQUIA%20CUBO_DefaultMaterial_BaseColor.1006.png?alt=media&token=2f3d219f-6a10-4f21-a9d3-f25c6530fd98",
      "https://firebasestorage.googleapis.com/v0/b/loteriamexicana.appspot.com/o/AxolotittoDesigner%2FTEXTURES%2FBranquias%2FCubo%2FFINAL%20BRANQUIA%20CUBO_DefaultMaterial_BaseColor.1007.png?alt=media&token=c21420af-96ae-4cf1-b233-996ae3713126",
      "https://firebasestorage.googleapis.com/v0/b/loteriamexicana.appspot.com/o/AxolotittoDesigner%2FTEXTURES%2FBranquias%2FCubo%2FFINAL%20BRANQUIA%20CUBO_DefaultMaterial_BaseColor.1008.png?alt=media&token=e09a651f-a761-422d-b8c4-6cf7e0ece57f",
      "https://firebasestorage.googleapis.com/v0/b/loteriamexicana.appspot.com/o/AxolotittoDesigner%2FTEXTURES%2FBranquias%2FCubo%2FFINAL%20BRANQUIA%20CUBO_DefaultMaterial_BaseColor.1009.png?alt=media&token=b9d0fb17-d2bb-4072-83a6-c4e18dcd299b",
      "https://firebasestorage.googleapis.com/v0/b/loteriamexicana.appspot.com/o/AxolotittoDesigner%2FTEXTURES%2FBranquias%2FCubo%2FFINAL%20BRANQUIA%20CUBO_DefaultMaterial_BaseColor.1010.png?alt=media&token=0f65a87c-59cc-48dc-a53d-cda5306f0a27"
    ],
    [
      "https://firebasestorage.googleapis.com/v0/b/loteriamexicana.appspot.com/o/AxolotittoDesigner%2FTEXTURES%2FBranquias%2FHexagono%2FFINAL%20BRANQUIAS%20HEXAGONAL_Material.002_BaseColor.1001.png?alt=media&token=02c53fe5-5e2b-4f4f-a36b-49184f6850fa",
      "https://firebasestorage.googleapis.com/v0/b/loteriamexicana.appspot.com/o/AxolotittoDesigner%2FTEXTURES%2FBranquias%2FHexagono%2FFINAL%20BRANQUIAS%20HEXAGONAL_Material.002_BaseColor.1002.png?alt=media&token=8d69af50-d913-4b7f-ba83-90e847c4c772",
      "https://firebasestorage.googleapis.com/v0/b/loteriamexicana.appspot.com/o/AxolotittoDesigner%2FTEXTURES%2FBranquias%2FHexagono%2FFINAL%20BRANQUIAS%20HEXAGONAL_Material.002_BaseColor.1003.png?alt=media&token=ce9f88d4-4769-40fc-af8e-8b1cae99aec7",
      "https://firebasestorage.googleapis.com/v0/b/loteriamexicana.appspot.com/o/AxolotittoDesigner%2FTEXTURES%2FBranquias%2FHexagono%2FFINAL%20BRANQUIAS%20HEXAGONAL_Material.002_BaseColor.1004.png?alt=media&token=f088583b-4a55-43cb-8d74-4ce64fc397cb",
      "https://firebasestorage.googleapis.com/v0/b/loteriamexicana.appspot.com/o/AxolotittoDesigner%2FTEXTURES%2FBranquias%2FHexagono%2FFINAL%20BRANQUIAS%20HEXAGONAL_Material.002_BaseColor.1005.png?alt=media&token=3e4b2d63-36ac-47b7-a8db-da47a8d27c3f",
      "https://firebasestorage.googleapis.com/v0/b/loteriamexicana.appspot.com/o/AxolotittoDesigner%2FTEXTURES%2FBranquias%2FHexagono%2FFINAL%20BRANQUIAS%20HEXAGONAL_Material.002_BaseColor.1006.png?alt=media&token=46893869-7c5e-42b1-afb6-f9d25efd5c75",
      "https://firebasestorage.googleapis.com/v0/b/loteriamexicana.appspot.com/o/AxolotittoDesigner%2FTEXTURES%2FBranquias%2FHexagono%2FFINAL%20BRANQUIAS%20HEXAGONAL_Material.002_BaseColor.1007.png?alt=media&token=2e4ec3a4-1c1c-4708-b29d-c673ff5a6882",
      "https://firebasestorage.googleapis.com/v0/b/loteriamexicana.appspot.com/o/AxolotittoDesigner%2FTEXTURES%2FBranquias%2FHexagono%2FFINAL%20BRANQUIAS%20HEXAGONAL_Material.002_BaseColor.1008.png?alt=media&token=e06f9e96-d9c3-4342-baa5-37c300338c8b",
      "https://firebasestorage.googleapis.com/v0/b/loteriamexicana.appspot.com/o/AxolotittoDesigner%2FTEXTURES%2FBranquias%2FHexagono%2FFINAL%20BRANQUIAS%20HEXAGONAL_Material.002_BaseColor.1009.png?alt=media&token=194b3873-8448-4f97-88a4-fdd83283f16b",
      "https://firebasestorage.googleapis.com/v0/b/loteriamexicana.appspot.com/o/AxolotittoDesigner%2FTEXTURES%2FBranquias%2FHexagono%2FFINAL%20BRANQUIAS%20HEXAGONAL_Material.002_BaseColor.1010.png?alt=media&token=ff1a9a74-b1f0-4871-b233-f3a0e36cb7f9"
    ],
    [
      "https://firebasestorage.googleapis.com/v0/b/loteriamexicana.appspot.com/o/AxolotittoDesigner%2FTEXTURES%2FBranquias%2FTradicional%2FFINAL%20BRANQUIA%20TRADICIONAL_BRANQUIAS.001_BaseColor.1001.png?alt=media&token=29edbab6-9ff3-4477-b79b-1572cabc8178",
      "https://firebasestorage.googleapis.com/v0/b/loteriamexicana.appspot.com/o/AxolotittoDesigner%2FTEXTURES%2FBranquias%2FTradicional%2FFINAL%20BRANQUIA%20TRADICIONAL_BRANQUIAS.001_BaseColor.1002.png?alt=media&token=acf03d56-0b1f-445e-8fc4-d98d61b908ca",
      "https://firebasestorage.googleapis.com/v0/b/loteriamexicana.appspot.com/o/AxolotittoDesigner%2FTEXTURES%2FBranquias%2FTradicional%2FFINAL%20BRANQUIA%20TRADICIONAL_BRANQUIAS.001_BaseColor.1003.png?alt=media&token=b5382de1-1cf2-477e-9665-40b467a5b161",
      "https://firebasestorage.googleapis.com/v0/b/loteriamexicana.appspot.com/o/AxolotittoDesigner%2FTEXTURES%2FBranquias%2FTradicional%2FFINAL%20BRANQUIA%20TRADICIONAL_BRANQUIAS.001_BaseColor.1004.png?alt=media&token=2e94494c-3518-4cbc-9125-f4c1c924b249",
      "https://firebasestorage.googleapis.com/v0/b/loteriamexicana.appspot.com/o/AxolotittoDesigner%2FTEXTURES%2FBranquias%2FTradicional%2FFINAL%20BRANQUIA%20TRADICIONAL_BRANQUIAS.001_BaseColor.1005.png?alt=media&token=1ed531ca-c9fe-44fd-b0d7-8c187f266b50",
      "https://firebasestorage.googleapis.com/v0/b/loteriamexicana.appspot.com/o/AxolotittoDesigner%2FTEXTURES%2FBranquias%2FTradicional%2FFINAL%20BRANQUIA%20TRADICIONAL_BRANQUIAS.001_BaseColor.1006.png?alt=media&token=95b5c5f3-feca-4db5-943a-6c49849221d7",
      "https://firebasestorage.googleapis.com/v0/b/loteriamexicana.appspot.com/o/AxolotittoDesigner%2FTEXTURES%2FBranquias%2FTradicional%2FFINAL%20BRANQUIA%20TRADICIONAL_BRANQUIAS.001_BaseColor.1007.png?alt=media&token=9b811df8-ded6-4686-89bc-6bc686c320f6",
      "https://firebasestorage.googleapis.com/v0/b/loteriamexicana.appspot.com/o/AxolotittoDesigner%2FTEXTURES%2FBranquias%2FTradicional%2FFINAL%20BRANQUIA%20TRADICIONAL_BRANQUIAS.001_BaseColor.1008.png?alt=media&token=eb333189-555b-4a85-a38c-7f9f4e6a7a8c",
      "https://firebasestorage.googleapis.com/v0/b/loteriamexicana.appspot.com/o/AxolotittoDesigner%2FTEXTURES%2FBranquias%2FTradicional%2FFINAL%20BRANQUIA%20TRADICIONAL_BRANQUIAS.001_BaseColor.1009.png?alt=media&token=be7c35c7-3d25-41eb-8621-c50e57332025",
      "https://firebasestorage.googleapis.com/v0/b/loteriamexicana.appspot.com/o/AxolotittoDesigner%2FTEXTURES%2FBranquias%2FTradicional%2FFINAL%20BRANQUIA%20TRADICIONAL_BRANQUIAS.001_BaseColor.1010.png?alt=media&token=b4e37309-a90a-4dd5-9217-f4838be1517e"
    ],
    [
      "https://firebasestorage.googleapis.com/v0/b/loteriamexicana.appspot.com/o/AxolotittoDesigner%2FTEXTURES%2FBranquias%2FTriangulos%2FFINAL%20BRANQUIA%20TRIANGULO_Material.002_BaseColor.1001.png?alt=media&token=39344e48-6c0f-4746-8e45-ae94363f5abd",
      "https://firebasestorage.googleapis.com/v0/b/loteriamexicana.appspot.com/o/AxolotittoDesigner%2FTEXTURES%2FBranquias%2FTriangulos%2FFINAL%20BRANQUIA%20TRIANGULO_Material.002_BaseColor.1002.png?alt=media&token=e20e4d0e-9e65-4153-bdef-cfbc069e461d",
      "https://firebasestorage.googleapis.com/v0/b/loteriamexicana.appspot.com/o/AxolotittoDesigner%2FTEXTURES%2FBranquias%2FTriangulos%2FFINAL%20BRANQUIA%20TRIANGULO_Material.002_BaseColor.1003.png?alt=media&token=e1694e3d-e9c6-41ac-97a5-32ca1c4b1a6a",
      "https://firebasestorage.googleapis.com/v0/b/loteriamexicana.appspot.com/o/AxolotittoDesigner%2FTEXTURES%2FBranquias%2FTriangulos%2FFINAL%20BRANQUIA%20TRIANGULO_Material.002_BaseColor.1004.png?alt=media&token=9f658711-9b65-4fd4-821a-84bae32a9d76",
      "https://firebasestorage.googleapis.com/v0/b/loteriamexicana.appspot.com/o/AxolotittoDesigner%2FTEXTURES%2FBranquias%2FTriangulos%2FFINAL%20BRANQUIA%20TRIANGULO_Material.002_BaseColor.1005.png?alt=media&token=43606a70-1703-426c-b109-e85ed03527a5",
      "https://firebasestorage.googleapis.com/v0/b/loteriamexicana.appspot.com/o/AxolotittoDesigner%2FTEXTURES%2FBranquias%2FTriangulos%2FFINAL%20BRANQUIA%20TRIANGULO_Material.002_BaseColor.1006.png?alt=media&token=16dacd0a-480a-42a2-8ca0-fdda314b2792",
      "https://firebasestorage.googleapis.com/v0/b/loteriamexicana.appspot.com/o/AxolotittoDesigner%2FTEXTURES%2FBranquias%2FTriangulos%2FFINAL%20BRANQUIA%20TRIANGULO_Material.002_BaseColor.1007.png?alt=media&token=ffc51a38-6ca3-40aa-b71e-b02f55bcbaee",
      "https://firebasestorage.googleapis.com/v0/b/loteriamexicana.appspot.com/o/AxolotittoDesigner%2FTEXTURES%2FBranquias%2FTriangulos%2FFINAL%20BRANQUIA%20TRIANGULO_Material.002_BaseColor.1008.png?alt=media&token=66b8ad03-6e12-46ef-bd13-42a17e09108b",
      "https://firebasestorage.googleapis.com/v0/b/loteriamexicana.appspot.com/o/AxolotittoDesigner%2FTEXTURES%2FBranquias%2FTriangulos%2FFINAL%20BRANQUIA%20TRIANGULO_Material.002_BaseColor.1009.png?alt=media&token=befb3282-5e0c-4a33-9bec-27392c6f3f0a",
      "https://firebasestorage.googleapis.com/v0/b/loteriamexicana.appspot.com/o/AxolotittoDesigner%2FTEXTURES%2FBranquias%2FTriangulos%2FFINAL%20BRANQUIA%20TRIANGULO_Material.002_BaseColor.1010.png?alt=media&token=a7474104-ea62-4ec2-91e2-f4fbee0973de"
    ]
  ]

  // === NFT === //
  const [imageUrl, setImageUrl] = useState('');
  const [nftUrl, setNftUrl] = useState('');
  const [nftType, setNftType] = useState('');
  const [audio, setAudio] = useState(null);
  const [errorMessage, setErrorMessage] = useState('');


  function ItemSwitch( args ) {
    if (args.current < 0) return (<></>);
    //console.log(args.items, args.current);

    let _id = args.current;
    //console.log("_id", _id);
    //console.log(args.items[_id]);

    return (<ModelLoader
      url={args.items[_id].model}
      colorPath={args.items[_id].textures.colorPath}
      metallicPath={args.items[_id].textures.metallicPath}
      roughnessPath={args.items[_id].textures.roughnessPath}
      normalPath={args.items[_id].textures.normalPath}
      //posX={0.0} posY={0.92} posZ={0.125}
      scale={1.0}
    />);
  }

  function getRandomInt(num) {
    return Math.floor(Math.random() * num)
  }

  function getRandomId(_items) {
    var rand = getRandomInt(_items.length + 1)
    return rand < _items.length ? rand : -1;
  }
  
  useEffect(() => {
    //console.log("curBackground", curBackground);
    document.body.style.backgroundColor = background_colors[curBackground];
  }, [curBackground])


  function Loader() {
    //const { progress } = useProgress()
    return (
      <Html center>
        {/*<a style={{"color": "white"}}>{progress} % loaded</a>*/}
        <Box sx={{ display: 'flex' }}>
          <CircularProgress color="secondary" />
        </Box>
      </Html>)
  }

  function NftOnScene() {
    switch (nftType) {
      case "image":
        return (
          <Suspense fallback={<Loader />}>
            <NftFrame args={nftUrl} />
          </Suspense>
        );
      case "video":
        return (
          <Suspense fallback={<Loader />}>
            <NftFrame args={nftUrl} video={true} />
          </Suspense>
        );
      case "model":
        return (
          <Suspense fallback={<Loader />}>
            <ModelLoader url={nftUrl} posX={0.725} posY={-0.725} posZ={-1} scale={0.02} />
          </Suspense>
        );
      case "audio":
        if (!audio) {
          let _audio = new Audio(nftUrl);
          _audio.loop = true;
          _audio.play();
          setAudio(_audio);
        }
        return (
          <Suspense fallback={<Loader />}>
            <ModelLoader url={"models/radio.glb"} posX={0} posY={-0.66} posZ={0.75} scale={0.02} />
          </Suspense>
        );
    
      default:
        break;
    }
  }

  const aaa = () => {
    let ref = 0;
    if (window.innerWidth > window.innerHeight) {
      ref = window.innerHeight / window.innerWidth;
    } else {
      ref = -(window.innerWidth / window.innerHeight) * 1.25;
    }
    //console.log("aaa", ref);
    return 6.5 - ref;
  }

  const axos_models = [
    "https://firebasestorage.googleapis.com/v0/b/loteriamexicana.appspot.com/o/AxolotittoDesigner%2FAxolotitto%2Faxo_0.glb?alt=media&token=baf60785-2225-4ac0-8ae3-ac5e8cd023db",
    "https://firebasestorage.googleapis.com/v0/b/loteriamexicana.appspot.com/o/AxolotittoDesigner%2FAxolotitto%2Faxo_1.glb?alt=media&token=334bee24-c25c-4665-82a9-79d49754c9b8",
    "https://firebasestorage.googleapis.com/v0/b/loteriamexicana.appspot.com/o/AxolotittoDesigner%2FAxolotitto%2Faxo_2.glb?alt=media&token=24e6358b-636b-4e2b-a610-6427752e9ffa",
    "models/Axolotitto/axo_2.glb"
  ]

  var branquias_models = [
    "https://firebasestorage.googleapis.com/v0/b/loteriamexicana.appspot.com/o/AxolotittoDesigner%2FAxolotitto%2FBranquias_0.glb?alt=media&token=9cd59255-b0e7-458d-9175-aa3d7df0248e",
    "https://firebasestorage.googleapis.com/v0/b/loteriamexicana.appspot.com/o/AxolotittoDesigner%2FAxolotitto%2FBranquias_1.glb?alt=media&token=b7d75c1b-5860-4ed2-94bc-8125627916c9",
    "https://firebasestorage.googleapis.com/v0/b/loteriamexicana.appspot.com/o/AxolotittoDesigner%2FAxolotitto%2FBranquias_2.glb?alt=media&token=34a35b83-432f-410c-a938-2031ba5069e6",
    "https://firebasestorage.googleapis.com/v0/b/loteriamexicana.appspot.com/o/AxolotittoDesigner%2FAxolotitto%2FBranquias_3.glb?alt=media&token=5ee12ab9-9a35-4feb-98b1-6774807df155",
    "https://firebasestorage.googleapis.com/v0/b/loteriamexicana.appspot.com/o/AxolotittoDesigner%2FAxolotitto%2FBranquias_4.glb?alt=media&token=5340997b-95a8-40c7-976e-6498a0420aba",
  ]

  function setAxo(id, val) {
    switch (id) {
      case 0:
        if (val >= axos_models.length) val = 0;
        setFaceId(val);
        break;
      case 1:
        if (val >= branquias_models.length) val = 0;
        setBranquiasId(val);
        break;
      case 2:
        if (val >= 10) val = 0;
        setColorId(val);
        break;

      case 3:
        if (val >= headItems.length) val = -1;
        setCurHead(val);
        break;
      case 4:
        if (val >= faceItems.length) val = -1;
        setCurFace(val);
        break;
      case 5:
        if (val >= neckItems.length) val = -1;
        setCurNeck(val);
        break;
      case 6:
        if (val >= chestItems.length) val = -1;
        setCurChest(val);
        break;
      case 7:
        if (val >= legsItems.length) val = -1;
        setCurLegs(val);
        break;
      case 8:
        if (val >= handsItems.length) val = -1;
        setCurHands(val);
        break;
      case 9:
        if (val >= feetItems.length) val = -1;
        setCurFeet(val);
        break;
      case 10:
        if (val >= aroundItems.length) val = -1;
        setCurAround(val);
        break;

      case 11:
        if (val >= background_colors.length) val = -1;
        setCurBackground(val);
        break;
    
      default:
        break;
    }
  }

  const LoadData = () => {
    const windowUrl = window.location.search;
    //console.log(windowUrl);
    const params = new URLSearchParams(windowUrl);
    console.log(params.toString());
    const _data = params.toString().split("=")[1].split('&')[0];
    console.log(_data);
    const _data2 = params.toString().split("=")[2];
    console.log(_data2);
    setNftUrl(_data2);
    for (var i = 0; i < _data.length; i++) {
      var _val = _data.charAt(i);
      if (_val === "x") continue;
      _val = parseInt(_val);
      if (_val === -1) continue;
      //console.log(_val);
      setAxo(i, _val);
    }

    return <></>
  }

  return (
    <>
      <Canvas
        className="axolotitto-canvas"
        //linear
        shadows
        dpr={[1, 2]}
        camera={{ position: [0, 0, aaa()], fov: 50 }}
        frameloop="always"
        gl={{ preserveDrawingBuffer: true, antialias: true }}
      >
        
        <ambientLight intensity={0.6} />
        {<spotLight intensity={0.3} angle={Math.PI / 3} penumbra={1} position={[0, 20, 10]} castShadow />
        }
        {//<spotLight intensity={0.3} angle={-0.1} penumbra={1} position={[0, 20, -10]} castShadow />
        }
        {<spotLight intensity={0.3} angle={-Math.PI / 3} penumbra={1} position={[0, 20, -10]} castShadow color={"#0d47a1"} />
        }

        <LoadData />
        
        <Suspense fallback={<Loader />}>
          <Environment files='https://firebasestorage.googleapis.com/v0/b/loteriamexicana.appspot.com/o/AxolotittoDesigner%2Fchristmas_photo_studio_03_2k.hdr?alt=media&token=306b2434-7cbc-4b91-bc08-7f2f5a9cc4a3hdr' resolution={512} />
          
          <AxolotittoLoader _colorId={colorId}/>

          <ModelLoader
            url={axos_models[faceId]}
            colorPath={axo_textures[colorId]}
          />
          <ModelLoader
            url={branquias_models[branquiasId]}
            posX={0.075} posY={2.19} posZ={-0.175}
            rotX={-Math.PI / 20} rotZ={Math.PI / 20}
            colorPath={branquias_textures[branquiasId][colorId]}
          />

          <ItemSwitch items={headItems} current={curHead} />
          <ItemSwitch items={faceItems} current={curFace} />
          <ItemSwitch items={neckItems} current={curNeck} />
          <ItemSwitch items={chestItems} current={curChest} />
          <ItemSwitch items={handsItems} current={curHands} />
          <ItemSwitch items={legsItems} current={curLegs} />
          <ItemSwitch items={feetItems} current={curFeet} />
          <ItemSwitch items={aroundItems} current={curAround} />
        </Suspense>

        
        <OrbitControls
          makeDefault
          minAzimuthAngle={- Math.PI }
          maxAzimuthAngle={ Math.PI }
          minPolarAngle={Math.PI / 2}
          maxPolarAngle={Math.PI / 2}
          enableZoom={false}
          enablePan={false}
        />
        
        <Suspense fallback={null}>
          {
            //<Environment path={"/cube"} resolution={512} />
          }
          
          {/*<Backdrop castShadow floor={2} position={[0, -1.6, -3.5]} scale={[5000, 100, 4]}>
            <meshStandardMaterial color={background_colors[curBackground]} envMapIntensity={0.1} />
          </Backdrop>

          <Backdrop castShadow floor={2} position={[0, -1.6, 3.5]} scale={[5000, 100, 4]} rotation={[0, Math.PI, 0]} >
            <meshStandardMaterial color={background_colors[curBackground]} envMapIntensity={0.1} />
          </Backdrop>*/}
          
          <BakeShadows />
          <ContactShadows position={[0, curFeet === -1 ? -1.75 : -1.95, 0]} scale={10} blur={2.5} far={5} opacity={0.75} />
        </Suspense>

        { nftUrl !== "" ? ( <NftOnScene /> ) : (<></>) }

      </Canvas>
      
      <Suspense>
        <video id="video" playsInline autoPlay={"true"}
          src="https://ipfs.pixura.io/ipfs/QmXE23aSMJAHZUtPkvU8eogxQFChkDiY3LZshBRMLv7LoP/00034-stylegan2-Naizo_kishi-2gpu-config-f_network-snapshot-000204_70008_size1080-1920_n3-2_splitfine0.000000_digress1.000000_1.mp4"
          crossOrigin="Anonymous" loop={"true"} style={{"position": "fixed", "top": "0%", "width": "10%", "display": "none"}}>
        </video>
      </Suspense>
    </>
  )
}
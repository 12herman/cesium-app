import React, { useEffect, useRef, useState } from "react";
import { Billboard, Camera, CameraFlyTo, CameraLookAt, Cesium3DTileset, Clock, Entity, ScreenSpaceCameraController, Viewer } from "resium";
import * as Cesium from "cesium";
import {
  Cartesian2,
  Cartesian3,
  Color,
  HeightReference,
  Ion,
  IonResource,
  NearFarScalar,
} from "cesium";
import { cesiumDatas } from "../CesiumDatas.jsx";
import { PichAngleCard, TemperatureCard, WindCard, WindmillDetailCard } from "../components/WindmillDetail.jsx";
import { useWindCardDetails } from "../context/WindCardDetailsProvider.jsx";

// Required for Cesium Ion
Ion.defaultAccessToken = cesiumDatas.cesiumtoken;
const latitude = cesiumDatas.latitude;
const longitude = cesiumDatas.longitude;

export default function BasicViewer() {
  const viewerRef = useRef(null);
  const [entities, setEntities] = useState([]);

  useEffect(() => {
    const loadModel = async () => {
      try {
        const resource = await IonResource.fromAssetId(3318741);
        const modelHeight = 150;
        const newEntities = [];

        const statusArray = Array(95).fill(true).concat(Array(5).fill(false));
        statusArray.sort(()=> Math.random() - 0.5);

        for (let i = 0; i < 100; i++) {
          
          const latOffset = (Math.random() - 0.5) * 0.1;
          const lonOffset = (Math.random() - 0.5) * 0.1;

          const lat = latitude + latOffset;
          const lon = longitude + lonOffset;

          const bladeAngles = Math.random(0,360);
          const temperature = Math.random(0,100);
          const windSpeed = Math.random(0,200).toFixed(2);
          const windmillPower = Math.random(0,100) // Power in kW
          const windmillStatus = statusArray[i];
          
          // Position of the model
          const position = Cartesian3.fromDegrees(lat, lon,0.0);
          // Orientation: make model face north (0° heading)
          const heading = Cesium.Math.toRadians(220); // Change to 180, 90, 270 to rotate model
          const pitch = 0;
          const roll = 0;
          const hpr = new Cesium.HeadingPitchRoll(heading, pitch, roll);
          
          const orientation = Cesium.Transforms.headingPitchRollQuaternion(position, hpr);

          newEntities.push({
            id: `Windmill${i}`,
            name: `WCXR${i + 1}`,
            position,
            orientation, 
            modelUri: resource,
            labelOffset: new Cartesian2(0, modelHeight),
            point:{
              pixelSize: 10,
              color: windmillStatus ? Color.GREEN : Color.RED,
              outlineColor: Color.WHITE,
              outlineWidth: 2,
              heightReference: HeightReference.CLAMP_TO_GROUND,
              splitDirection: Cesium.SplitDirection.RIGHT,
            },
            bladeAngles: {blade1:bladeAngles, blade2:bladeAngles, blade3:bladeAngles},
            temperature: {gearbox:temperature, generator:temperature},
            windSpeed: {direction:windSpeed, speed:windSpeed},
            windmillPower: {observed:windmillPower, physical:windmillPower, data:windmillPower},
            windmillStatus: windmillStatus,
          });
        }
        setEntities(newEntities);
      } catch (error) {
        console.error("Error loading Ion resource:", error);
      }
    };
    loadModel();
  }, []);

  
  const {doubleClick,windmillCardDatas} = useWindCardDetails()
  const doubleClickHandler = async(e,data) => {
    doubleClick.setState(true);
    windmillCardDatas.setData(data);
    entityModalPostionChange(data.id)
    // const camera = new Cesium.Camera(data.modelUri);
    // console.log(data);
  };

  const entityModalPostionChange = (id)=>{
   

    const entity = entities.find(id => id);
    console.log(id,entity );
    // setEntities((prevEntities) => {
    //   const updatedEntities = prevEntities.map((e) => {
    //     if (e.id === id) {
    //       return {
    //         ...e,
    //         position: Cartesian3.fromDegrees(latitude, longitude, 0),
            
    //       };
    //     }
    //     return e;
    //   });
    //   return updatedEntities;
    // })
    
  }


  return (
    <div className="relative w-full h-screen" >
  <PichAngleCard/>
  <TemperatureCard/>
  <WindCard/>
  <WindmillDetailCard/>
      <Viewer
        full
        ref={viewerRef}
        animation={false}
        timeline={false}
        infoBox={false}
        selectionIndicator={false}
        navigationHelpButton={false}
      >
      <Camera onChange={e => {
        if((e > 1) === false){
          doubleClick.setState(false);
        }
      }}/>



        {cesiumDatas.targetlocation && (
          <CameraFlyTo once={false}  {...cesiumDatas.targetlocation} duration={4} />
        )}
        {entities.map((e) => (
          <Entity
            key={e.id}
            name={e.name}
            position={e.position}
            orientation={e.orientation}
            model={{
              uri: e.modelUri,
              heightReference: HeightReference.NONE,
              scale: 100.0,
              minimumPixelSize: 0,
            }}
            point={e.point}
            label={{
              text: e.name,
              scaleByDistance: new NearFarScalar(100.0, 1.0, 50000.0, 0.0),
              verticalOrigin: Cesium.VerticalOrigin.BOTTOM, // BOTTOM
              pixelOffset: new Cartesian2(0, 10),
              fillColor: Color.BLACK,
              font: "20px Helvetica",
              showBackground: true,
              backgroundColor: Color.fromCssColorString("rgba(255, 255, 255, 0.5)"),
              heightReference: HeightReference.NONE,
            }}
            onDoubleClick={(event)=>doubleClickHandler(event,e)}
          />
        ))}
      </Viewer>
    </div>
  );
}

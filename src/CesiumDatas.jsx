import {Cartesian3, Math as CesiumMath, PositionProperty} from "cesium";
import { GoZoomIn } from "react-icons/go";

// user datas
const latitude = 78.09464832058404;
const longitude = 9.076422597557329;
const cesiumDatas = {
  cesiumtoken: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJqdGkiOiJjYjJiMjNmMy00OWZkLTQyZjAtYjAyMi02Mjg4YThlMzgwMWYiLCJpZCI6Mjk1NDMwLCJpYXQiOjE3NDUwNTg3MjF9.I0seXOCpn4EfzyiTx41KWtgd4t0MIrE_JaUv68-lLoA",
  latitude,
  longitude,
  targetlocation: {
    destination: Cartesian3.fromDegrees( latitude,longitude, 2000),
    orientation: {
      heading: CesiumMath.toRadians(20.0),
      pitch: CesiumMath.toRadians(-15.0),
      roll: CesiumMath.toRadians(0.0),
    
    },
  },
};



export { cesiumDatas };
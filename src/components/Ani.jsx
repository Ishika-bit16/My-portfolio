import Lottie from "lottie-react";
// Go up one folder to find the JSON file in src
import portfolioAnimation from "../HoneyBee.json"; 

function Ani() {
    console.log("Animation Data:", portfolioAnimation);
  return (
    <div style={{ width: "300px", height: "300px", backgroundColor: "lightblue" }}>
      <Lottie animationData={portfolioAnimation} loop={true} />
    </div>
  );
}

export default Ani;
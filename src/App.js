import React, { useState } from "react";
import { render } from "react-dom";
import { Stage, Layer, Rect, Line, Image, Circle } from "react-konva";
import useImage from "use-image";

const grid = 20;
const gridWidth = 730;
const linesA = [];
const linesB = [];

for (let i = 0; i < gridWidth / grid; i++) {
  linesA.push(
    <Line
      strokeWidth={1}
      stroke={"black"}
      points={[i * grid, 0, i * grid, gridWidth]}
    />
  );

  linesB.push(
    <Line
      strokeWidth={1}
      stroke={"black"}
      points={[0, i * grid, gridWidth, i * grid]}
    />
  );
}

const App = () => {
  const [data, setdata] = useState([]);
  const [x, setx] = useState();
  const [y, sety] = useState();
  const [image] = useImage(
    "https://cdn.shopify.com/s/files/1/0091/0272/1104/products/KiwiSmallShiplap_600x.jpg?v=1648789936"
  );
  const [dran, setdran] = useState(false);
  const ss = () => {
    return (
      <Rect
        onDragStart={(e) => {
          console.log("drag start");
          setdran(true);
        }}
        onDragMove={(e) => {
          console.log("drag move");
          setdran(true);
        }}
        onDragEnd={(e) => {
          // console.log("x", e.target.x());
          console.log("drag end");
          setdran(true);
          setTimeout(() => {
            setdran(false);
          }, 500);

          e.target.to({
            x: Math.round(e.target.x() / grid) * grid,
            y: Math.round(e.target.y() / grid) * grid,
          });
        }}
        x={x}
        y={y}
        draggable
        width={300}
        height={120}
        fillPatternImage={image}
      />
    );
  };
  const addshape = () => {
    if (dran) {
      return;
    }
    setdata([...data, ss()]);
  };

  const mouse = (e) => {
    // console.log("x", e.clientX);
    // console.log("y", e.clientY);

    setx(Math.round(e.clientX / grid) * grid - 240);
    sety(Math.round(e.clientY / grid) * grid - 20);
  };
  console.log(data);

  return (
    <>
      <div
        onClick={addshape}
        onMouseMove={mouse}
        style={{ height: "730px", width: "730px", marginLeft: "200px" }}
      >
        <Stage width={730} height={730}>
          <Layer>
            {linesA}
            {linesB}
          </Layer>
       
          <Layer>{data}</Layer>
        </Stage>
      </div>
    </>
  );
};

export default App;

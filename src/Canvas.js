import React, { useState } from "react";
import { render } from "react-dom";
import { Stage, Layer, Rect, Line, Image } from "react-konva";
import useImage from "use-image";

const grid = 20;
const gridWidth = 700;
const linesA = [];
const linesB = [];

for (let i = 0; i < gridWidth / grid; i++) {
  linesA.push(
    <Line
      strokeWidth={2}
      stroke={"black"}
      points={[i * grid, 0, i * grid, gridWidth]}
    />
  );

  linesB.push(
    <Line
      strokeWidth={2}
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
    "https://cdn.shopify.com/s/files/1/0091/0272/1104/products/Aries2x2-copy_600x.jpg?v=1648783702"
  );

  const ss = () => {
    return (
      <Rect
        onDragEnd={(e) => {
          console.log("x", e.target.x());
          e.target.to({
            x: Math.round(e.target.x() / grid) * grid,
            y: Math.round(e.target.y() / grid) * grid,
          });
        }}
        x={x}
        y={y}
        draggable
        width={80}
        height={80}
        fillPatternImage={image}
      />
    );
  };
  const addshape = () => {
    setdata([...data, ss()]);
  };

  const mouse = (e) => {
    console.log("x", e.clientX);
    console.log("y", e.clientY);

    setx(Math.round(e.clientX / grid) * grid);
    sety(Math.round(e.clientY / grid) * grid);
  };
  return (
    <>
      <div onClick={addshape} onMouseMove={mouse}>
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

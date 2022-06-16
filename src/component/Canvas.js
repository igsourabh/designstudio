import React, { useState } from "react";
import { render } from "react-dom";
import { Stage, Layer, Rect, Line, Image, Circle } from "react-konva";
import useImage from "use-image";
import { forwardRef } from "react";
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

const App = forwardRef((props, ref) => {
  const [data, setdata] = useState([]);
  const [height, setheight] = useState();
  const [width, setwidth] = useState();
  const [img, setimg] = useState("");
  const [x, setx] = useState();
  const [y, sety] = useState();
  const [image] = useImage(img);
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
        width={width}
        height={height}
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
    setx(Math.round(e.clientX / grid) * grid - 240);
    sety(Math.round(e.clientY / grid) * grid - 20);
  };
  console.log(data);

  const imgdata = [
    {
      image:
        "https://res.cloudinary.com/solatile/image/upload/w_520/v1649977883/Tile%20Images/4-14-22%20OverlayUpdate/ARIES/AriesBlank_ztamc5.jpg",
      height: 80,
      width: 80,
    },
    {
      image:
        "https://res.cloudinary.com/solatile/image/upload/w_520/v1650050629/Tile%20Images/4-14-22%20OverlayUpdate/KIWI/KiwiTriangle_oipmpn.png",
      height: 80,
      width: 80,
    },
    {
      image:
        "https://res.cloudinary.com/solatile/image/upload/w_520/v1649977860/Tile%20Images/4-14-22%20OverlayUpdate/CITRINE/CitrinePixel_ztokx2.jpg",
      height: 40,
      width: 40,
    },
    {
      image:
        "https://res.cloudinary.com/solatile/image/upload/w_520/v1648790458/Tile%20Images/2x2%20-%201x1%20-%20Small%20Shiplap%20-%20Large%20Diamond/Large%20Halflap/RubyLargeHalf_reilmu.jpg",
      height: 80,
      width: 200,
    },
  ];
  return (
    <>
      <div
        ref={ref}
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
      <div>
        {imgdata.map((e) => {
          return (
            <img
              onClick={(s) => {
                console.log(e);
                setimg(e.image);
                setheight(e.height);
                setwidth(e.width);
              }}
              width={50}
              src={e.image}
            />
          );
        })}
      </div>
    </>
  );
});

export default App;

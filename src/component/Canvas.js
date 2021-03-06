import React, { useState } from "react";
import { render } from "react-dom";
import { Stage, Layer, Rect, Line, Image, Circle } from "react-konva";
import useImage from "use-image";
import { forwardRef } from "react";

const App = forwardRef((props, ref) => {
  const grid = 20;
  const gridWidth = 730;
  const linesA = [];
  const linesB = [];

  for (let i = 0; i < gridWidth / grid; i++) {
    linesA.push(
      <Line
        strokeWidth={props.stroke}
        stroke={"black"}
        points={[i * grid, 0, i * grid, gridWidth]}
      />
    );

    linesB.push(
      <Line
        strokeWidth={props.stroke}
        stroke={"black"}
        points={[0, i * grid, gridWidth, i * grid]}
      />
    );
  }

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
      <Image
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
        // rotation={"30"}
        image={image}
        draggable
        width={width}
        height={height}
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
    setx(Math.round(e.screenX / grid) * grid - 300);
    sety(Math.round(e.screenY / grid) * grid - 70);
  };
  console.log(data);
  console.log({ height });
  console.log({ width });
  const imgdata = [
    {
      image:
        "https://res.cloudinary.com/sourabhvaish/image/upload/v1653485898/dtypgvzljpafdsqv98ty.webp",
      height: 80,
      width: 80,
    },
    {
      image:
        "https://res.cloudinary.com/sourabhvaish/image/upload/v1653459420/zkoxy53ojvkzx5gfxkbf.jpg",
      height: 80,
      width: 80,
    },
    {
      image:
        "https://res.cloudinary.com/sourabhvaish/image/upload/v1655372112/AriesHex_am0ota.webp",
      height: 82,
      width: 98,
    },
  ];
  return (
    <>
      <div
        style={{
          display: "flex",
        }}
      >
        <div
          style={{
            marginRight: "30px",
          }}
        >
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
        <div
          onClick={addshape}
          onMouseMove={mouse}
          ref={ref}
          style={{
            display: "inline-block",
            // backgroundImage: `url("https://res.cloudinary.com/sourabhvaish/image/upload/v1655371991/oie_rPgAcBdRQWrJ_nq2rzd.png")`,
          }}
        >
          <Stage width={730} height={730}>
            <Layer>
              {linesA}
              {linesB}
            </Layer>

            <Layer>{data}</Layer>
          </Stage>
        </div>
      </div>
    </>
  );
});

export default App;

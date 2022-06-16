import ReactDOM from "react-dom";
import Canvas from "./component/Canvas";
import React, { useRef, useState } from "react";
import { useReactToPrint } from "react-to-print";

const App = () => {
  const componentRef = useRef();
  const [buttonprint, setbuttonprint] = useState(1);
  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
  });
  return (
    <div className="bg-gray-200 p-6">
      <Canvas stroke={buttonprint} ref={componentRef} />
      <button
        type="button"
        className="bg-gray-500 border border-gray-500 p-2 mb-4"
        onClick={() => {
          setbuttonprint(0);
        }}
      >
        {" "}
        Print Canvas{" "}
      </button>
    </div>
  );
};

export default App;

"use client";

import { Toaster } from "react-hot-toast";

const ReactHotToast = () => {
  return (
    <Toaster
      toastOptions={{
        duration: 1500,

        style: {
          color: "white",
          minWidth: 300,
        },
        success: {
          style: {
            backgroundColor: "#FF8A3D",
          },
        },
        error: {
          style: {
            backgroundColor: "rgb(246,78,98)",
          },
        },
      }}
    />
  );
};
export default ReactHotToast;

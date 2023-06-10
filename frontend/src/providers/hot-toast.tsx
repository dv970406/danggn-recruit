"use client";

import { Toaster } from "react-hot-toast";
import { COLORS } from "../utils/values/color";

const ReactHotToast = () => {
  return (
    <Toaster
      toastOptions={{
        duration: 3000,

        style: {
          color: "white",
          maxWidth: 800,
        },
        success: {
          style: {
            backgroundColor: COLORS["danggn-orange"],
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

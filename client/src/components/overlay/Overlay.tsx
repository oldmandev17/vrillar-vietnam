import React, { useContext } from "react";
import { RaceContext } from "~/context/RaceProvider";
import classNames from "~/utils/classNames";

const Overlay = () => {
  const { isOpen } = useContext(RaceContext);
  return (
    <div
      className={classNames(
        "fixed inset-0 bg-black bg-opacity-25 z-10",
        isOpen ? "visible" : "invisible"
      )}
    >
      <div className="w-full h-full relatie">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
          <div className="w-14 h-14 border-white border-2 rounded-full border-t-transparent animate-spin"></div>
        </div>
      </div>
    </div>
  );
};

export default Overlay;

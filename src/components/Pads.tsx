import { forwardRef, useEffect, useState } from "react";

type PadsProps = {
  index: number;
  color: string;
  clickable: boolean;
  refId: { id: number };
  onClick: (id: number) => void;
};

const Pads = ({ index, color, clickable, refId, onClick }: PadsProps) => {
  const [active, setActive] = useState(false);

  useEffect(() => {
    if (refId.id === index) {
      setActive(true);
      setTimeout(() => {
        setActive(false);
      }, 250);
    }
  }, [refId]);

  return (
    <button
      id={index.toString()}
      className={`w-52 h-52  ${
        clickable && "hover:scale-[1.03] active:brightness-200"
      }  ${
        active ? "brightness-200" : "brightness-100"
      } transition-all duration-[250ms] ease-in-out`}
      style={{ backgroundColor: color }}
      disabled={!clickable}
      onClick={() => onClick(index)}
    >
      {/* <p>Pads - {index + 1}</p> */}
    </button>
  );
};

export default Pads;

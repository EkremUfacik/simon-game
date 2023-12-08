type PadsProps = {
  index: number;
  color: string;
  clickable: boolean;
  onClick: (id: number) => void;
};

const Pads = ({ index, color, clickable, onClick }: PadsProps) => {
  return (
    <button
      id={index.toString()}
      className={`w-52 h-52  ${
        clickable && "hover:scale-[1.03] active:brightness-200"
      } transition-all duration-[250ms] ease-in-out`}
      style={{ backgroundColor: color }}
      disabled={!clickable}
      onClick={() => onClick(index)}
    ></button>
  );
};
export default Pads;

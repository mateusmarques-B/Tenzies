import classNames from "classnames";

export default function Die(props) {
  return (
    <button
      onClick={() => props.hold(props.id)}
      aria-pressed={props.isHeld}
      aria-label={`Die with value ${props.value},
      ${props.isHeld ? "held" : "not held"}`}
      className={classNames(
        "text-lg text-gray-800 bg-black font-bold py-2 px-4 rounded shadow hover:bg-gray-100 cursor-pointer",
        props.isHeld ? "bg-green-500" : "bg-white"
      )}
    >
      {props.value}{" "}
    </button>
  );
}

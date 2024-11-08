import { TbLoader2 } from "react-icons/tb";

function LoadingSpinner() {
  return (
    <div className="absolute inset-0 w-full h-full flex justify-center items-center pointer-events-none">
      <div className="text-3xl animate-spin">
        <TbLoader2 />
      </div>
    </div>
  );
}

export default LoadingSpinner;

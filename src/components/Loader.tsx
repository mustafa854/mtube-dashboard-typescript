interface LoaderProps {
  height: string;
}

function Loader({ height }: LoaderProps) {
  return (
    <div
      className="w-full h-full flex flex-row justify-center content-center "
      style={{ height: height }}
    >
      <div className="loader mx-auto my-auto"></div>
    </div>
  );
}

export default Loader;

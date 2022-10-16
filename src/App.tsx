import { Canvas } from "@react-three/fiber";
import { Suspense, useEffect, useState } from "react";
import Shader from "./Model";

export default function App() {
  const [shader, setShader] = useState<string>("");

  useEffect(() => {
    fetch(
      `https://www.shadertoy.com/api/v1/shaders/7lcfDB?key=${
        import.meta.env.VITE_SHADERTOY_KEY
      }`
    )
      .then((res) => res.json())
      .then((data) => setShader(data.Shader.renderpass[0].code));
  }, [shader]);

  return (
    <>
      <div className="h-screen w-screen -z-10 fixed">
        <Suspense
          fallback={<span className="text-5xl text-red-500">loading...</span>}
        >
          <Canvas>
            <Shader rawShader={shader} />
          </Canvas>
        </Suspense>
      </div>
    </>
  );
} // https://www.shadertoy.com/view/7lcfDB

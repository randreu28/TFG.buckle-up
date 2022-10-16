import { Plane, shaderMaterial } from "@react-three/drei";
import { extend, useFrame, useLoader } from "@react-three/fiber";
import { useRef } from "react";
import * as THREE from "three";
import { Mesh, Texture, TextureLoader } from "three";

//@ts-ignore
import fragment from "./shaders/fragment.glsl";

//@ts-ignore
import vertex from "./shaders/vertex.glsl";

interface Props {
  rawShader: string;
}

export default function Model({ rawShader }: Props) {
  const ref = useRef<Mesh>(null!);

  let textures: Texture[] = [];

  for (let i = 0; i < 14; i++) {
    textures[i] = useLoader(TextureLoader, `iChannel${i}.png`);
  }

  const ShaderMaterial = shaderMaterial(
    {
      iTime: 0,
      iResolution: new THREE.Vector3(
        document.documentElement.clientWidth,
        document.documentElement.clientHeight
      ),
      iChannel0: textures[4],
      iChannel1: textures[12],
      //iChannel2: iChannels[8],
    },
    vertex,
    fragment
  );

  extend({ ShaderMaterial });
  ShaderMaterial.key = THREE.MathUtils.generateUUID();

  useFrame((state) => {
    //@ts-ignore
    ref.current.material.uniforms.iTime.value = state.clock.elapsedTime;
    //@ts-ignore
    ref.current.material.uniforms.iResolution.value = new THREE.Vector3(
      document.documentElement.clientWidth,
      document.documentElement.clientHeight
    );
  });

  return (
    <>
      <Plane
        ref={ref}
        args={[
          document.documentElement.clientWidth,
          document.documentElement.clientHeight,
        ]}
      >
        <shaderMaterial key={ShaderMaterial.key} />
      </Plane>
    </>
  );
}

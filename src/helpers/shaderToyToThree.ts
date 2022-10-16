function shaderToyToThree(shaderToyLiteral: string) {
  const vert = `
    varying vec2 vUv;
    void main() {
        vUv = uv;
    
        vec4 mvPosition = modelViewMatrix * vec4(position, 1.0);
        gl_Position = projectionMatrix * mvPosition;
    }`;

  const frag = `
    uniform vec3 iResolution;
    uniform float iTime;
    uniform sampler2D iChannel0;
    uniform sampler2D iChannel1;
    uniform sampler2D iChannel2;
    
    ${shaderToyLiteral}
    
    void main() {
        mainImage(gl_FragColor, gl_FragCoord.xy);
      }`;

  return {
    vertex: vert,
    fragment: frag,
  };
}

export default shaderToyToThree;

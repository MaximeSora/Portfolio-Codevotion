export default `
#define PHONG

uniform vec3 diffuse;
uniform vec3 emissive;
uniform vec3 specular;
uniform float shininess;
uniform float opacity;
uniform float time;
varying vec2 vUv;
varying vec3 newPosition;
varying float noise;
varying vec3 vNormal;

#include <common>
#include <packing>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <envmap_pars_fragment>
#include <gradientmap_pars_fragment>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <envmap_physical_pars_fragment>
#include <lights_phong_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <specularmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>

void main() {
  #include <clipping_planes_fragment>

  vec3 color = vec3(vUv * (0.2 - 2.0 * noise), 1.0);
  vec3 finalColors = vec3(color.b * 1.5, color.r, color.r);

  // Remap cos intensity to a vivid dark→teal→cyan palette
  float intensity = clamp(cos(finalColors.r * noise * 3.0) * 0.5 + 0.5, 0.0, 1.0);
  vec3 colorShadow    = vec3(0.0,  0.05, 0.12);  // near-black base
  vec3 colorMid       = vec3(0.0,  0.60, 0.78);  // rich teal
  vec3 colorHighlight = vec3(0.0,  0.90, 1.0);   // primary cyan #00E5FF
  float t = smoothstep(0.0, 0.55, intensity);
  float s = smoothstep(0.55, 1.0, intensity);
  vec4 diffuseColor = vec4(mix(mix(colorShadow, colorMid, t), colorHighlight, s), 1.0);
  ReflectedLight reflectedLight = ReflectedLight(vec3(0.0), vec3(0.0), vec3(0.0), vec3(0.0));
  vec3 totalEmissiveRadiance = emissive;

  #include <logdepthbuf_fragment>
  #include <map_fragment>
  #include <color_fragment>
  #include <alphamap_fragment>
  #include <alphatest_fragment>
  #include <specularmap_fragment>
  #include <normal_fragment_begin>
  #include <normal_fragment_maps>
  #include <emissivemap_fragment>
  #include <lights_phong_fragment>
  #include <lights_fragment_begin>
  #include <lights_fragment_maps>
  #include <lights_fragment_end>
  #include <aomap_fragment>

  vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + reflectedLight.directSpecular + reflectedLight.indirectSpecular + totalEmissiveRadiance;

  #include <envmap_fragment>

  gl_FragColor = vec4(outgoingLight, diffuseColor.a);
  #include <tonemapping_fragment>
  #include <colorspace_fragment>
  #include <fog_fragment>
  #include <premultiplied_alpha_fragment>
}
`;

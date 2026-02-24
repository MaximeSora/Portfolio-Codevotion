export default `
#define PHONG

uniform vec3 diffuse;
uniform vec3 emissive;
uniform float uIsLight;
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

  // Remap cos intensity to a theme-aware palette
  float intensity = clamp(cos(finalColors.r * noise * 3.0) * 0.5 + 0.5, 0.0, 1.0);

  // Dark mode palette — teal primary (0, 229, 255)
  vec3 dColorBase      = vec3(0.0,  0.30, 0.50);
  vec3 dColorMid       = vec3(0.0,  0.70, 0.90);
  vec3 dColorHighlight = vec3(0.0,  0.90, 1.0);
  vec3 dColorWhite     = vec3(0.55, 0.98, 1.0);

  // Light mode palette — bright cyan→white, high luminosity
  vec3 lColorBase      = vec3(0.45, 0.88, 0.95);
  vec3 lColorMid       = vec3(0.65, 0.96, 1.0);
  vec3 lColorHighlight = vec3(0.85, 1.0,  1.0);
  vec3 lColorWhite     = vec3(1.0,  1.0,  1.0);

  vec3 colorBase      = mix(dColorBase,      lColorBase,      uIsLight);
  vec3 colorMid       = mix(dColorMid,       lColorMid,       uIsLight);
  vec3 colorHighlight = mix(dColorHighlight, lColorHighlight, uIsLight);
  vec3 colorWhite     = mix(dColorWhite,     lColorWhite,     uIsLight);

  float t0 = smoothstep(0.0,  0.33, intensity);
  float t1 = smoothstep(0.33, 0.66, intensity);
  float t2 = smoothstep(0.66, 1.0,  intensity);
  vec3 rampColor = mix(colorBase, colorMid, t0);
  rampColor = mix(rampColor, colorHighlight, t1);
  rampColor = mix(rampColor, colorWhite, t2);
  vec4 diffuseColor = vec4(rampColor, 1.0);
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

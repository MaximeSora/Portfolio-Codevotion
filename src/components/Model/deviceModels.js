import iphone11 from 'assets/iphone-11.glb';
import macbookPro from 'assets/macbook-pro.glb';
import solbaseThumbnail from 'assets/solbase/thumbnail.png';
import joThumbnail from 'assets/jo/jo-thumbnail.mp4';
import pornhubThumbnail from 'assets/pornhub/thumbnail.png';

export const ModelAnimationType = {
  SpringUp: 'spring-up',
  LaptopOpen: 'laptop-open',
};

const models = {
  phone: {
    url: iphone11,
    width: 374,
    height: 512,
    position: { x: 0, y: 0, z: 0 },
    animation: ModelAnimationType.SpringUp,
  },
  laptop: {
    url: macbookPro,
    width: 1280,
    height: 800,
    position: { x: 0, y: 0, z: 0 },
    animation: ModelAnimationType.LaptopOpen,
  },
  solbase: {
    url: solbaseThumbnail,
    width: 808,
    height: 632,
    position: { x: 0, y: 0, z: 0 },
  },
  jo: {
    url: joThumbnail,
    width: 808,
    height: 632,
    position: { x: 0, y: 0, z: 0 },
  },
  pornhub: {
    url: pornhubThumbnail,
    width: 808,
    height: 632,
    position: { x: 0, y: 0, z: 0 },
  },
};

export default models;

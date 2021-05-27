import classNames from 'classnames';
import { useId } from 'hooks';
import './index.css';

function Monogram({ highlight, className, ...props }) {
  const id = useId();
  const clipId = `monogram-clip-${id}`;

  return (
    <svg
      aria-hidden
      className={classNames('monogram', className)}
      width="50"
      height="50"
      viewBox="0 0 380 380"
      {...props}
    >
      
      <defs>
        <clipPath id={clipId}>
          <path d="M190,337.1a12.15,12.15,0,0,1-8.64-3.58L4.77,156.93a12.21,12.21,0,0,1,.08-17.36l.06-.06,14-14,.3-.29L97.94,46.48a12.24,12.24,0,0,1,17.75.49L190,130l74.32-83a12.22,12.22,0,0,1,17.74-.49l93.16,93.17a12.22,12.22,0,0,1,0,17.28L198.65,333.52A12.23,12.23,0,0,1,190,337.1ZM30.69,148.29,190,307.6l159.3-159.31-75.39-75.4-74.81,83.58a12.22,12.22,0,0,1-18.21,0L106.09,72.89,36.2,142.79l-.29.28Z"/>
          <path d="M370.27,279.4H288.75a7.32,7.32,0,0,1-5.2-12.49l81.52-82.08A7.33,7.33,0,0,1,377.6,190v82.07A7.33,7.33,0,0,1,370.27,279.4Zm-63.9-14.66h56.56v-57Z"/>
        </clipPath>
      </defs>
      <rect clipPath={`url(#${clipId})`} width="100%" height="100%"/>
    </svg>
  );
}

export default Monogram;

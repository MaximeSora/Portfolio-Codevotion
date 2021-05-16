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
          <path d="M365.2,220.07a12.39,12.39,0,0,0-19.09-1.83L272,292.85A12.39,12.39,0,0,0,280.78,314H354.9a12.4,12.4,0,0,0,12.38-12.39V227A12.3,12.3,0,0,0,365.2,220.07Zm-17.69,74.12h-49l49-49.3Z"/>
          <path d="M365,169,199.61,334.37a15,15,0,0,1-21.21-21.21L333.21,158.35,267.15,92.28l-67.54,67.54a15,15,0,0,1-21.21,0L110.86,92.28,47.44,155.7l-.35.34-2.3,2.31,87.82,87.82a15,15,0,1,1-21.21,21.21L13,169a15,15,0,0,1,.08-21.29l13.14-13.14.35-.35,73.71-73.71a15,15,0,0,1,21.21,0L189,128l67.55-67.54a15,15,0,0,1,21.21,0L365,147.74A15,15,0,0,1,365,169Z"/>
        </clipPath>
      </defs>
      <rect clipPath={`url(#${clipId})`} width="100%" height="100%"/>
    </svg>
  );
}

export default Monogram;

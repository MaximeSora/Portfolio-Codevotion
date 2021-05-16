import React, { useContext, useState, useEffect } from "react";
import "./style.css";
// import CustomCursorContext from "./context/CustomCursorContext";
import classNames from "classnames";

const CustomCursor = () => {
  // const { type } = useContext(CustomCursorContext);

//   const [position, setPosition] = useState({ x: 0, y: 0 });
//   const [clicked, setClicked] = useState(false);
//   const [linkHovered, setLinkHovered] = React.useState(false);
//   const [hidden, setHidden] = useState(false);


  const secondaryCursor = React.useRef(null);
  const mainCursor = React.useRef(null);
  const positionRef = React.useRef({
    mouseX: 0,
    mouseY: 0,
    destinationX: 0,
    destinationY: 0,
    distanceX: 0,
    distanceY: 0,
    key: -1,
  });

  const [isVisible, setIsVisible] = useState(false);
  
  //Hide Cursor when leaving page
  React.useEffect(() => {
    const handleMouseEnter = () => {
      setIsVisible(true);
      console.log('mouseenter');
      mainCursor.current.style.display = `block`;
      secondaryCursor.current.style.display = `block`;
    };

    const handleMouseHover = () => {
      setIsVisible(true);
      console.log('mouseenter');
      mainCursor.current.style.display = `block`;
      secondaryCursor.current.style.display = `block`;
    };

    const handleMouseLeave = () => {
      setIsVisible(false);
      mainCursor.current.style.display = `none`;
      secondaryCursor.current.style.display = `none`;
    };

    document.body.addEventListener("mouseenter", handleMouseEnter);
    document.body.addEventListener("mouseleave", handleMouseLeave);
    return () => {
      document.body.removeEventListener("mouseenter", handleMouseEnter);
      document.body.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, []);

  const [clicked, setClicked] = useState(false);
  const [linkHovered, setLinkHovered] = useState(false);

  const handleLinkHoverEvents = () => {
    document.querySelectorAll("a").forEach(el => {
      el.addEventListener("mouseenter", () => setLinkHovered(true));
      el.addEventListener("mouseleave", () => setLinkHovered(false));
    });
  };

  React.useEffect(() => {
    handleLinkHoverEvents();
    document.addEventListener("mousedown", onMouseDown);
    document.addEventListener("mouseup", onMouseUp);
    }, []);

    const onMouseDown = () => {
        setClicked(true);
    };
    const onMouseUp = () => {
        setClicked(false);
    };

    const cursorClasses = classNames(
        'main-cursor-background',
        {
          'cursor--clicked': clicked,
          'cursor--link-hovered': linkHovered,
            // 'cursor--hidden': hidden
        }
    );

//   const addEventListeners = React.useCallback(() => {
//     document.addEventListener("mousemove", onMouseMove);
//     document.addEventListener("mouseenter", onMouseEnter);
//     document.addEventListener("mouseleave", onMouseLeave);
//     document.addEventListener("mousedown", onMouseDown);
//     document.addEventListener("mouseup", onMouseUp);
//   }, []);

//   const removeEventListeners = React.useCallback(() => {
//     document.removeEventListener("mousemove", onMouseMove);
//     document.removeEventListener("mouseenter", onMouseEnter);
//     document.removeEventListener("mouseleave", onMouseLeave);
//     document.removeEventListener("mousedown", onMouseDown);
//     document.removeEventListener("mouseup", onMouseUp);
//   }, []);

  React.useEffect(() => {
    document.addEventListener("mousemove", (event) => {
      const { clientX, clientY } = event;

      const mouseX = clientX;
      const mouseY = clientY;

      positionRef.current.mouseX =
        mouseX - secondaryCursor.current.clientWidth / 2;
      positionRef.current.mouseY =
        mouseY - secondaryCursor.current.clientHeight / 2;
      mainCursor.current.style.transform = `translate3d(${mouseX -
        mainCursor.current.clientWidth / 2}px, ${mouseY -
        mainCursor.current.clientHeight / 2}px, 0)`;
    });

    return () => {};
  }, []);

  React.useEffect(() => {
    const followMouse = () => {
      positionRef.current.key = requestAnimationFrame(followMouse);
      const {
        mouseX,
        mouseY,
        destinationX,
        destinationY,
        distanceX,
        distanceY,
      } = positionRef.current;
      if (!destinationX || !destinationY) {
        positionRef.current.destinationX = mouseX;
        positionRef.current.destinationY = mouseY;
      } else {
        positionRef.current.distanceX = (mouseX - destinationX) * 0.1;
        positionRef.current.distanceY = (mouseY - destinationY) * 0.1;
        if (
          Math.abs(positionRef.current.distanceX) +
            Math.abs(positionRef.current.distanceY) <
          0.1
        ) {
          positionRef.current.destinationX = mouseX;
          positionRef.current.destinationY = mouseY;
        } else {
          positionRef.current.destinationX += distanceX;
          positionRef.current.destinationY += distanceY;
        }
      }
      secondaryCursor.current.style.transform = `translate3d(${destinationX}px, ${destinationY}px, 0)`;
    };
    followMouse();
  }, []);
  return (
    // <div className={`cursor-wrapper ${type}`}>
    
    <div className={`cursor-wrapper`}>
      <div className="main-cursor " ref={mainCursor}>
        <div className={cursorClasses}></div>
      </div>
      <div className="secondary-cursor" ref={secondaryCursor}>
        <div className="cursor-background"></div>
      </div>
    </div>
  );
};

export default CustomCursor;

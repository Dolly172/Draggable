import React, { useState, useRef, useEffect } from 'react';
import '../Draggable.css';

const Draggable = ({ children, level, width, height }) => {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [dragging, setDragging] = useState(false);
  const [rel, setRel] = useState({ x: 0, y: 0 });
  const draggableRef = useRef(null);

  const onMouseDown = (e) => {
    if (e.button !== 0) return;
    const pos = { x: e.pageX, y: e.pageY };
    setDragging(true);
    setRel({
      x: pos.x - position.x,
      y: pos.y - position.y,
    });
    e.stopPropagation();
    e.preventDefault();
  };

  const onMouseUp = () => {
    setDragging(false);
  };

  const onMouseMove = (e) => {
    if (!dragging) return;
    const parentRect = draggableRef.current.parentElement.getBoundingClientRect();
    const newLeft = e.pageX - rel.x;
    const newTop = e.pageY - rel.y;

    if (
      newLeft >= 0 &&
      newTop >= 0 &&
      newLeft + draggableRef.current.offsetWidth <= parentRect.width &&
      newTop + draggableRef.current.offsetHeight <= parentRect.height
    ) {
      setPosition({
        x: newLeft,
        y: newTop,
      });
    }
    e.stopPropagation();
    e.preventDefault();
  };

  useEffect(() => {
    const handleMouseUp = () => setDragging(false);
    window.addEventListener('mouseup', handleMouseUp);
    return () => window.removeEventListener('mouseup', handleMouseUp);
  }, []);

  useEffect(() => {
    const parentRect = draggableRef.current.parentElement.getBoundingClientRect();
    setPosition({
      x: (parentRect.width - width) / 2,
      y: (parentRect.height - height) / 2,
    });
  }, [width, height]);

  return (
    <div
      ref={draggableRef}
      className="draggable"
      style={{
        position: 'absolute',
        left: `${position.x}px`,
        top: `${position.y}px`,
        width: `${width}px`,
        height: `${height}px`,
      }}
      onMouseMove={onMouseMove}
      onMouseUp={onMouseUp}
      onMouseLeave={onMouseUp}
    >
      <div className="title-bar" onMouseDown={onMouseDown}>
        Title {level}
      </div>
      <div className="content">{children}</div>
    </div>
  );
};

export default Draggable;

import { useEffect, useRef, useState } from 'react';
import { Generator } from './canvas/generator';
import { Doodle } from './canvas/canvas';

const generator = new Generator();

function App() {
  const canvas = useRef<HTMLCanvasElement>(null);
  const [drawing, setDrawing] = useState(false);
  const [elements, setElements] = useState<
    {
      shape: string;
      operation: {
        op: string;
        data: number[];
      }[];
      x1: number;
      y1: number;
      x2: number;
      y2: number;
    }[]
  >([]);

  const mouseDown = (evt: React.MouseEvent<HTMLCanvasElement, MouseEvent>) => {
    setDrawing(true);
    const { clientX, clientY } = evt;
    const elem = generator.line(clientX, clientY, clientX, clientY);
    setElements((prev) => [
      ...prev,
      { ...elem, x1: clientX, y1: clientY, x2: clientX, y2: clientY },
    ]);
  };

  const mouseMove = (evt: React.MouseEvent<HTMLCanvasElement, MouseEvent>) => {
    const { clientX, clientY } = evt;
    if (!drawing) return;
    const lastIndex = elements.length - 1;
    const { x1, y1 } = elements[lastIndex];
    const elem = generator.line(x1, y1, clientX, clientY);
    const updatedElem = { ...elem, x1, y1, x2: clientX, y2: clientY };
    setElements((prev) => {
      const updated = [...prev];
      updated[lastIndex] = updatedElem;
      return updated;
    });
  };

  const mouseUp = () => {
    setDrawing(false);
  };
  useEffect(() => {
    if (canvas.current) {
      const doodle = new Doodle(canvas.current);
      const context = canvas.current.getContext('2d');
      context?.clearRect(0, 0, canvas.current.width, canvas.current.height);
      elements.forEach((elem) => {
        doodle.draw(elem.operation);
      });
    }
  }, [elements]);

  return (
    <div className="h-screen w-screen grid place-items-center bg-neutral-200 ">
      {/* <div className="absolute top-0 left-0">
        {textPos.map((elem) => (
          <textarea
            ref={textRef}
            key={`${elem.x}${elem.y}`}
            autoFocus
            onBlur={handleBlur}
            dir="auto"
            wrap="off"
            style={{ top: elem.y, left: elem.x }}
            className="absolute leading-none inline-block min-h-[1em] m-0 p-0 border-0 outline-0  resize-none bg-transparent overflow-hidden whitespace-pre break-words break-normal box-content"
          />
        ))}
      </div> */}
      <button className="absolute mx-auto bg-slate-400 px-5 py-2 rounded top-5">
        T
      </button>
      <canvas
        width={window.innerWidth}
        height={window.innerHeight}
        ref={canvas}
        onMouseDown={mouseDown}
        onMouseMove={mouseMove}
        onMouseUp={mouseUp}
      />
    </div>
  );
}

export default App;

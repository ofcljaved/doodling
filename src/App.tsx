import { useEffect, useRef, useState } from 'react';

function App() {
  const canvas = useRef<HTMLCanvasElement>(null);
  const textRef = useRef<HTMLTextAreaElement>(null);
  const [writeText, setWriteText] = useState(false);
  const [textPos, setTextPos] = useState<{ x: number; y: number }[]>([]);
  const handleTextBtn = () => {
    setWriteText(true);
  };
  const handleClick = (
    evt: React.MouseEvent<HTMLCanvasElement, MouseEvent>
  ) => {
    if (!writeText) return;
    const { pageX, pageY } = evt;
    setTextPos([{ x: pageX, y: pageY }]);
    console.log(pageX, pageY);
  };
  useEffect(() => {
    const keyPress = (evt: globalThis.KeyboardEvent) => {
      if (evt.key === 'Escape') {
        setWriteText(false);
        textRef.current?.blur();
      }
    };

    document.addEventListener('keydown', keyPress);
    return () => {
      document.removeEventListener('keydown', keyPress);
    };
  }, []);
  useEffect(() => {
    const setCanvasDimension = () => {
      if (canvas.current) {
        canvas.current.width = window.innerWidth;
        canvas.current.height = window.innerHeight;
      }
    };
    window.addEventListener('resize', setCanvasDimension);
    return () => {
      window.removeEventListener('resize', setCanvasDimension);
    };
  }, []);
  const handleBlur = (evt: React.FocusEvent<HTMLTextAreaElement, Element>) => {
    const font = getComputedStyle(evt.target).font;
    const ctx = canvas.current!.getContext('2d')!;
    ctx.font = font;
    ctx.textBaseline = 'hanging';
    ctx.fillText(evt.target.value, textPos[0].x, textPos[0].y);
    setTextPos([]);
  };

  return (
    <div className="h-screen w-screen grid place-items-center bg-neutral-200 ">
      <div className="absolute top-0 left-0">
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
      </div>
      <button
        className="absolute mx-auto bg-slate-400 px-5 py-2 rounded top-5"
        onClick={handleTextBtn}
      >
        T
      </button>
      <canvas
        width={window.innerWidth}
        height={window.innerHeight}
        onClick={handleClick}
        ref={canvas}
        className={` ${writeText ? 'cursor-text' : 'cursor-default'}`}
      />
    </div>
  );
}

export default App;

import { MouseEvent, useRef } from 'react';

import Text from '../text';

interface Value {
  start: number;
  end: number;
}

interface Props {
  value: Value;
  min: number;
  max: number;
  step: number;
  onMouseUp: () => void;
  onStartChange: (start: number) => void;
  onEndChange: (end: number) => void;
}

export default function Slider({ value, min, max, step, onMouseUp, onStartChange, onEndChange }: Props) {
  const sliderRef = useRef<HTMLDivElement>(null);
  const startControllerPosition = `${(value.start / max) * 100}%`;
  const endControllerPosition = `${(value.end / max) * 100}%`;

  const handleMouseDown = (_: MouseEvent, type: 'start' | 'end') => {
    const handleMouseMove = (moveEvent: MouseEvent) => {
      if (!sliderRef.current) return;

      const sliderRect = sliderRef.current.getBoundingClientRect();
      const newPosition = Math.min(Math.max(moveEvent.clientX - sliderRect.left, 0), sliderRect.width);
      const newValue = (newPosition / sliderRect.width) * max;
      const snappedValue = Math.round(newValue / step) * step;

      if (type === 'start' && snappedValue <= value.end) {
        onStartChange(snappedValue);
      } else if (type === 'end' && snappedValue >= value.start) {
        onEndChange(snappedValue);
      }
    };

    const handleMouseUp = () => {
      document.removeEventListener('mousemove', handleMouseMove as unknown as EventListener);
      document.removeEventListener('mouseup', handleMouseUp);
      onMouseUp();
    };

    document.addEventListener('mousemove', handleMouseMove as unknown as EventListener);
    document.addEventListener('mouseup', handleMouseUp);
  };

  return (
    <div className='flex items-center relative w-full h-16 mt-3' ref={sliderRef}>
      <div className='relative w-full h-[6px] rounded-sm bg-default-color bg-opacity-10' />
      <div
        className='absolute h-[6px] bg-default-color'
        style={{
          left: startControllerPosition,
          width: `calc(${endControllerPosition} - ${startControllerPosition})`,
        }}
      />
      <div
        className='absolute h-5'
        style={{
          width: 'calc(100% - 20px)',
        }}
      >
        <div
          className='absolute w-10 cursor-pointer'
          style={{
            left: startControllerPosition,
            zIndex: value.start === max ? 1 : 0,
          }}
          onMouseDown={(event) => handleMouseDown(event, 'start')}
        >
          <div className='w-5 h-5 rounded-full bg-default-color border-2 border-white' />
          {value.start !== max && <Text content={value.start === min ? '신입' : `${value.start}년`} />}
        </div>
        <div
          className='absolute w-10 cursor-pointer'
          style={{
            left: endControllerPosition,
          }}
          onMouseDown={(event) => handleMouseDown(event, 'end')}
        >
          <div className='w-5 h-5 rounded-full bg-green-800 border-2 border-white' />
          {value.end !== min && <Text content={`${value.end}년`} />}
        </div>
      </div>
    </div>
  );
}

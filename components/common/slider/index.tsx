import { MouseEvent, useCallback, useRef } from "react";

import Text from "../text";

interface Props {
  minValue: number;
  maxValue: number;
  min: number;
  max: number;
  step?: number;
  setMinValue: (minValue: number) => void;
  setMaxValue: (maxValue: number) => void;
  onChange?: (min: number, max: number) => void;
}

export default function Slider({
  minValue,
  maxValue,
  min,
  max,
  step = 1,
  setMinValue,
  setMaxValue,
  onChange,
}: Props) {
  const sliderRef = useRef<HTMLDivElement>(null);
  const debounceRef = useRef<NodeJS.Timeout | null>(null);
  const leftControllerPosition = `${(minValue / max) * 100}%`;
  const rightControllerPosition = `${(maxValue / max) * 100}%`;

  const debouncedOnChange = useCallback(
    (min: number, max: number) => {
      if (!onChange) return;

      if (debounceRef.current) clearTimeout(debounceRef.current);

      debounceRef.current = setTimeout(() => {
        onChange(min, max);
      }, 300);
    },
    [min, max, onChange]
  );

  const handleMouseDown = (_: MouseEvent, type: "min" | "max") => {
    const onMouseMove = (moveEvent: MouseEvent) => {
      if (!sliderRef.current) return;

      const sliderRect = sliderRef.current.getBoundingClientRect();
      const newPosition = Math.min(
        Math.max(moveEvent.clientX - sliderRect.left, 0),
        sliderRect.width
      );
      const newValue = (newPosition / sliderRect.width) * max;
      const snappedValue = Math.round(newValue / step) * step;

      if (type === "min" && snappedValue <= maxValue) {
        setMinValue(snappedValue);
        debouncedOnChange(snappedValue, maxValue);
      } else if (type === "max" && snappedValue >= minValue) {
        setMaxValue(snappedValue);
        debouncedOnChange(minValue, snappedValue);
      }
    };

    const onMouseUp = () => {
      document.removeEventListener(
        "mousemove",
        onMouseMove as unknown as EventListener
      );
      document.removeEventListener("mouseup", onMouseUp);
    };

    document.addEventListener(
      "mousemove",
      onMouseMove as unknown as EventListener
    );
    document.addEventListener("mouseup", onMouseUp);
  };

  return (
    <div className='flex items-center relative w-full mt-3' ref={sliderRef}>
      <div className='relative w-full h-[6px] rounded-sm bg-default-color bg-opacity-10' />
      <div
        className='absolute h-[6px] bg-default-color'
        style={{
          left: leftControllerPosition,
          width: `calc(${rightControllerPosition} - ${leftControllerPosition})`,
        }}
      />
      <div
        className='absolute h-5'
        style={{
          width: "calc(100% - 20px)",
        }}
      >
        <div
          className='absolute w-10 cursor-pointer'
          style={{
            left: leftControllerPosition,
            zIndex: minValue === max ? 1 : 0,
          }}
          onMouseDown={(event) => handleMouseDown(event, "min")}
        >
          <div className='w-5 h-5 rounded-full bg-default-color border-2 border-white' />
          {minValue !== max && (
            <Text content={minValue === min ? "신입" : `${minValue}년`} />
          )}
        </div>
        <div
          className='absolute w-10 cursor-pointer'
          style={{
            left: rightControllerPosition,
          }}
          onMouseDown={(event) => handleMouseDown(event, "max")}
        >
          <div className='w-5 h-5 rounded-full bg-green-800 border-2 border-white' />
          {maxValue !== min && <Text content={`${maxValue}년`} />}
        </div>
      </div>
    </div>
  );
}

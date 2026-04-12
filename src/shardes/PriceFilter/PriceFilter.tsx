import { useRef } from "react";
import styles from "./PriceFilter.module.scss";

interface Props {
  min: number;
  max: number;
  value: [number, number];
  onChange: (value: [number, number]) => void;
}

const clamp = (v: number, min: number, max: number) =>
  Math.min(Math.max(v, min), max);

const PriceFilter = ({ min, max, value, onChange }: Props) => {
  const [minVal, maxVal] = value;
  const sliderRef = useRef<HTMLDivElement>(null);

  const percent = (val: number) =>
    ((val - min) / (max - min)) * 100;

  const getValueFromX = (x: number) => {
    const rect = sliderRef.current!.getBoundingClientRect();
    const ratio = (x - rect.left) / rect.width;
    return Math.round(min + ratio * (max - min));
  };

  const startDrag = (type: "min" | "max") => (e: React.PointerEvent) => {
    e.preventDefault();

    const move = (ev: PointerEvent) => {
      const val = getValueFromX(ev.clientX);

      if (type === "min") {
        onChange([clamp(val, min, maxVal), maxVal]);
      } else {
        onChange([minVal, clamp(val, minVal, max)]);
      }
    };

    const stop = () => {
      window.removeEventListener("pointermove", move);
      window.removeEventListener("pointerup", stop);
    };

    window.addEventListener("pointermove", move);
    window.addEventListener("pointerup", stop);
  };

  return (
    <div className={styles.wrapper}>
      <h4>Цена</h4>

      <div className={styles.values}>
        <span>{minVal} ₽</span>
        <span>{maxVal} ₽</span>
      </div>

      <div ref={sliderRef} className={styles.slider}>
        <div className={styles.track} />

        <div
          className={styles.range}
          style={{
            left: `${percent(minVal)}%`,
            width: `${percent(maxVal) - percent(minVal)}%`,
          }}
        />

        {/* MIN */}
        <div
          className={styles.thumb}
          style={{ left: `${percent(minVal)}%`, zIndex: 2 }}
          onPointerDown={startDrag("min")}
        />

        {/* MAX */}
        <div
          className={styles.thumb}
          style={{ left: `${percent(maxVal)}%`, zIndex: 3 }}
          onPointerDown={startDrag("max")}
        />
      </div>
    </div>
  );
};

export default PriceFilter;
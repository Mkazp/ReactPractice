import styles from "./RatingFilter.module.scss";

interface Props {
  value: number;
  onChange: (value: number) => void;
}

const RatingFilter = ({ value, onChange }: Props) => {
  return (
    <div className={styles.filter}>
      <h4>Рейтинг</h4>

      <select
        value={value}
        onChange={(e) => onChange(Number(e.target.value))}
      >
        <option value={0}>Любой</option>
        <option value={3}>3★ и выше</option>
        <option value={3.5}>3.5★ и выше</option>
        <option value={4}>4★ и выше</option>
        <option value={4.5}>4.5★ и выше</option>
      </select>
    </div>
  );
};

export default RatingFilter;
import styles from "./CardSelect.module.scss";

interface Option {
  value: string;
  name: string;
}

interface CardSelectProps {
  options: Option[];
  defaultValue: string;
  value: string;
  onChange: (value: string) => void;
}

const CardSelect = ({
  options,
  defaultValue,
  value,
  onChange,
}: CardSelectProps) => {
  return (
    <div className={styles.wrapper}>
      <select
        className={styles.select}
        value={value}
        onChange={(e) => onChange(e.target.value)}
      >
        <option value="">{defaultValue}</option>

        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.name}
          </option>
        ))}
      </select>
    </div>
  );
};

export default CardSelect;
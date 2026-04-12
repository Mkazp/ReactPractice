import styles from "./CategoryFilter.module.scss";

interface Props {
  value: string;
  onChange: (value: string) => void;
  categories: string[];
}

const CategoryFilter = ({ value, onChange, categories }: Props) => {
  return (
    <div className={styles.filter}>
      <h4>Категории</h4>

      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
      >
        <option value="">Все категории</option>

        {categories.map((cat) => (
          <option key={cat} value={cat}>
            {cat}
          </option>
        ))}

      </select>
    </div>
  );
};

export default CategoryFilter;
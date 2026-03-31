import styles from './ItemsSearch.module.scss'


interface ItemsSearchProps {
    value: string;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    placeholder?: string;
}

const ItemsSearch = ({value, onChange, placeholder}: ItemsSearchProps) => {
    return(
        <input className={styles.myInput}
            value={value}
            onChange={onChange}
            placeholder={placeholder}
        />
    )
}

export default ItemsSearch
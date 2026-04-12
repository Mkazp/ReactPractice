import styles from "./NewProductCard.module.scss";

interface Props {
    name: string;
    image: string;
    description: string;
}

export const NewProductCard = ({name, image}: Props) =>{
    return(
        <div className={styles.card}>
            <img src={image} alt={name} />
            <div className={styles.overlay}>
                <h4>{name}</h4>
            </div>
        </div>
    )
}
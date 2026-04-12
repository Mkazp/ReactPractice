import { useState } from "react";
import { useMarketItemsStore } from "../../store/store";
import styles from './createItemsWidget.module.scss';

const CreateItemsWidget = () => {

    const addItem = useMarketItemsStore(state => state.addItem);
    const removeItem = useMarketItemsStore(state => state.removeItem);

    const [name, setName] = useState("");
    const [category, setCategory] = useState("");
    const [rating, setRating] = useState(0);
    const [price, setPrice] = useState(0);
    const [stock, setStock] = useState(0);
    const [image, setImage] = useState("");
    const [isPremium, setIsPremium] = useState(false);
    const [removeName, setRemoveName] = useState("");
    
    const [notification, setNotification] = useState("");

    const showNotification = (msg: string) => {
        setNotification(msg);
        setTimeout(() => setNotification(""), 2000);
    }

    const hendlerAddItem = () => {
        addItem({
            id: Date.now(),
            name,
            category,
            rating,
            price,
            stock,
            isPremium,
            currency: "USD",
            description: "",
            image,
        });

        showNotification(`Товар "${name}" добавлен!`);

        setName("");
        setCategory("");
        setRating(0);
        setPrice(0);
        setStock(0);
        setIsPremium(false);
        setImage("");
    };

    const handleRemove = () => {
        removeItem(removeName);
        showNotification(`Товар "${removeName}" удалён!`);
        setRemoveName("");
    };

    return (
        <main className={styles.container}>
            <h3>Создание товара</h3>

            {notification && <div className={styles.notification}>{notification}</div>}

            <div className={styles.form}>
                <div className={styles.formGroup}>
                    <label>Название:</label>
                    <input 
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder="Введите название"
                    />
                </div>

                <div className={styles.formGroup}>
                    <label>Категория:</label>
                    <input 
                        value={category}
                        onChange={(e) => setCategory(e.target.value)}
                        placeholder="Введите категорию"
                    />
                </div>

                <div className={styles.formGroup}>
                    <label>Рейтинг продавца:</label>
                    <input 
                        type="number"
                        value={rating}
                        onChange={(e) => setRating(Number(e.target.value))}
                    />
                </div>

                <div className={styles.formGroup}>
                    <label>Цена:</label>
                    <input 
                        type="number"
                        value={price}
                        onChange={(e) => setPrice(Number(e.target.value))}
                    />
                </div>

                <div className={styles.formGroup}>
                    <label>Количество:</label>
                    <input 
                        type="number"
                        value={stock}
                        onChange={(e) => setStock(Number(e.target.value))}
                    />
                </div>

                <div className={styles.formGroupCheckbox}>
                    <label>Премиум товар:</label>
                    <input 
                        type="checkbox"
                        checked={isPremium}
                        onChange={(e) => setIsPremium(e.target.checked)}
                    />
                </div>

                <div className={styles.formGroup}>
                    <label>Банер:</label>
                    <input 
                        value={image}
                        placeholder="Введите ссылку на фото"
                        onChange={(e) => setImage(String(e.target.value))}
                    />
                </div>

                <button className={styles.addBtn} onClick={hendlerAddItem}>
                    Добавить товар
                </button>
            </div>

            <div className={styles.removeSection}>
                <p>Удаление товара по названию:</p>
                <input 
                    type="text"
                    value={removeName}
                    onChange={(e) => setRemoveName(e.target.value)}
                    placeholder="Название товара"
                />
                <button className={styles.removeBtn} onClick={handleRemove}>
                    Удалить товар
                </button>
            </div>
        </main>
    )
}

export default CreateItemsWidget;
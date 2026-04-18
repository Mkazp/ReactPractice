import styles from "./ImageModal.module.scss";

interface Props {
  image: string;
  onClose: () => void;
}

export const ImageModal = ({ image, onClose }: Props) => {
  return (
    <div className={styles.overlay} onClick={onClose}>
      <img
        src={image}
        alt=""
        onClick={(e) => e.stopPropagation()}
      />
    </div>
  );
};
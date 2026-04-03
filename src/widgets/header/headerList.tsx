import styles from "./headerList.module.scss";
import { Link } from "react-router-dom";
import MarketBin from "../../features/marketBin/marketBin";

interface pagesStruk {
  title: string;
  path: string;
}

const Headerlist = () => {
  const pages: pagesStruk[] = [
    {
      title: "Маркет",
      path: "/",
    },
    {
      title: "Работа с товарами",
      path: "/createItems",
    },
  ];

  return (
    <header className={styles.header}>
      <div className={styles.container}>
        {pages.map((items) => (
          <Link to={items.path} key={items.path} className={styles.link}>
            {items.title}
          </Link>
        ))}
        <MarketBin />
      </div>
    </header>
  );
};

export default Headerlist;

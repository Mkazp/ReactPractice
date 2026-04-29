// import styles from "./headerList.module.scss";
// import { Link } from "react-router-dom";
// import MarketBin from "../../features/marketBin/marketBin";

// interface pagesStruk {
//   title: string;
//   path: string;
// }

// const Headerlist = () => {
//   const pages: pagesStruk[] = [
//     {
//       title: "Маркет",
//       path: "/",
//     },
//     {
//       title: "Работа с товарами",
//       path: "/createItems",
//     },
//   ];

//   return (
//     <header className={styles.header}>
//       <div className={styles.container}>
//         {pages.map((items) => (
//           <Link to={items.path} key={items.path} className={styles.link}>
//             {items.title}
//           </Link>
//         ))}
//         <MarketBin />
//       </div>
//     </header>
//   );
// };

// export default Headerlist;
import { useState } from "react";
import { Link } from "react-router-dom";
import styles from "./headerList.module.scss";
import MarketBin from "../../features/marketBin/marketBin";
import { useAuthStore } from "../../entities/user/model/user-store";
import { AuthModal } from "../../features/auth/ui/AuthModal";

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

  const user = useAuthStore((state) => state.user);
  const logout = useAuthStore((state) => state.logout);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);

  return (
    <header className={styles.header}>
      <div className={styles.container}>
        {pages.map((items) => (
          <Link to={items.path} key={items.path} className={styles.link}>
            {items.title}
          </Link>
        ))}
        <MarketBin />

        <div className={styles.authBlock}>
          {user ? (
            <>
              <span className={styles.userGreeting}>
                Привет, {user.firstName}!
              </span>
              <button onClick={logout} className={styles.logoutBtn}>
                Выйти
              </button>
            </>
          ) : (
            <button
              onClick={() => setIsAuthModalOpen(true)}
              className={styles.loginBtn}
            >
              Войти / Регистрация
            </button>
          )}
        </div>
      </div>

      {isAuthModalOpen && (
        <AuthModal onClose={() => setIsAuthModalOpen(false)} />
      )}
    </header>
  );
};

export default Headerlist;

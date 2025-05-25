import { Link } from "react-router-dom";

import styles from "./styles/HeaderBar.module.css";

function HeaderBar({ toggleCartWindow }) {
    return (
        <>
            <div className={styles.headerBar}>
                <p className={styles.logo}>The Beer Store</p>
                <div className={styles.linkBox}>
                    <Link to="/" className={styles.logo}>
                        Home
                    </Link>
                    <Link to="/store" className={styles.logo}>
                        Store
                    </Link>
                    <p className={styles.logo} onClick={toggleCartWindow}>
                        Cart
                    </p>
                </div>
            </div>
        </>
    );
}

export default HeaderBar;

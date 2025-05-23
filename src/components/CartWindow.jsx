import style from "./styles/CartWindow.module.css";

import fallbackImage from "../assets/draught-beer-png-mug.jpg";

function CartWindow({ cart, toggleCartWindow, cartIsOpen }) {
    return (
        <>
            <div className={`${style.cartWindow} ${cartIsOpen ? style.show : style.hide}`}>
                <button>X</button>
                {cart.map((beer, index) => (
                    <div key={index} className={style.cartRow}>
                        <p>{beer.name}</p>
                        <p>{beer.price}</p>
                        <button>X</button>
                    </div>
                ))}
            </div>
        </>
    );
}

export default CartWindow;

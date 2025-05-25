import style from "./styles/CartWindow.module.css";

function CartWindow({ cart, toggleCartWindow, cartIsOpen, clearCart, removeFromCart }) {
    const modifyCartForDisplay = () => {
        const seen = new Set();
        const condensedCart = cart.filter((beer) => {
            if (seen.has(beer)) {
                beer.quantity++;
                return false;
            } else {
                beer.quantity = 1;
                seen.add(beer);
                return true;
            }
        });
        return condensedCart;
    };

    const computeTotal = () => {
        let total = 0;
        cart.forEach((beer) => {
            total += beer.quantity * parseFloat(beer.price.slice(1));
        });
        return total;
    };

    const displayCart = () => {
        return (
            <>
                {modifyCartForDisplay().map((beer, index) => (
                    <div key={index} className={style.cartRow}>
                        <div className={style.cartRowContent}>
                            <p className={style.beerName}>{beer.name}</p>
                            <p className={style.beerPrice}>
                                {beer.quantity} x {beer.price}
                            </p>
                            <button className={style.deleteBeer} onClick={() => removeFromCart(beer)}>
                                -
                            </button>
                        </div>
                        <div className={style.separator} />
                    </div>
                ))}
                <div className={style.totalRow}>
                    <div className={style.cartRowContent}>
                        <p className={style.beerName}>Total:</p>
                        <p className={style.beerPrice}>{computeTotal().toFixed(2)}</p>
                    </div>
                    <div className={style.separator} />
                </div>
                <div className={style.cartRow}>
                    <div className={style.cartRowContent}>
                        <button className={style.completePurchase} onClick={clearCart}>
                            Clear Cart
                        </button>
                        <button className={style.completePurchase} onClick={clearCart}>
                            Complete Purchase
                        </button>
                    </div>
                </div>
            </>
        );
    };

    const displayEmptyCart = () => {
        return (
            <>
                <div className={style.totalRow}>
                    <div className={style.cartRowContent}>
                        <p className={style.emptyCartMessage}>Cart is Empty</p>
                    </div>
                </div>
            </>
        );
    };

    return (
        <>
            <div className={`${style.cartWindow} ${cartIsOpen ? style.show : style.hide}`}>
                <button className={style.closeCart} onClick={toggleCartWindow}>
                    X
                </button>
                {cart.length == 0 ? displayEmptyCart() : displayCart()}
            </div>
        </>
    );
}

export default CartWindow;

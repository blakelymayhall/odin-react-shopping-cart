import { useState, useEffect } from "react";

import HeaderBar from "./components/HeaderBar";
import { Outlet } from "react-router-dom";
import CartWindow from "./components/CartWindow";

function App() {
    const [beerList, setBeerList] = useState(null);

    const [cart, setCart] = useState([]);
    const [cartIsOpen, setCartIsOpen] = useState(false);

    useEffect(() => {
        fetch("https://api.sampleapis.com/beers/ale")
            .then((res) => res.json())
            .then((data) => {
                if (!beerList) {
                    const filteredData = data.filter((beer) => {
                        return (
                            // Filter out bad data from the API
                            beer.image !=
                                "https://www.totalwine.com/media/sys_master/cmsmedia/hff/h0e/8979036078110.png" &&
                            beer.name != "Hi" &&
                            beer.name != "{{&random}}"
                        );
                    });
                    setBeerList(filteredData);
                }
            });
    }, []);

    const toggleCartWindow = () => {
        setCartIsOpen(!cartIsOpen);
    };

    const appendToCart = (beers) => {
        let cartCopy = [...cart];
        cartCopy.push(...beers);
        setCart(cartCopy);
    };

    const clearCart = () => {
        setCart([]);
    };

    const removeFromCart = (beer) => {
        let cartCopy = [...cart];
        const indexToRemove = cartCopy.lastIndexOf(beer);
        cartCopy.splice(indexToRemove, 1);
        setCart(cartCopy);
    };

    return (
        <>
            <HeaderBar toggleCartWindow={toggleCartWindow} />
            <CartWindow
                cart={cart}
                toggleCartWindow={toggleCartWindow}
                cartIsOpen={cartIsOpen}
                clearCart={clearCart}
                removeFromCart={removeFromCart}
            />
            <Outlet context={{ appendToCart, beerList }} />
        </>
    );
}

export default App;

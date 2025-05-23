import { useState, useEffect } from "react";

import HeaderBar from "./components/HeaderBar";
import { Outlet } from "react-router-dom";
import CartWindow from "./components/CartWindow";

function App() {
    const [beerList, setBeerList] = useState(null);

    const [cart, setCart] = useState([]);
    const [cartIsOpen, setCartIsOpen] = useState(false);

    const toggleCartWindow = () => {
        console.log(cart);
        setCartIsOpen(!cartIsOpen);
    };

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

    const appendToCart = (beers) => {
        let cartCopy = [...cart];
        cartCopy.push(...beers);
        setCart(cartCopy);
    };

    return (
        <>
            <HeaderBar toggleCartWindow={toggleCartWindow} />
            <Outlet context={{ appendToCart, beerList }} />
            <CartWindow cart={cart} toggleCartWindow={toggleCartWindow} cartIsOpen={cartIsOpen} />
        </>
    );
}

export default App;

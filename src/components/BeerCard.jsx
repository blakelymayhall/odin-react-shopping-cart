import { useState } from "react";

import style from "./styles/BeerCard.module.css";
import fallbackImage from "../assets/draught-beer-png-mug.jpg";

function BeerCard({ beer, appendToCart }) {
    const [input, setInput] = useState(1);

    if (!beer) return null;

    const handleAddToCart = () => {
        let beersToAppend = [];
        for (let ii = 0; ii < input; ii++) {
            beersToAppend[ii] = beer;
        }
        appendToCart(beersToAppend);
    };

    const decInput = () => {
        if (input > 0) {
            setInput(input - 1);
        }
    };

    const incInput = () => {
        setInput(input + 1);
    };

    return (
        <>
            <div className={style.card}>
                <div className={style.beerImageContainer}>
                    <img
                        className={style.beerImage}
                        src={beer.image}
                        onError={(e) => {
                            e.target.onerror = null;
                            e.target.src = fallbackImage;
                        }}
                    ></img>
                </div>
                <p className={style.beerTitle}>{beer.name}</p>
                <p className={style.beerPrice}>{beer.price}</p>
                <div className={style.beerControlsContainer}>
                    <button className={style.decIncButton} onClick={decInput}>
                        -
                    </button>
                    <input
                        className={style.inputNumber}
                        value={input}
                        onInput={(e) => setInput(e.target.value)}
                    ></input>
                    <button className={style.decIncButton} onClick={incInput}>
                        +
                    </button>
                </div>
                <button className={style.addToCartButton} onClick={handleAddToCart}>
                    Add to Cart
                </button>
            </div>
        </>
    );
}

export default BeerCard;

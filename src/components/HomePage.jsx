import { useState, useEffect } from "react";
import { useOutletContext } from "react-router-dom";

import style from "./styles/HomePage.module.css";

import BeerCard from "./BeerCard";

function HomePage() {
    const { appendToCart, beerList } = useOutletContext();

    const [featuredBeers, setFeaturedBeers] = useState(null);
    const [highlyRatedBeers, setHighlyRatedBeers] = useState(null);
    const [budgetBeers, setBudgetBeers] = useState(null);

    const numBeersPerContainer = 5;

    useEffect(() => {
        if (beerList && !featuredBeers) {
            const getRandomIndexes = (length, size) => {
                const indexes = [];
                const created = {};
                while (indexes.length < size) {
                    const random = Math.floor(Math.random() * length);
                    if (!created[random]) {
                        indexes.push(random);
                        created[random] = true;
                    }
                }
                return indexes;
            };
            let indexes = getRandomIndexes(beerList.length, numBeersPerContainer);
            setFeaturedBeers(indexes.map((i) => beerList[i]));
            indexes = getRandomIndexes(beerList.length, numBeersPerContainer);
            setHighlyRatedBeers(indexes.map((i) => beerList[i]));
            indexes = getRandomIndexes(beerList.length, numBeersPerContainer);
            setBudgetBeers(indexes.map((i) => beerList[i]));
        }
    }, [beerList, featuredBeers, highlyRatedBeers, budgetBeers]);

    return (
        <>
            <div className={style.homePage}>
                <div className={style.homeSection}>
                    <p className={style.featuredTitle}>Featured Beers</p>
                    <div className={style.beerContainer}>
                        {featuredBeers &&
                            featuredBeers.map((beer) => {
                                return <BeerCard key={beer.id} beer={beer} appendToCart={appendToCart} />;
                            })}
                    </div>
                </div>
                <div className={style.homeSection}>
                    <p className={style.featuredTitle}>Highly Rated Beers</p>
                    <div className={style.beerContainer}>
                        {highlyRatedBeers &&
                            highlyRatedBeers.map((beer) => {
                                return <BeerCard key={beer.id} beer={beer} appendToCart={appendToCart} />;
                            })}
                    </div>
                </div>
                <div className={style.homeSection}>
                    <p className={style.featuredTitle}>Budget Beers</p>
                    <div className={style.beerContainer}>
                        {budgetBeers &&
                            budgetBeers.map((beer) => {
                                return <BeerCard key={beer.id} beer={beer} appendToCart={appendToCart} />;
                            })}
                    </div>
                </div>
            </div>
        </>
    );
}

export default HomePage;

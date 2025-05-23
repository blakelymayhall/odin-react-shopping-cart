import { useState } from "react";
import { useOutletContext } from "react-router-dom";

import style from "./styles/StorePage.module.css";

import BeerCard from "./BeerCard";

function StorePage() {
    const { appendToCart, beerList } = useOutletContext();

    const [currentPage, setCurrentPage] = useState(0);

    const numContainersPerPage = 8;
    const numBeersPerContainer = 5;

    if (!beerList) return null;

    const beerSubLists = [];
    for (let i = 0; i < beerList.length; i += numBeersPerContainer) {
        beerSubLists.push(beerList.slice(i, i + numBeersPerContainer));
    }

    const totalPages = Math.ceil(beerSubLists.length / numContainersPerPage);

    const paginatedBeers = beerSubLists.slice(
        currentPage * numContainersPerPage,
        (currentPage + 1) * numContainersPerPage
    );

    return (
        <div className={style.storePage}>
            <p className={style.featuredTitle}>All Beers</p>
            {paginatedBeers.map((subList, index) => (
                <div key={index} className={style.beerContainer}>
                    {subList.map((beer) => (
                        <BeerCard key={beer.id} beer={beer} appendToCart={appendToCart} />
                    ))}
                </div>
            ))}
            <div className={style.paginationControls}>
                <button disabled={currentPage === 0} onClick={() => setCurrentPage((p) => p - 1)}>
                    Prev
                </button>
                <span>
                    Page {currentPage + 1} of {totalPages}
                </span>
                <button disabled={currentPage + 1 >= totalPages} onClick={() => setCurrentPage((p) => p + 1)}>
                    Next
                </button>
            </div>
        </div>
    );
}

export default StorePage;

import React from "react";
import "./Search.scss"

const Search = () => {
    return (
        <div data-tesid="search-input" className="search-block">
            <form>
                <div className="Search__icon">
                    <input type="search"
                            name="text"
                            className="search"
                            placeholder="Поиск"
                            data-testid="search-input"
                            />
                </div>
            </form>
        </div>
    );
};

export default Search;
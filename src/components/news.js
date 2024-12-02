import React, { useState, useEffect } from "react";
import axios from "axios";
import '../pages/profile.css'

const News = () => {
    const [news, setNews] = useState([]);
    const [error, setError] = useState(null);
    const [currentIndex, setCurrentIndex] = useState(0);

    useEffect(() => {
        const fetchNews = async () => {
            try {
                const response = await axios.get("https://www.finnkino.fi/xml/News/");
                const parser = new DOMParser();
                const xmlDoc = parser.parseFromString(response.data, "text/xml");

                // Parsitaan uutiset JSON-muotoon
                const newsItems = Array.from(xmlDoc.querySelectorAll("NewsArticle")).map(item => ({
                    title: item.querySelector("Title")?.textContent || "",
                    ArticleURL: item.querySelector("ArticleURL")?.textContent || "", // Finnkinon uutislinkki
                    imageURL: item.querySelector("ImageURL")?.textContent || ""
                }));

                // Suodatetaan uutiset, joissa on sekä otsikko että kuva
                const filteredNews = newsItems.filter(item => item.title && item.imageURL);

                setNews(filteredNews);
            } catch (err) {
                setError("Uutisia ei voitu ladata.");
                console.error("Virhe haettaessa uutisia:", err);
            }
        };

        fetchNews();
    }, []);

    const handleNext = () => {
        setCurrentIndex(prevIndex => (prevIndex + 1) % news.length);
    }

    const handlePrev = () => {
        setCurrentIndex((prevIndex) =>
        prevIndex === 0 ? news.length - 1 : prevIndex - 1)
    }

    if (error) {
        return <div>{error}</div>;
    }

    const displayedNews = news.slice(currentIndex,currentIndex + 3)
    if (displayedNews.length < 3) {
        displayedNews.push(...news.slice(0, 3 - displayedNews.length))
    }

    return (
        <div className="carousel-container">
            <h2>Finnkinon Uutiset</h2>
            <div className="carousel">
                <button className="carousel-btn left" onClick={handlePrev}>
                    &#8592;
                </button>
                <div className = "carousel-items">
                    {displayedNews.map((item, index) => (
                        <div key={index} className ="news-item">
                            <a href ={item.ArticleURL} target="_blank" rel="nooper noreferrer">
                                <img src={item.imageURL} alt={item.title} className="news-image" />
                            </a>
                            <h3>{item.title}</h3>
                            </div>
                    ))}
                    </div>

                    <button className="carousel-btn right" onClick={handleNext}>
                        &#8594;
                        </button>
                        </div>
                        </div>
    )
}
           
export default News;

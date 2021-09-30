import React, { useEffect, useState } from "react";

import "./App.css";

import Tmdb from "./Tmdb";

import MovieRow from "./components/MovieRow";
import FeaturedMovie from "./components/FeaturedMovie";
import Header from "./components/Header";

export default function App() {
  const [movieList, setMovieList] = useState([]);
  const [featuredData, setFeaturedData] = useState(null);
  const [blackHeader, setBlackHeader] = useState(false);

  const handleFeaturedData = async (id, type) => {
    let movieInfo = await Tmdb.getMovieInfo(id, type);

    setFeaturedData(movieInfo);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  useEffect(() => {
    const loadAll = async () => {
      let list = await Tmdb.getHomeList();
      setMovieList(list);

      let originals = list.filter((i) => i.slug === "originals");
      let randomChosen = Math.floor(
        Math.random() * (originals[0].items.results.length - 1)
      );
      let chosen = originals[0].items.results[randomChosen];
      handleFeaturedData(chosen.id, "tv");
    };

    loadAll();
  }, []);

  useEffect(() => {
    const scrollListener = () => {
      if (window.scrollY > 10) {
        setBlackHeader(true);
      } else {
        setBlackHeader(false);
      }
    };

    window.addEventListener("scroll", scrollListener);
    return () => {
      window.removeEventListener("scroll", scrollListener);
    };
  });

  return (
    <div className="page">
      <Header black={blackHeader} />

      {featuredData && <FeaturedMovie item={featuredData} />}

      <section className="lists">
        {movieList.map((item, key) => (
          <MovieRow
            key={key}
            title={item.title}
            items={item.items}
            handleFeaturedData={handleFeaturedData}
          />
        ))}
      </section>

      <footer>{"Não é o Netflix ;)"}</footer>

      {movieList.length <= 0 && (
        <div className="loading">
          <img
            src="https://www.rchandru.com/images/portfolio/loading.gif"
            alt="Carregando"
          />
        </div>
      )}
    </div>
  );
}

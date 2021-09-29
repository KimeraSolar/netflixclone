import React from "react";

import "./style.css"

export default ({item}) => {
    let firstDate = new Date(item.first_air_date ? item.first_air_date : item.release_date);

    const duration = (minutes) => {
        const hour = Math.floor(minutes / 60);
        const min = minutes - hour * 60;

        return hour + 'h' + min + 'min';
    }

    let genres = [];
    for (let i in item.genres) {
        genres.push(item.genres[i].name);
    }

    return (
        <section className="featured" style={{
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            backgroundImage: `url(https://image.tmdb.org/t/p/original${item.backdrop_path})`
        }}>
            <div className="featured--vertical">
                <div className="featured--horizontal">
                    <div className="featured--name">{item.name ? item.name : item.title}</div>
                    <div className="featured--info">
                        <div className="featured--rating">{item.vote_average} ★</div>
                        <div className="featured--year">{firstDate.getFullYear()}</div>
                        {item.number_of_seasons &&
                        <div className="featured--seasons">{item.number_of_seasons} temporada{item.number_of_seasons !== 1 ? 's' : ''}</div>
                        }
                        {item.runtime &&
                        <div className="featured--seasons">{duration(item.runtime)}</div>
                        }
                    </div>
                    <div className="featured--description">{item.overview}</div>
                    <div className="featured--buttons">
                        <a href={`/watch/${item.id}`} className="featured--watchbutton">► Assistir</a>
                        <a href={`/list/add/${item.id}`} className="featured--mylistbutton">+ Minha Lista</a>
                    </div>
                    <div className="featured--genres"><strong>Gêneros: </strong>{genres.join(', ')}</div>
                </div>
            </div>
        </section>
    );
}
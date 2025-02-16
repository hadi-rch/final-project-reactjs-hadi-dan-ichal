import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { Button } from 'antd';

const DetailMovie = () => {
    let { slug } = useParams()
    const [movie, setMovie] = useState({})

    useEffect(() => {

        if (slug !== undefined) {
            axios.get(`https://super-bootcamp-backend.sanbersy.com/api/movies/${slug}`)
                .then((res) => {
                    let { data } = res
                    setMovie(data)
                    console.log(data)
                })
        }

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])


    return (
        <>
            <div className="container-1">
                <div className="image-1">
                    <img src={movie.image_url} alt={movie.name}/>
                </div>
                <div className="text-1">
                  <div className="judul">{movie.title}</div>
                    <p>Genre: {movie.genre}</p>
                    <p>Release: {movie.year}</p>
                    <p>Rating: {movie.rating}</p>
                    <p>Description: {movie.description}</p>
                    <Button type="primary"><Link to='/'>Ke halaman utama</Link></Button>
                </div>
            </div>
            
        </>
    )
};

export default DetailMovie;
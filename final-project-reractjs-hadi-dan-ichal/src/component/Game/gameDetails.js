import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { Button } from 'antd';

const DetailGames = () => {
    let { slug } = useParams()
    const [games, setGames] = useState({})

    useEffect(() => {

        if (slug !== undefined) {
            axios.get(`https://super-bootcamp-backend.sanbersy.com/api/games/${slug}`)
                .then((res) => {
                    let { data } = res
                    setGames(data)
                    console.log(data)
                })
        }

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    const handleSinglePlayer = () => {
        if (games.singlePlayer) {
            return 'Ya'
        } else {
            return 'Tidak'
        }
    }

    const handleMultiPlayer = () => {
        if (games.multiplayer) {
            return 'Ya'
        } else {
            return 'Tidak'
        }
    }

    return (
        <>
            <div className="container-1">
                <div className="image-1">
                    <img src={games.image_url} alt={games.name}/>
                </div>
                <div className="text-1">
                  <div className="judul">{games.name}</div>
                    <p>Genre: {games.genre}</p>
                    <p>Relase: {games.release}</p>
                    <p>Platform: {games.platform}</p>
                    <p>Single Player: {handleSinglePlayer(games.singlePlayer)}</p>
                    <p>Multi Player: {handleMultiPlayer(games.multiplayer)}</p>
                    <Button type="primary"><Link to='/'>Ke halaman utama</Link></Button>
                </div>
            </div>
            
        </>
    )
};

export default DetailGames;
import React, { useState, useEffect, useContext } from 'react';
import { IconMore, IconPlay, IconPause } from '../icons/icons'
import AudioContext from "../../context/context";

import style from './song.module.css'

export default function Song({ song, image, albumName }) {
  const { currentSong, findCurrentSong } = useContext(AudioContext);
  const [isActive, setIsActive] = useState(false);
  
  useEffect(() => {
    setIsActive(currentSong.id ? currentSong.id === song.id : false)
  }, [currentSong, song.id])

  const handleMore = (title) => {
    console.log(`clicked ${title} song`)
  }

  const handlePlay = (id) => {
    setIsActive((prevVal) => !prevVal);
    findCurrentSong(id);
  }

  return (
    <div className={style.song} onClick={() => handlePlay(song.id)}>
      <div className={style.songImage}>
        <img src={image} alt={style.songTitle}/>
        <span>
          {
            isActive ? <IconPause/> : <IconPlay/>
          }
        </span>
      </div>
      <div>
        <h5 className={style.songTitle}>{song.title}</h5>
        <p className={style.songDescr}>{albumName}</p>
      </div>
      <div className={style.songMore} onClick={() => handleMore(song.title)}>
        <IconMore/>
      </div>
    </div>
  )
}
import React, { useState, useContext, useEffect, useRef } from 'react';
import { IconPlay, IconStop, IconPlayNext, IconPlayPrev } from '../../assets/icons/icons';
import AudioContext from '../../context/context';

import style from './player.module.css'

export default function Player() {
  const { currentAlbum, currentSong, handleSongs } = useContext(AudioContext);
  const [isActive, setIsActive] = useState(false);

  const progressPlace = useRef();

  useEffect(() => {
    let count = 0;
    let progress;
    const finishProgress = () => {
      clearInterval(progress);
      count = 0;
      progressPlace.current.style.width = `${count}%`;
    }

    if (currentSong.id) {
      setIsActive(true)

      progress = setInterval(() => {
        count++
        progressPlace.current.style.width = `${count}%`;
      }, 200)
    } else {
      finishProgress();
      setIsActive(false);
    }

    return () => {
      finishProgress();
    }
  }, [currentSong]);

  const handlePlay = () => {
    if(!currentSong.id) {
      handleSongs()
    } else {
      handleSongs(true)
    }
  }

  return (
    <div className={`${style.playerContainer} ${isActive ? style.playerActive : ''}`}>
      <div className={style.player}>
      
        <div className={style.playerInfoContainer}>
          <div className={style.playerInfo}>
            <h5>{currentSong.title}</h5>
            <p>{currentAlbum.title}</p>
            <div><span ref={progressPlace}></span></div>
          </div>
        </div>
          
        <div className={style.playerControls}>
          <div className={style.playerMedia}>
            <div className={style.playerMediaAlbum} style={{backgroundImage: `url(${currentAlbum.imageSrc})`}}></div>
          </div>
          <div className={style.playerControlsContainer}>
            <div><IconPlayPrev/></div>
            <div onClick={() => handlePlay()}>
              {
                isActive ? <IconStop/> : <IconPlay/>
              }
            </div>
            <div><IconPlayNext/></div>
          </div>
        </div>
      </div>
    </div>
  );
}
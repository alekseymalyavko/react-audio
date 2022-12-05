import React, { useState, useContext, useEffect, useRef } from 'react';
import { IconPlay, IconStop, IconPlayNext, IconPlayPrev } from '../../components/icons/icons';
import AudioContext from '../../context/context';

import style from './player.module.css'

export default function Player() {
  const { currentAlbum, currentSong, handleSongs } = useContext(AudioContext);
  const [isActive, setIsActive] = useState(false);

  const progressPlace = useRef();

  const handlePlay = (isPlayStop, isPrev, isNext) => {
    handleSongs((isPlayStop ? Boolean(currentSong?.id) : false), isPrev, isNext);
  }

  useEffect(() => {
    let progress = null;
    let progressCount = 0;

    const finishProgress = () => {
      if (progress !== null) {
        clearInterval(progress);
        progressCount = 0;
        progressPlace.current.style.width = `${progressCount}%`;
      }
    }

    const startProgress = () => {
      progress = setInterval(() => {
        if (progressCount === 100) {
          finishProgress();
          handlePlay(false, false, true);

          return
        }
        progressCount++;
        progressPlace.current.style.width = `${progressCount}%`;
      }, 100)
    }

    currentSong.id ? startProgress() : finishProgress();

    setIsActive(Boolean(currentSong?.id));

    return () => {
      finishProgress();
    }
  }, [currentSong]);

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
            <div onClick={() => handlePlay(false, true, false)}><IconPlayPrev/></div>
            <div onClick={() => handlePlay(true)}>
              {
                isActive ? <IconStop/> : <IconPlay/>
              }
            </div>
            <div onClick={() => handlePlay(false, false, true)}><IconPlayNext/></div>
          </div>
        </div>
      </div>
    </div>
  );
}
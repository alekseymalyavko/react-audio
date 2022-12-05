import React, { useState, useEffect, useContext } from "react";
import Album from "../album/Album";
import Song from "../song/Song";
import Player from "../player/Player";
import AudioContext from "../../context/context";

import labels from '../../assets/data/labels.json'
import style from "./audioPlayer.module.css";

const AudioPlayer = () => {
  const [songs, setSongs] = useState([]);

  const { albums, currentAlbum } = useContext(AudioContext);
  useEffect(() => {
    setSongs(currentAlbum.songs || []);
  }, [currentAlbum]);

  return (
    <div className={style.playerContainer}>
      <div className={style.playerRow}>
        <h3 className={style.playerTitle}>
          {labels.album}
        </h3>
        <div className={style.playerRowScroll}>
          {albums.map((item) => (
            <Album key={item.id} album={item} />
          ))}
        </div>
      </div>
      <div className={style.playerRow}>
        <h3 className={style.playerTitle}>
          {labels.songList}
        </h3>
        <div>
          {songs.map((item, i) => (
            <Song 
              key={item.title + i} 
              albumName={currentAlbum.title}
              image={currentAlbum.imageSrc}
              song={item} />
          ))}
        </div>
      </div>
      <Player />
    </div>
  );
};

export default AudioPlayer;

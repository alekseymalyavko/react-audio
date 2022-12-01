import React, { useState, useEffect, useContext } from "react";
import Album from "./components/Album/Album";
import Song from "./components/Song/Song";
import Player from "./components/Player/Player";
import AudioContext from "./context/context";

import style from "./audioPlayer.module.css";

const AudioPlayer = () => {
  const { albums, currentAlbum } = useContext(AudioContext);

  const [songs, setSongs] = useState([]);
  useEffect(() => {
    setSongs(currentAlbum.songs || []);
  }, [currentAlbum]);

  return (
    <div className={style.playerContainer}>
      <div className={style.playerRow}>
        <h3 className={style.playerTitle}>Albums</h3>
        <div className={style.playerRowScroll}>
          {albums.map((item) => (
            <Album key={item.id} album={item} />
          ))}
        </div>
      </div>
      <div className={style.playerRow}>
        <h3 className={style.playerTitle}>Song List</h3>
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

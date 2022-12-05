import React, { useState, useEffect } from 'react';
import AudioContext from './context/context';
import AudioPlayer from './components/audioPlayer/AudioPlayer';
import Loading from './components/loading/Loading';

import DATA from './assets/data/data.json'

const initial = {};

const App = () => {
  const [isLoading, setIsLoading] = useState(false);

  const [albums, setAlbums] = useState([]);
  const [currentAlbum, setCurrentAlbum] = useState(initial);
  const [currentSong, setCurrentSong] = useState(initial);

  const findCurrentAlbum = (id) => {
    const currentAlbum = albums.find(item => item.id === id);
    setCurrentAlbum(currentAlbum);
    setCurrentSong(currentAlbum.songs[0]);
  }

  const findCurrentSong = (id) => {
    const prevSong = currentSong?.id;
    const song = currentAlbum.songs.find(item => item.id === id);
    
    const state = prevSong === song.id ? initial : song;
    setCurrentSong(state);
  }

  const handleSongs = (isStop, isPrev, isNext) => {
    if (isStop) {
      setCurrentSong(initial);
    } else {
      const songList = currentAlbum?.songs.length - 1 || 0;
      const curSong = currentSong?.id ? currentAlbum?.songs.findIndex(a => a.id === currentSong?.id) : 0;

      const nextSong = curSong !== songList ? curSong + 1 : 0;
      const prevSong = curSong !== 0 ? curSong - 1 : songList;

      const songToPlay = currentSong?.id ? (isPrev ? prevSong : (isNext ? nextSong : curSong)) : 0;

      setCurrentSong(currentAlbum.songs[songToPlay]);
    }
  }

  useEffect(() => {
    let fetch = null;

    setIsLoading(true);

    fetch = setTimeout(() => {
      setAlbums(DATA);
      setCurrentAlbum(DATA[0]);
      setIsLoading(false);
    }, 1000)

    return () => {
      clearTimeout(fetch);
    };
  }, []);

  return (
    <AudioContext.Provider value={{
      albums, 
      currentAlbum, findCurrentAlbum,
      currentSong, findCurrentSong,
      handleSongs
    }}>
      <>
        <AudioPlayer />
        {
          isLoading && <Loading/>
        }
      </>
    </AudioContext.Provider>
  );
}

export default App;

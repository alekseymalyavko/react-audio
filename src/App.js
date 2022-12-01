import React, { useState, useEffect } from 'react';
import AudioContext from './context/context';
import AudioPlayer from './AudioPlayer';
import Loading from './components/Loading/Loading';

import DATA from './assets/data/data.json'

const initial = {};

const App = () => {
  const [isLoading, setIsLoading] = useState(false);

  const [albums, setAlbums] = useState([]);
  const [currentAlbum, setCurrentAlbum] = useState(initial);
  const [currentSong, setCurrentSong] = useState(initial);

  const findCurrentAlbum = (id) => {
    const currentAlbum = albums.find(item => item.id === id);
    setCurrentSong(initial);
    setCurrentAlbum(currentAlbum);
  }

  const findCurrentSong = (id) => {
    const prevSong = currentSong?.id;
    const song = currentAlbum.songs.find(item => item.id === id);
    
    const state = prevSong === song.id ? initial : song;
    setCurrentSong(state);
  }

  const handleSongs = (isStop) => {
    if (isStop) {
      setCurrentSong(initial);
    } else {
      setCurrentSong(currentAlbum.songs[0]);
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

import React, { useContext } from 'react';
import AudioContext from "../../context/context";

import styles from "./album.module.css"

export default function Album({ album }) {
  const { findCurrentAlbum } = useContext(AudioContext);

  return (
    <div className={styles.album} onClick={() => findCurrentAlbum(album.id)}>
      <img className={styles.albumImage} src={album.imageSrc} alt=""/>
      <h5 className={styles.albumTitle}>{album.title}</h5>
      <p className={styles.albumDescr}>{album.description}</p>
    </div>
  )
}
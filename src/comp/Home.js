import styles from '../css/home.module.css'
import React, { useState, useEffect } from 'react';

export default function Home() {

  const texts = ['세상을 여행하는 듯한 실시간 지도 체험', '世界を旅するようなリアルタイム指導体験', 'Real-time map experience as if traveling the world', '仿佛环游世界的实时地图体验', 'Expérience cartographique en temps réel comme si vous parcouriez le monde', 'Experiencia de mapas en tiempo real como si viajaras por el mundo', 'Echtzeit-Kartenerlebnis, als ob Sie um die Welt reisen würden'];
  const [currentTextIndex, setCurrentTextIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTextIndex((prevIndex) => (prevIndex + 1) % texts.length);
    }, 1000);

    return () => clearInterval(interval);
  }, [texts.length]);

  
  return(
      <div>
        <div className={styles.slider}>
          <img src="1.jpg" alt="" />
          <img src="2.png" alt="" />
          <p>{texts[currentTextIndex]}</p>
        </div>
    </div>
  )
}
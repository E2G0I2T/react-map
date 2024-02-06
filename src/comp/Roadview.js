import React, { useEffect } from 'react';
import styles from '../css/roadview.module.css'

const Roadview = () => {
  useEffect(() => {
    const mapCenter = new window.kakao.maps.LatLng(35.49574813011113, 129.4158721726329);

    const mapOption = {
      center: mapCenter,
      level: 3,
    };

    const map = new window.kakao.maps.Map(document.getElementById('map'), mapOption);
    map.addOverlayMapTypeId(window.kakao.maps.MapTypeId.ROADVIEW);

    const rvContainer = document.getElementById('roadview');
    const rv = new window.kakao.maps.Roadview(rvContainer);
    const rvClient = new window.kakao.maps.RoadviewClient();

    toggleRoadview(mapCenter);

    const markImage = new window.kakao.maps.MarkerImage(
      'https://t1.daumcdn.net/localimg/localimages/07/2018/pc/roadview_minimap_wk_2018.png',
      new window.kakao.maps.Size(26, 46),
      {
        spriteSize: new window.kakao.maps.Size(1666, 168),
        spriteOrigin: new window.kakao.maps.Point(705, 114),
        offset: new window.kakao.maps.Point(13, 46),
      }
    );

    const rvMarker = new window.kakao.maps.Marker({
      image: markImage,
      position: mapCenter,
      draggable: true,
      map: map,
    });

    window.kakao.maps.event.addListener(rvMarker, 'dragend', function (mouseEvent) {
      const position = rvMarker.getPosition();
      toggleRoadview(position);
    });

    window.kakao.maps.event.addListener(map, 'click', function (mouseEvent) {
      const position = mouseEvent.latLng;
      rvMarker.setPosition(position);
      toggleRoadview(position);
    });

    function toggleRoadview(position) {
      rvClient.getNearestPanoId(position, 50, function (panoId) {
        if (panoId === null) {
          rvContainer.style.display = 'none';
          map.relayout();
        } else {
          map.relayout();
          rvContainer.style.display = 'block';
          rv.setPanoId(panoId, position);
          rv.relayout();
        }
      });
    }
  }, []);

  return (
    <div className={styles.roadview}>
      <div className="map_wrap">
        <div id="mapWrapper" style={{ width: '50%', height: '500px', float: 'left' }}>
          <div id="map" style={{ width: '100%', height: '100%' }}></div>
        </div>
        <div id="rvWrapper" style={{ width: '50%', height: '500px', float: 'left' }}>
          <div id="roadview" style={{ width: '100%', height: '100%' }}></div>
        </div>
      </div>
    </div>
  );
};

export default Roadview;

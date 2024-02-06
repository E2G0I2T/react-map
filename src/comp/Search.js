import React, { useEffect } from 'react';
import styles from '../css/search.module.css'

const Search = () => {
  useEffect(() => {
    const loadMap = () => {
      const mapContainer = document.getElementById('map');
      const options = {
        center: new window.kakao.maps.LatLng(35.49574813011113, 129.4158721726329),
        level: 3,
      };
      const map = new window.kakao.maps.Map(mapContainer, options);

      const ps = new window.kakao.maps.services.Places();

      const keywordSearch = () => {
        const keyword = document.getElementById('keyword').value;
      
        if (!keyword.replace(/^\s+|\s+$/g, '')) {
          alert('키워드를 입력해주세요!');
          return false;
        }
      
        const mapBounds = map.getBounds();
        const swLatLng = mapBounds.getSouthWest();
        const neLatLng = mapBounds.getNorthEast();
        const searchOptions = {
          bounds: new window.kakao.maps.LatLngBounds(swLatLng, neLatLng),
        };
      
        ps.keywordSearch(keyword, placesSearchCallback, searchOptions);
      };

      const placesSearchCallback = (data, status, pagination) => {
        if (status === window.kakao.maps.services.Status.OK) {
          displayPlaces(data);
          displayPagination(pagination);
        } else if (status === window.kakao.maps.services.Status.ZERO_RESULT) {
          alert('검색 결과가 존재하지 않습니다.');
        } else if (status === window.kakao.maps.services.Status.ERROR) {
          alert('검색 결과 중 오류가 발생했습니다.');
        }
      };

      const displayPlaces = (places) => {
        const listEl = document.getElementById('placesList');
        const bounds = new window.kakao.maps.LatLngBounds();

        removeAllChildNodes(listEl);

        for (let i = 0; i < places.length; i++) {
          const placePosition = new window.kakao.maps.LatLng(places[i].y, places[i].x);
          const marker = addMarker(placePosition, i);
          const itemEl = getListItem(i, places[i]);

          bounds.extend(placePosition);

          (function (marker, title) {
            window.kakao.maps.event.addListener(marker, 'mouseover', function () {
              displayInfowindow(marker, title);
            });

            window.kakao.maps.event.addListener(marker, 'mouseout', function () {
              infowindow.close();
            });

            itemEl.onmouseover = function () {
              displayInfowindow(marker, title);
            };

            itemEl.onmouseout = function () {
              infowindow.close();
            };
          })(marker, places[i].place_name);

          listEl.appendChild(itemEl);
        }

        map.setBounds(bounds);
      };

      const addMarker = (position, idx, title) => {
        const imageSrc = 'https://t1.daumcdn.net/localimg/localimages/07/mapapidoc/marker_number_blue.png';
        const imageSize = new window.kakao.maps.Size(36, 37);
        const imgOptions = {
          spriteSize: new window.kakao.maps.Size(36, 691),
          spriteOrigin: new window.kakao.maps.Point(0, (idx * 46) + 10),
          offset: new window.kakao.maps.Point(13, 37),
        };
        const markerImage = new window.kakao.maps.MarkerImage(imageSrc, imageSize, imgOptions);
        const marker = new window.kakao.maps.Marker({
          position: position,
          image: markerImage,
        });

        marker.setMap(map);

        return marker;
      };

      const displayInfowindow = (marker, title) => {
        const content = `<div style="padding:5px;z-index:1;">${title}</div>`;
        infowindow.setContent(content);
        infowindow.setPosition(marker.getPosition());
        infowindow.open(map, marker);
      };

      const displayPagination = (pagination) => {
        const paginationEl = document.getElementById('pagination');
        const fragment = document.createDocumentFragment();
        const startingPage = pagination.current > 3 ? pagination.current - 2 : 1;
        const lastPage = startingPage + 4 > pagination.last ? pagination.last : startingPage + 4;

        removeAllChildNodes(paginationEl);

        for (let i = startingPage; i <= lastPage; i++) {
          const el = document.createElement('a');
          el.href = '#';
          el.innerHTML = i;

          if (i === pagination.current) {
            el.className = 'on';
          } else {
            el.onclick = function () {
              pagination.gotoPage(i);
            };
          }

          fragment.appendChild(el);
        }

        paginationEl.appendChild(fragment);
      };

      const removeAllChildNodes = (parent) => {
        while (parent.firstChild) {
          parent.removeChild(parent.firstChild);
        }
      };

      const getListItem = (index, place) => {
        const el = document.createElement('li');
        const itemStr = `
          <span class="markerbg marker_${index + 1}"></span>
          <div class="info">
              <h5>${place.place_name}</h5>
              <span>${place.address_name}</span>
          </div>
        `;

        el.innerHTML = itemStr;
        el.className = 'item';

        return el;
      };

      const infowindow = new window.kakao.maps.InfoWindow({ zIndex: 1 });

      document.getElementById('keywordSearchBtn').addEventListener('click', keywordSearch);
      document.getElementById('keyword').addEventListener('keypress', function (e) {
        if (e.key === 'Enter') {
          keywordSearch();
        }
      });
    };

    if (window.kakao && window.kakao.maps) {
      // Kakao Maps API가 이미 로드되었으면 지도를 생성
      loadMap();
    } else {
      // Kakao Maps API가 로드되지 않았으면 스크립트 동적으로 로드
      const script = document.createElement('script');
      script.src = 'https://dapi.kakao.com/v2/maps/sdk.js?appkey=		17c789c8020e75ba5b3ca1aaf8604c1a&autoload=false';
      document.head.appendChild(script);

      script.onload = () => {
        // 스크립트 로드 완료 시 지도 생성
        window.kakao.maps.load(() => {
          loadMap();
        });
      };
    }
  }, []);

  return (
    <div className={styles.search}>
      <div id="map" style={{ width: '100%', height: '400px' }} className={styles.map}></div>
      <input type="text" id="keyword" placeholder="장소를 입력하세요" />
      <button id="keywordSearchBtn">검색</button>
      <div id="menu_wrap" className={styles.wrap}>
        <ul id="placesList"></ul>
        <div id="pagination"></div>
      </div>
    </div>
  );
};

export default Search;

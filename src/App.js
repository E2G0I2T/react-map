import {BrowserRouter, Routes, Route, Link} from 'react-router-dom'
import Home from "./comp/Home"
import Footer from './comp/Footer'
import Search from './comp/Search'
import Roadview from './comp/Roadview'
import styles from './css/home.module.css'

function App() {

  return (
    <div className={styles.home}>
      <div>
      <BrowserRouter>
        <div className={styles.menu}>
          <Link to="/">Map<span className="material-icons">pin_drop</span>Archive</Link>
          <Link to="/search">지도 검색</Link>
          <Link to="/roadview">로드뷰</Link>
        </div>
        <Routes>
          <Route path="/"  element={<Home/>}></Route>
          <Route path="/search" element={<Search/>}></Route>
          <Route path="/roadview" element={<Roadview/>}></Route>
        </Routes>
      </BrowserRouter>
      </div>
      
        <div className={styles.footer}>
          <Footer />
        </div>
    </div>
  );
}

export default App;

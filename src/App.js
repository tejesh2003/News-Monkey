import './App.css';
import React, { useState} from 'react';
import {
  BrowserRouter as Router,
  Routes,
  Route
} from 'react-router-dom';
import HomePage from './pages/HomePage';
import NavBar from './components/NavBar';
import News from './components/News';
import LoadingBar from 'react-top-loading-bar';

const App = () => {
  const [country, setCountry] = useState("in");
  const [search,setSearch]=useState('');
  const init_mode = 'mode';
  const bg_col = 'bg_color';
  const [mode, setMode] = useState(localStorage.getItem(init_mode)?localStorage.getItem(init_mode):'primary');
  document.body.style.backgroundColor =localStorage.getItem(bg_col)?localStorage.getItem(bg_col):'';
  const [progress, setProgress] = useState(0);
  const toggleMode = () => {
    if (mode === 'primary') {
      localStorage.clear();
      setMode('dark');
      localStorage.setItem(init_mode,'dark');
      localStorage.setItem(bg_col,'#6c757d');
      document.body.style.backgroundColor = bg_col;
    } else {
      localStorage.clear();
      setMode('primary');
      localStorage.setItem(init_mode,'primary');
      localStorage.setItem(bg_col,'');
      document.body.style.backgroundColor = bg_col;
    }
  };

  return (
    <div>
      <Router>
        <NavBar mode={mode} toggleMode={toggleMode} country={country} setCountry={setCountry} setSearch={setSearch} search={search}/>
        <LoadingBar
          color='#f11946'
          progress={progress}
        />
        <Routes>
        <Route
            exact
            path='/'
            element={<HomePage mode={mode}/>} 
          />
          <Route
            exact
            path='/:country'
            element={<News setProgress={setProgress} search={search} key="1" mode={mode} pageSize={6} country={country} category="general"  />}
          />
          <Route
            exact
            path='/:country/business'
            element={<News setProgress={setProgress} search={search} key="2" mode={mode} pageSize={6} country={country} category="business"  />}
          />
          <Route
            exact
            path='/:country/entertainment'
            element={<News setProgress={setProgress} search={search} key="3" mode={mode} pageSize={6} country={country} category="entertainment"  />}
          />
          <Route
            exact
            path='/:country/general'
            element={<News setProgress={setProgress} search={search} key="4" mode={mode} pageSize={6} country={country} category="general"  />}
          />
          <Route
            exact
            path='/:country/health'
            element={<News setProgress={setProgress} search={search} key="5" mode={mode} pageSize={6} country={country} category="health"  />}
          />
          <Route
            exact
            path='/:country/science'
            element={<News setProgress={setProgress} search={search} key="6" mode={mode} pageSize={6} country={country} category="science"  />}
          />
          <Route
            exact
            path='/:country/sports'
            element={<News setProgress={setProgress} search={search} key="7" mode={mode} pageSize={6} country={country} category="sports"  />}
          />
          <Route
            exact
            path='/:country/technology'
            element={<News setProgress={setProgress} search={search} key="8" mode={mode} pageSize={6} country={country} category="technology"  />}
          />
        </Routes>
      </Router>
    </div>
  );
};

export default App;

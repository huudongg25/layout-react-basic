import './App.css';
import { Route, Routes } from 'react-router-dom';
import RequireAuth from './components/RequireAuth';
function App() {

  return (
    <div className="App">
      <Routes>
        <Route path='/login' element={
          <div>
            <h1>Trang Login</h1>
            <p>Dùng useEffect xoá hết thông tin trong localStorage và gọi api logout</p>
          </div>
        } />
        <Route element={<RequireAuth />}>
          <Route path='/' element={<h1>Trang chủs</h1>} />
        </Route>
      </Routes>
    </div>
  );
}

export default App;

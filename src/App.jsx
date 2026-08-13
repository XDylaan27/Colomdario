import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import Login from './pages/Login';
import Register from './pages/Register';
import SelectMonth from './pages/SelectMonth';
import Calendar from './pages/Calendar';
import Profile from './pages/Profile';
import Holidays from './pages/Holidays';

function App() {
  return (
    <Router>
      <Routes>
        {/* Auth routes without Layout */}
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<Register />} />
        
        {/* App routes with Layout */}
        <Route element={<Layout />}>
          <Route path="/select-month" element={<SelectMonth />} />
          <Route path="/calendar" element={<Calendar />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/holidays" element={<Holidays />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;

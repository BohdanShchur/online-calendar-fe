import Login from "./components/login";
import Calendar from './components/calendar';
import { Routes, Route, Navigate } from "react-router-dom";
import './static/css/global.css';
// import './App.css';
import React from 'react';
import AuthProvider from "./utils/authProvider";
import RequireAuth from "./components/requireAuth";
import Register from "./components/register";

function App() {
  const [selectedDate, setSelectedDay] = React.useState(new Date());
  
  return (
    <div className="app__container">
      <AuthProvider>
        <Routes>
          <Route exact path="/" element={<Navigate replace to="/login" />} />
          <Route exact path='/login' element={<Login />} />
          <Route exact path='/register' element={<Register />} />
          <Route path='/calendar' element={
            <RequireAuth>
              <Calendar selectedDate={selectedDate} selectDate={(date) => setSelectedDay(date)} />
            </RequireAuth>
          } />
        </Routes>
      </AuthProvider>
    </div>
  );
}

export default App;

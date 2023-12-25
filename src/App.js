import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Reports from './components/reports';
import { ReportDatas } from './feature/mock/db';
import Details from './components/Detail'
import Details2 from './components/Details2'
import Login from './components/Logın';
function App() {
  return (
    // <div>
    //   <Reports data={ReportDatas}/>
    // </div>
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/home" element={<Reports data={ReportDatas} />} />
        <Route path="/details/:id" element={<Details data={ReportDatas} />} />
        <Route path="/details/:id/:id" element={<Details2 data={ReportDatas} />} />
      </Routes>
    </Router>
  );
}

export default App;





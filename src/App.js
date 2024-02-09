// src/App.js
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import Dashboard from './pages/Dashboard';
import Items from './pages/Items';
import Item from './pages/ItemDetails';
import Reports from './pages/Reports';
import SomeList from './pages/SomeList';
import SideBar from "./components/Sidebar";
import CalendarItems from './pages/CalendarItems';
import ReportTwo from './pages/reports/ReportTwo';
import ReportOne from './pages/reports/ReportOne';
import ReportThree from './pages/reports/ReportThree';


function App() {
  return (
    <Router>
      <div className="App">
        <SideBar pageWrapId={"page-wrap"} outerContainerId={"App"} />
        <main>
          <Routes>
            <Route path="/" element={<Dashboard />} />
            
            <Route path="/items" element={<Items />} />
            <Route path="/item/:id" element={<Item />} />
            
            <Route path="/calendaritems" element={<CalendarItems />} />
            
            <Route path="/reports" element={<Reports />} />
            <Route path="/one" element={<ReportOne />} />
            <Route path="/two" element={<ReportTwo />} />
            <Route path="/three" element={<ReportThree />} />
                        
            <Route path="/somelist" element={<SomeList />} />

          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;

import React from 'react';
import {Route, Routes} from 'react-router-dom';
import './App.css';
import {Service} from "./components/Service/Service";
import {Vacancy} from "./components/Vacancy/Vacancy";
import {Nav} from "./components/Nav/Nav";
import {NotFound} from "./components/NotFound/NotFound";

function App() {
    return (
        <div className="App">
            <Routes>
                <Route path={"/"} element={<Nav/>}/>
                <Route path={"service"} element={<Service/>}/>
                <Route path={"vacancy"} element={<Vacancy/>}/>
                <Route path={"*"} element={<NotFound/>}/>
            </Routes>
        </div>
    );
}

export default App;

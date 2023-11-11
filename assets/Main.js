import React from 'react';
import './App.css';
import Header from './components/Header';
import {Routes, Route, BrowserRouter} from 'react-router-dom';
import Home from './pages/Home';
import './scss/app.scss';
import NotFound from './pages/NotFound';
import Cart from './pages/Cart';
import { createContext, useState } from 'react';
import AuthPage from './pages/AuthPage';
import {Provider} from "react-redux";
import {store} from "./Redux/store";
import { createRoot } from "react-dom/client";
import Cookies from "universal-cookie";
import Rooms from "./pages/Rooms";
export const SearchContext = createContext();
export const SessionContext = createContext();


function Main() {
    const [searchValue, setSearchValue] = useState('');
    const [sessionValue, setSessionValue] = useState('No user');
    const cookies = new Cookies();
    if (sessionValue === 'No user' && cookies.get('user')) setSessionValue(cookies.get('user'));
    return (
        <div className="wrapper">
            <SessionContext.Provider value={{ sessionValue, setSessionValue }}>
                <SearchContext.Provider value={{ searchValue, setSearchValue }}>
                    <Header />
                    <div className="content">
                        <Routes>
                            <Route path="/" element={<Home />} />
                            <Route path="/auth" element={<AuthPage />} />
                            <Route path="/cart" element={<Cart />} />
                            <Route path="/hotel/:id/rooms" element={<Rooms />} />
                            <Route path="*" element={<NotFound />} />
                        </Routes>
                    </div>
                </SearchContext.Provider>
            </SessionContext.Provider>
        </div>
    );
}

export default Main;

if (document.getElementById('app')) {
    const rootElement = document.getElementById("app");
    const root = createRoot(rootElement);

    root.render(
            <BrowserRouter>
                <Provider store={store}>
                    <Main />
                </Provider>
            </BrowserRouter>
     );
}

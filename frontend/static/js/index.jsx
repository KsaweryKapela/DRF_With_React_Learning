import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

const RenderToDos = React.lazy(() => import("./components/ToDos/RenderToDos"));
const RenderRegister = React.lazy(() => import("./components/Register/RenderRegister"));
const RenderLogin = React.lazy(() => import("./components/Login/RenderLogin"));



const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
      <Router>
        <Routes>
            <Route path="/" element={<RenderToDos/>} />
            <Route path="/register" element={<RenderRegister/>} />
            <Route path="/login" element={<RenderLogin/>} />
        </Routes>
      </Router>
)

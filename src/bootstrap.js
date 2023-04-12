import React from 'react';
import ReactDOM from 'react-dom/client';
// import './index.css';
// import App from './App';
import {
    createBrowserRouter,
    RouterProvider,
} from "react-router-dom";
// import reportWebVitals from './reportWebVitals';

const Qw=React.lazy(()=>import('./App'))

const router = createBrowserRouter([
    {
        // path: "/app",
        path: "/",
        element: <Qw/>
    },
    {
        // path: "/app",
        path: "/chats",
        element: <Qw/>
    },
    // {
    //     path: "/1",
    //     element: <div>kekw</div>,
    // },
    // {
    //     path: "/",
    //     element: <div>Hello world!</div>,
    // },
]);

const root = ReactDOM.createRoot(document.getElementById('root'));
// root.render(
//   <React.StrictMode>
//       <RouterProvider router={router} />
//   </React.StrictMode>
// );

root.render(
       <Qw></Qw>
    // <RouterProvider router={router} />
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
// reportWebVitals();

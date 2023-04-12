// import logo from './logo.svg';
// import './App.css';

import React from 'react'
import MicroFrontend from "./Microfrontend";


// const Button0 = React.lazy(
//     () => import('MFE0/Button')
// );
//
// const Button4 = React.lazy(
//     () => import('MFE4/Button')
// );
//
// const Button1 = React.lazy(
//     () => import('MFE1/Button')
// );

const TodoApp = React.lazy(
    () => import('Omni/WrapperApp')
);


const ButtonCustom = ({history}) => (
    <MicroFrontend history={history} host={'localhost:8090'} name="CustomApp"/>
);

function App() {
    return (
        <div>

            <h1>MFE2</h1>
            <div>

                <React.Suspense fallback='Loading Button'>
                    {/*<ButtonCustom/>*/}
                    {/*<Button1/>*/}
                    {/*<Button0/>*/}
                    {/*<Button4/>*/}
                    <TodoApp />
                </React.Suspense>
            </div>
            <h2>MFE2</h2>
        </div>
    );
}

export default App;

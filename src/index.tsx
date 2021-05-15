import React from 'react';
import ReactDOM from 'react-dom';

import reportWebVitals from './reportWebVitals';

import { Application } from './Application';
import { IDeck } from './structures/IDeck';

const DATA: IDeck[] = [
    {
        name: "시험명",
        children: ["Nothing", "Everything"].map(name => ({ name }))
    },
    {
        name: "시험구",
        children: ["서울", "부산", "강원도"].map(name => ({ name }))
    }
]

ReactDOM.render
(
    <React.StrictMode>
        <Application decks={DATA} />
    </React.StrictMode>,
    document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();

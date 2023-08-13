import { useState } from 'react';

import HelpBox from './components/HelpBox/HelpBox';
import InputBox from './components/InputBox';

import ListItem from './types/ListItem';

import './App.css';
import OutputList from './components/OutputList';
import KeyHandler from './handlers/KeyHandler';

function App() {
    const [list, setList] = useState<ListItem[]>([]);
    const [value, setValue] = useState<string>('0');

    return (
        <>
            <KeyHandler
                list={list}
                setList={setList}
                value={value}
                setValue={setValue}
            />
            <div
                className="container"
            >
                <h1
                    className="hidden"
                >
                    Printing Calculator
                </h1>
                <HelpBox />
                <div
                    className="main"
                >
                    <InputBox
                        value={value}
                    />
                    <OutputList
                        list={list}
                    />
                </div>
            </div>
        </>
    );
}

export default App;

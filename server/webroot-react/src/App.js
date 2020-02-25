import React, { useState } from 'react';
import './App.css';
import { LoginForm } from './components/LoginForm/LoginForm';
import VideoStream from './components/VideoStream/VideoStream';
import { AppContextProvider } from './context/AppContext';
import Animator from './components/UI/Animator/Animator'
import Menu from './components/Menu/Menu';

function App() {

    const [password, setPassword] = useState(null);

    const submitHandler = (pass) => {
        setPassword(pass);
    }

    const showLoginForm = (password === null);

    return (
        <div className="App">

            <AppContextProvider>

                <Animator show={showLoginForm}>
                    <LoginForm submit={submitHandler} />
                </Animator>

                <Animator show={!showLoginForm}>
                    <VideoStream
                        pin={password}
                        serverUrl={process.env.REACT_APP_JANUS_SERVER_URL} />
                </Animator>

                <Menu />

            </AppContextProvider>

        </div>
    );
}

export default App;

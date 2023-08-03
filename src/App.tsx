import { observer } from 'mobx-react-lite';
import React, { useContext, useEffect } from 'react';
import { Context } from '.';
import './App.css';
import LoginForm from './components/LoginForm';

function App() {
    const { store } = useContext(Context);

    useEffect(() => {
        if (localStorage.getItem('token')) {
            store.checkAuth()
        }
    }, [])

    if (store.isLoading) {
        return (
            <div className="App">
                <header className="App-header">
                    Загрузка...
                </header>
            </div>
        );
    }

    if (!store.isAuth) {
        return (
            <div className="App">
                <header className="App-header">
                    <LoginForm />
                </header>
            </div>
        );
    }

    return (
        <div className="App">
            <header className="App-header">
                Приветствуем!
                <button onClick={() => store.logout()} >
                    Выйти
                </button>
            </header>
        </div>
    );
}

export default observer(App);

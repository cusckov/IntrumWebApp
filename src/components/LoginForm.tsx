import React, { FC, useContext, useState } from 'react';
import { Context } from '..';

const LoginForm: FC = () => {
    const [userName, setUserName] = useState<string>('')
    const [password, setPassword] = useState<string>('')

    const { store } = useContext(Context);
    return (
        <div>
            <input
                onChange={e => setUserName(e.target.value)}
                placeholder='Username'
                type='text'
                value={userName}
            />
            <input
                onChange={e => setPassword(e.target.value)}
                placeholder='Password'
                type='password'
                value={password}
            />
            <button onClick={() => store.login(userName, password)}>
                Логин
            </button>

            <button onClick={() => store.registration(userName, password)}>
                Регистрация
            </button>
        </div>
    );
};

export default LoginForm;
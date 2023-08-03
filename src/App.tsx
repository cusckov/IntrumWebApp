import { observer } from 'mobx-react-lite';
import React, { useContext, useEffect, useState } from 'react';
import { Context } from '.';
import './App.css';
import LoginForm from './components/LoginForm';
import { IProduct } from './models/IProduct';
import ProductService from './services/ProductService';

function App() {
    const { store } = useContext(Context);
    const [products, setProducts] = useState<IProduct[]>([] as IProduct[]);

    useEffect(() => {
        if (localStorage.getItem('token')) {
            store.checkAuth()
        }
    }, [])

    const getProducts = async () => {
        try {
            const response = await ProductService.fetchProducts();
            setProducts(response.data)
        } catch (e) {
            console.log(e)
        }
    }

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
                Приветствуем {store.isAuth ? `${store.user.userName}` : ``}!
                <button onClick={() => store.logout()} >
                    Выйти
                </button>
                <button onClick={getProducts} >
                    Получить продукты
                </button>
                {products.map(product => {
                    return (
                        <div key={product.id}>{product.name}</div>
                    )
                })}
            </header>
        </div>
    );
}

export default observer(App);

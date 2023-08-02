import { AxiosError } from "axios";
import { makeAutoObservable } from "mobx";
import { IUser } from "../models/IUser";
import { AuthRequest } from "../models/request/AuthRequest";
import { RegRequest } from "../models/request/RegRequest";
import AuthService from "../services/AuthService";

export default class Store {
    user = {} as IUser;
    isAuth = false;

    constructor() {
        makeAutoObservable(this);
    }

    setAuth(value: boolean) {
        this.isAuth = value;
    }

    setUser(user: IUser) {
        this.user = user;
    }

    async login(userName: string, password: string) {
        try {
            const response = await AuthService.login({ userName, password } as AuthRequest);
            console.log(response);
            localStorage.setItem('token', response.data.tokens.accessToken);
            this.setAuth(true);
            this.setUser(response.data.user);
        } catch (e) {
            if (e instanceof AxiosError) {
                console.log(e.response?.data?.message);
            }
        }
    }

    async registration(userName: string, password: string) {
        try {
            const response = await AuthService.registration({ userName, password } as RegRequest);
            console.log(response);
            this.setAuth(false);
            this.setUser({} as IUser);
        } catch (e) {
            if (e instanceof AxiosError) {
                console.log(e.response?.data?.message);
            }
        }
    }

    async logout(userName: string, password: string) {
        try {
            const response = await AuthService.registration({ userName, password } as RegRequest);
            console.log(response);
            localStorage.removeItem('token');
            this.setAuth(false);
            this.setUser({} as IUser);
        } catch (e) {
            if (e instanceof AxiosError) {
                console.log(e.response?.data?.message);
            }
        }
    }
}
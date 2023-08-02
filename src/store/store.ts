import axios, { AxiosError } from "axios";
import { makeAutoObservable } from "mobx";
import { API_URL } from "../http";
import { IUser } from "../models/IUser";
import { AuthRequest } from "../models/request/AuthRequest";
import { RegRequest } from "../models/request/RegRequest";
import { AuthResponse } from "../models/response/AuthResponse";
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

    async login(UserName: string, Password: string) {
        try {
            const response = await AuthService.login({ UserName, Password } as AuthRequest);
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

    async registration(UserName: string, Password: string) {
        try {
            const response = await AuthService.registration({ UserName, Password } as RegRequest);
            console.log(response);
            this.setAuth(false);
            this.setUser({} as IUser);
        } catch (e) {
            if (e instanceof AxiosError) {
                console.log(e.response?.data?.message);
            }
        }
    }

    async logout() {
        try {
            const response = await AuthService.logout();
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

    async checkAuth() {
        try {
            const response = await axios.get<AuthResponse>(`${API_URL}/account/refresh`, { withCredentials: true })
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
}
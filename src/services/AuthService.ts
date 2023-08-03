import $api from '../http';
import { AxiosResponse } from 'axios'
import { AuthResponse } from '../models/response/AuthResponse';
import { AuthRequest } from '../models/request/AuthRequest';
import { RegResponse } from '../models/response/RegResponse';
import { RegRequest } from '../models/request/RegRequest';

export default class AuthService {
    static async login(request: AuthRequest): Promise<AxiosResponse<AuthResponse>> {
        return $api.post<AuthResponse>(`/account/login`, request)
    }

    static async registration(request: RegRequest): Promise<AxiosResponse<RegResponse>> {
        return $api.post<RegResponse>(`/account/register`, request)
    }

    static async logout(): Promise<AxiosResponse<void>> {
        return $api.get(`/account/logout`)
    }
}
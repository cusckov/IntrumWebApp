import $api from '../http';
import { AxiosResponse } from 'axios'
import { IProduct } from '../models/IProduct';


export default class ProductService {
    static async fetchProducts(): Promise<AxiosResponse<IProduct[]>> {
        return $api.get<IProduct[]>(`/product/all-products`)
    }
}
import { IErrors } from "../IErrors";
import { IUser } from "../IUser";

export interface RegResponse {
    user: IUser;
    errors: IErrors[];
}
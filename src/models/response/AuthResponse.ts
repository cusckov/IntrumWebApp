import { IErrors } from "../IErrors";
import { ITokens } from "../ITokens";
import { IUser } from "../IUser";

export interface AuthResponse {
    user: IUser;
    tokens: ITokens;
    errors: IErrors[];
}
import jwt from 'jsonwebtoken';
import {settings} from "../settings";

export const jwtService = {
    async createJWT(user: any): Promise<any> {
        const accessToken = jwt.sign({userId: user._id}, settings.JWT_SECRET, {expiresIn: "2m"});
        const refreshToken = jwt.sign({userId: user._id}, settings.JWT_SECRET, {expiresIn: "10m"});
        return {accessToken, refreshToken};
    },

    async getUserIdByToken(token: string) {
        try {
            const result: any = jwt.verify(token, settings.JWT_SECRET);
            // return new ObjectId(result.userId);
            return result.userId;
        } catch (error) {
            return null;
        }
    }
}
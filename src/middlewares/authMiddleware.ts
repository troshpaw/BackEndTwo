import {NextFunction} from 'express';
import {Request, Response} from 'express';
import {HTTP_STATUSES} from '../utils';
import {jwtService} from "../application/jwtService";
import {usersService} from "../domain/usersService";

export const authMiddleware =
    async (req: any, res: Response, next: NextFunction) => {
        if (!req.headers.authorization) {
            res.send(HTTP_STATUSES.UNAUTHORIZED_401);
        }

        const token = req.headers.authorization.split(' ')[1];

        const userId = await jwtService.getUserIdByToken(token);

        if (userId) {
            req.body.user = await usersService.findUserByUserId(userId);
            next();
        } else {
            res.send(HTTP_STATUSES.UNAUTHORIZED_401);
        }
    }
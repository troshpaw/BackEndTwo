import {Request, Response, Router} from 'express';
import {usersService} from "../domain/usersService";
import {HTTP_STATUSES} from '../utils';
import {RequestWithBody, RequestWithParams} from "../types/types";
import {CreatUserRequestType, GetUserWithParamsRequestType} from "../types/usersTypes";
import {jwtService} from '../application/jwtService';

export const authRouter = Router({});

authRouter.post('/signup',
    async (req: RequestWithBody<CreatUserRequestType>, res: Response) => {
        const result: boolean =
            await usersService.createUser(req.body.login, req.body.email, req.body.password);

        if (!result) {
            res.send(HTTP_STATUSES.NO_CONTENT_204);
        } else {
            res.send(HTTP_STATUSES.CREATED_201);
        }
    }
)

authRouter.post('/login',
    async (req, res) => {
        const loginedUser =
            await usersService.checkCredentials(req.body.loginOrEmail, req.body.password);

        if (!loginedUser) {
            res.send(HTTP_STATUSES.UNAUTHORIZED_401);
        } else {
            const tokenPair = await jwtService.createJWT(loginedUser);
            res.status(HTTP_STATUSES.OK_200).json(tokenPair);
        }
    }
)

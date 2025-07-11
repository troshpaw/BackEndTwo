import { Request, Response, Router } from 'express';
import { usersService } from "../domain/usersService";
import { HTTP_STATUSES } from '../utils';
import { RequestWithBody, RequestWithParams } from "../types/types";
import { CreatUserRequestType, GetUserWithParamsRequestType } from "../types/usersTypes";
import { UserType } from "../types/usersTypes";

export const usersRouter = Router({});

usersRouter.get('/',
    async (req: Request, res: Response) => {
        const allUsers: UserType[] = await usersService.findAllUsers();
        res.status(HTTP_STATUSES.OK_200).json(allUsers);
    }
)

usersRouter.get('/:id',
    async (req: RequestWithParams<GetUserWithParamsRequestType>, res: Response) => {
        const user: UserType | undefined = await usersService.findUserByUserId(req.params.id);

        if (!user) {
            res.sendStatus(HTTP_STATUSES.NOT_FOUND_404);
        }

        res.status(HTTP_STATUSES.OK_200).json(user);
    }
)


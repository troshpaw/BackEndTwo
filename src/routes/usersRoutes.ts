import {Request, Response, Router} from 'express';
import {usersService} from "../domain/usersService";
import {HTTP_STATUSES} from '../utils';
import {RequestWithBody, RequestWithParams} from "../types/types";
import {CreatUserRequestType, GetUserWithParamsRequestType, UserViewModel} from "../types/usersTypes";

export const usersRouter = Router({});

usersRouter.get('/',
    async (req: Request, res: Response) => {
        const allUsers: UserViewModel[] = await usersService.findAllUsers();
        res.status(HTTP_STATUSES.OK_200).json(allUsers);
    }
)

usersRouter.get('/:id',
    async (req: RequestWithParams<GetUserWithParamsRequestType>, res: Response) => {
        const user: UserViewModel | undefined = await usersService.findUserByUserId(req.params.id);

        if (!user) {
            res.sendStatus(HTTP_STATUSES.NOT_FOUND_404);
        }

        res.status(HTTP_STATUSES.OK_200).json(user);
    }
)

usersRouter.post('/',
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

// usersRouter.put('/:id',
//     async (req: Request, res: Response) => {}
// )

// usersRouter.delete('/:id',
//     async (req: Request, res: Response) => {}
// )
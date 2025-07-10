import {Request, Response, Router} from 'express';
import {usersService} from "../domain/usersService";
import {HTTP_STATUSES} from '../utils';
import {RequestWithBody, RequestWithParams} from "../types/types";
import {CreateUserRequest, GetUserWithParamsRequest} from "../types/usersTypes";

export const usersRouter = Router({});

usersRouter.get('/',
    async (req: Request, res: Response) => {
        const allUsers = await usersService.findAllUsers();
        res.status(HTTP_STATUSES.OK_200).json(allUsers);
    }
)

usersRouter.get('/:id',
    async (req: RequestWithParams<GetUserWithParamsRequest>, res: Response) => {
        const user = await usersService.findUserByUserId(req.params.id);
        res.status(HTTP_STATUSES.OK_200).json(user);
    }
)

usersRouter.post('/',
    async (req: RequestWithBody<CreateUserRequest>, res: Response) => {
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
import {Request, Response} from 'express';
import {Router} from "express";
import {feedbackService} from "../domain/feedbacksService";
import {authMiddleware} from "../middlewares/authMiddleware";
import {HTTP_STATUSES} from "../utils";

export const feedbacksRouter = Router({});

feedbacksRouter.post('/', authMiddleware,
    async (req: Request, res: Response) => {
        const feedbackIsSend =
            await feedbackService.sendFeedback(req.body.comment, req.body.user);
        if (feedbackIsSend) {
            console.log('The feedback was left: ' + req.body.user.userName);
            res.send(HTTP_STATUSES.CREATED_201);
        }
    })
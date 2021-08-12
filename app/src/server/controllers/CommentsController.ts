import { Request, Response } from 'express';
import { RESPONSE_WRONG_REQUEST_DATA_TEXT, COMMENTS_PER_PAGE } from 'server/config';
import { getPagingData } from 'server/helpers/pagination';
import { Comment } from 'server/models/Comment';
import { Topic } from 'server/models/Topic';
import {
  CreateCommentRequest, DeleteCommentRequest, ReadCommentsRequest, CommentsService,
} from 'server/services/CommentsService';
import { is } from 'typescript-is';

export class CommentsController {
  public static async create(req: Request, res: Response) {
    if (!req.body || !is<CreateCommentRequest>(req.body)) {
      res
        .status(400)
        .send({ error: RESPONSE_WRONG_REQUEST_DATA_TEXT });
      return;
    }

    try {
      const response = await CommentsService.create(req.body);
      if (response.topicId) {
        // update topic's `updatedAt`
        const topic = await Topic.findByPk(response.topicId);
        topic?.touch();
      }
      res
        .status(200)
        .send(response);
    } catch (error) {
      res
        .status(500)
        .send(error);
    }
  }

  public static async delete(req: Request, res: Response) {
    if (!req.params || !is<DeleteCommentRequest>(req.params)) {
      res
        .status(400)
        .send({ error: RESPONSE_WRONG_REQUEST_DATA_TEXT });
      return;
    }

    try {
      const response = await CommentsService.delete({ id: req.params.id });
      if (response) {
        res
          .status(200)
          .send('OK');
      } else {
        res
          .status(404)
          .send('Not found');
      }
    } catch (error) {
      res
        .status(500)
        .send(error);
    }
  }

  public static async getByTopicId(req: Request, res: Response) {
    const params = {
      topicId: req.params.topicId,
      page: Number(req.query.page),
    };

    if (!is<ReadCommentsRequest>(params)) {
      res
        .status(400)
        .send({ error: RESPONSE_WRONG_REQUEST_DATA_TEXT });
      return;
    }

    try {
      const dbData = await CommentsService.request(params);

      const response = getPagingData<Comment>(dbData, Number(req.query.page) ?? 1, COMMENTS_PER_PAGE);

      res
        .status(200)
        .send(response);
    } catch (error) {
      res
        .status(500)
        .send(error);
    }
  }
}

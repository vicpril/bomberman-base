import { Request, Response } from 'express';
import { RESPONSE_WRONG_REQUEST_DATA_TEXT, TOPICS_PER_PAGE } from 'server/config';
import { getPagingData } from 'server/helpers/pagination';
import { Topic } from 'server/models/Topic';
import {
  CreateTopicRequest, DeleteTopicRequest, FindTopicRequest, ReadTopicsRequest, TopicsService,
} from 'server/services/TopicsService';
import { is } from 'typescript-is';

export class TopicsController {
  public static async create(req: Request, res: Response) {
    if (!req.body || !is<CreateTopicRequest>(req.body)) {
      res
        .status(400)
        .send({ error: RESPONSE_WRONG_REQUEST_DATA_TEXT });
      return;
    }

    try {
      const response = await TopicsService.create(req.body);
      res
        .status(200)
        .send(response);
    } catch (error) {
      res
        .status(500)
        .send(error);
    }
  }

  public static async get(req: Request, res: Response) {
    if (!req.params || !is<FindTopicRequest>(req.params)) {
      res
        .status(400)
        .send({ error: RESPONSE_WRONG_REQUEST_DATA_TEXT });
      return;
    }

    try {
      const response = await TopicsService.find({ id: req.params.id });
      res
        .status(response ? 200 : 404)
        .send(response ?? 'Not found');
    } catch (error) {
      res
        .status(500)
        .send(error);
    }
  }

  public static async delete(req: Request, res: Response) {
    if (!req.params || !is<DeleteTopicRequest>(req.params)) {
      res
        .status(400)
        .send({ error: RESPONSE_WRONG_REQUEST_DATA_TEXT });
      return;
    }

    try {
      const response = await TopicsService.delete({ id: req.params.id });
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

  public static async getAll(req: Request, res: Response) {
    if (!req.query || !is<ReadTopicsRequest>(req.query)) {
      res
        .status(400)
        .send({ error: RESPONSE_WRONG_REQUEST_DATA_TEXT });
      return;
    }

    try {
      const dbData = await TopicsService.request(req.query);

      const response = getPagingData<Topic>(dbData, Number(req.query.page) ?? 1, TOPICS_PER_PAGE);

      res
        .status(200)
        .send(response);
    } catch (error) {
      res
        .status(500)
        .send(error);
    }
  }

  public static async watch(req: Request, res: Response) {
    if (!req.params || !is<FindTopicRequest>(req.params)) {
      res
        .status(400)
        .send({ error: RESPONSE_WRONG_REQUEST_DATA_TEXT });
      return;
    }

    try {
      const topic = await Topic.findByPk(req.params.id);
      if (topic) {
        topic?.increaseViews();
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
}

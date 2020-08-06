import { Request, Response } from 'express';
import database from '../database/connection';
import convertHoursToMinutes from '../utils/convertHoursToMinutes';

interface Schedule {
  week_day: number;
  from: string;
  to: string;
}

export default class ConnectionsController {
  public async index(request: Request, response: Response) {
    try {
      const [totalConnections] = await database('connections').count(
        '* as total',
      );

      const { total } = totalConnections;

      return response.json({ total });
    } catch (error) {
      console.log(error);

      return response.status(400).json({ error: 'Something went wrong...' });
    }
  }

  public async create(request: Request, response: Response) {
    try {
      const { user_id } = request.body;

      await database('connections').insert({
        user_id,
      });

      return response.status(201).send();
    } catch (error) {
      console.log(error);

      return response.status(400).json({
        error: 'An unexpected problem happened while creating an connection',
      });
    }
  }
}

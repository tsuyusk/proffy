import { Request, Response } from 'express';
import database from '../database/connection';
import convertHoursToMinutes from '../utils/convertHoursToMinutes';

interface Schedule {
  week_day: number;
  from: string;
  to: string;
}

export default class ClassesController {
  public async index(request: Request, response: Response) {
    try {
      const filters = request.query;

      const week_day = `${filters.week_day}`;
      const subject = `${filters.subject}`;
      const time = `${filters.time}`;

      if (!week_day || !subject || !time) {
        throw new Error('Missing filters');
      }

      const timeInMinutes = convertHoursToMinutes(time);

      const classes = await database('classes')
        .whereExists(function () {
          this.select('class_schedule.*')
            .from('class_schedule')
            .whereRaw('`class_schedule`.`class_id` = `classes`.`id`')
            .whereRaw('`class_schedule`.`week_day` = ??', [Number(week_day)])
            .whereRaw('`class_schedule`.`from` <= ??', [Number(timeInMinutes)])
            .whereRaw('`class_schedule`.`to` > ??', [Number(timeInMinutes)]);
        })
        .where('classes.subject', '=', subject)
        .join('users', 'classes.user_id', '=', 'users.id')
        .select(['classes.*', 'users.*']);

      return response.json(classes);
    } catch {
      return response.status(400).json({ error: 'Something went wrong...' });
    }
  }

  public async create(request: Request, response: Response) {
    const {
      name,
      avatar,
      whatsapp,
      bio,
      subject,
      cost,
      schedule,
    } = request.body;

    const trx = await database.transaction();

    try {
      const [user_id] = await trx('users').insert({
        name,
        avatar,
        whatsapp,
        bio,
      });

      const [class_id] = await trx('classes').insert({
        subject,
        cost,
        user_id,
      });

      const classSchedule = schedule.map((schedule: Schedule) => {
        return {
          class_id,
          week_day: schedule.week_day,
          from: convertHoursToMinutes(schedule.from),
          to: convertHoursToMinutes(schedule.to),
        };
      });

      await trx('class_schedule').insert(classSchedule);

      await trx.commit();

      return response.status(201).send();
    } catch (error) {
      console.log(error);
      await trx.rollback();

      return response.status(400).json({
        error: 'An unexpected problem happened while creating an class',
      });
    }
  }
}

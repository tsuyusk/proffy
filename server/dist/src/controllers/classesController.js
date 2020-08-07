"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const connection_1 = __importDefault(require("../database/connection"));
const convertHoursToMinutes_1 = __importDefault(require("../utils/convertHoursToMinutes"));
class ClassesController {
    async index(request, response) {
        try {
            const filters = request.query;
            const week_day = `${filters.week_day}`;
            const subject = `${filters.subject}`;
            const time = `${filters.time}`;
            if (!week_day || !subject || !time) {
                throw new Error('Missing filters');
            }
            const timeInMinutes = convertHoursToMinutes_1.default(time);
            const classes = await connection_1.default('classes')
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
        }
        catch (_a) {
            return response.status(400).json({ error: 'Something went wrong...' });
        }
    }
    async create(request, response) {
        const { name, avatar, whatsapp, bio, subject, cost, schedule, } = request.body;
        const trx = await connection_1.default.transaction();
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
            const classSchedule = schedule.map((schedule) => {
                return {
                    class_id,
                    week_day: schedule.week_day,
                    from: convertHoursToMinutes_1.default(schedule.from),
                    to: convertHoursToMinutes_1.default(schedule.to),
                };
            });
            await trx('class_schedule').insert(classSchedule);
            await trx.commit();
            return response.status(201).send();
        }
        catch (error) {
            console.log(error);
            await trx.rollback();
            return response.status(400).json({
                error: 'An unexpected problem happened while creating an class',
            });
        }
    }
}
exports.default = ClassesController;

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function convertHoursToMinutes(time) {
    const [hour, minutes] = time.split(':').map(Number);
    /**
     * Same than hour.split(':').map(item => Number(Item))
     */
    const timeInMinutes = hour * 60 + minutes;
    return timeInMinutes;
}
exports.default = convertHoursToMinutes;

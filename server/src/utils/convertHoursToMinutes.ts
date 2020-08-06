export default function convertHoursToMinutes(time: string) {
  const [hour, minutes] = time.split(':').map(Number);
  /**
   * Same than hour.split(':').map(item => Number(Item))
   */

  const timeInMinutes = hour * 60 + minutes;

  return timeInMinutes;
}

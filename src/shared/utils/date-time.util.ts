import { DTO } from './dto.interface';

export class DateTimeUtil {
  static isWithinCheckInHours(currentTime: Date): boolean {
    const startHour = 8; // Assuming check-in is allowed from 8 AM
    const endHour = 10; // Assuming check-in is allowed until 10 AM
    const currentHour = currentTime.getHours();

    return currentHour >= startHour && currentHour < endHour;
  }
}
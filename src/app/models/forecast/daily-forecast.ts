import { Temperature } from './temperature';
import { WeatherIcon } from '../auto-complete/weather-icon';

export class DailyForecast {
    Date: Date;
    EpochDate: number;
    Temperature: Temperature;
    Day: WeatherIcon;
    Night: WeatherIcon;
    Sources: string[];
    MobileLink: string;
    Link: string;
}
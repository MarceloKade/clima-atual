import axios from 'axios';

const apiKey = '5686e882ddf3ae0e4f47f7f176080b5c';

export interface WeatherData {
    name: string;
    temperature: number;
    humidity: number;
    description: string;
}

export const getWeatherData = async (): Promise<WeatherData> => {
    if (navigator.geolocation) {
        const position = await new Promise<GeolocationPosition>((resolve, reject) => {
            navigator.geolocation.getCurrentPosition(resolve, reject);
        });

        const { latitude, longitude } = position.coords;
        const response = await axios.get(`https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${apiKey}`);
        const { name, main, weather } = response.data;
        const { temp, humidity } = main;
        const { description } = weather[0];

        const weatherData: WeatherData = {
            name,
            temperature: temp,
            humidity,
            description,
        };

        return weatherData;
    } else {
        throw new Error('Geolocalização não é suportada pelo navegador.');
    }
};

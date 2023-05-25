import { useEffect, useState } from 'react';
import axios from 'axios';

interface WeatherData {
    name: string;
    temperature: number;
    humidity: number;
    description: string;
}

const apiKey = '5686e882ddf3ae0e4f47f7f176080b5c';

const HomePage = () => {
    const [weatherData, setWeatherData] = useState<WeatherData | null>(null);

    useEffect(() => {
        const getLocationWeather = async () => {
            try {
                if (navigator.geolocation) {
                    navigator.geolocation.getCurrentPosition(
                        async (position) => {
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

                            setWeatherData(weatherData);
                        },
                        (error) => {
                            console.error('Erro ao obter a localização!', error);
                        }
                    );
                } else {
                    console.error('Geolocalização não é suportada pelo navegador.');
                }
            } catch (error) {
                console.error('Erro ao obter os dados do clima:', error);
            }
        };

        getLocationWeather();
    }, []);

    return (
        <div>
            {weatherData ? (
                <div>
                    <h1>{weatherData.name}</h1>
                    <p>Temperatura: {weatherData.temperature}</p>
                    <p>Umidade do ar: {weatherData.humidity}</p>
                    <p>Descrição do clima: {weatherData.description}</p>
                </div>
            ) : (
                <p>Carregando...</p>
            )}
        </div>
    );
};

export default HomePage;

"use client"
import { useEffect, useState } from 'react';
import { getWeatherData, WeatherData } from '@/app/api/home';

export default function Location() {
    const [weather, setWeather] = useState<WeatherData | null>(null);

    useEffect(() => {
        const fetchWeatherData = async () => {
            try {
                const data = await getWeatherData();
                setWeather(data);
            } catch (error) {
                console.error('Erro ao obter os dados climáticos:', error);
            }
        };

        fetchWeatherData();
    }, []);

    if (!weather) {
        return <div>Carregando...</div>;
    }

    return (
        <div className="flex flex-col items-center mt-20 text-3xl">
            <p className='text-6xl'>{weather.name}</p>
            <p>{weather.temperature}°C</p>
            <p>{weather.humidity}%</p>
            <p>{weather.description}</p>
            <p>{weather.localTime}</p>
        </div>
    );
}


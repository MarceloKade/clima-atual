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
        <div className="flex flex-col items-center mt-28 text-3xl">
            <p className="text-clamp">{weather.name}</p>
            <p className="mt-20 text-5xl">{weather.temperature}°</p>
            <div className="flex items-center justify-center w-[11em]">
                <img className="w-auto h-auto mt-20 mb-20" src={weather.imageByDescription} alt="Weather Image" />
            </div>
            <p>{weather.description}</p>
            <div className="flex items-center justify-center">
                <div className="flex items-center justify-center mt-4">
                    <div className="flex items-center justify-center w-[4em]">
                        <img className="w-[20%] h-[20%]" src="drop.png" alt="" />
                        <p>{weather.humidity}%</p>
                    </div>
                    <div className="flex items-center justify-center w-[4em]">
                        <img className="w-[20%] h-[20%]" src={weather.imageByTime} alt="Weather Image" />
                        <p>{weather.localTime}</p>
                    </div>
                </div>
            </div>
        </div>

    );
}
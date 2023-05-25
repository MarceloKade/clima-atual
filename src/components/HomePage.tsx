import { useEffect, useState } from 'react';
import { getWeatherData, WeatherData } from '@/app/api/home';

const HomePage = () => {
    const [weatherData, setWeatherData] = useState<WeatherData | null>(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const data = await getWeatherData();
                setWeatherData(data);
            } catch (error) {
                console.error('Erro ao obter os dados do clima:', error);
            }
        };

        fetchData();
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
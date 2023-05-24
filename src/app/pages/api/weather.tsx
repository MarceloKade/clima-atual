import { useEffect, useState } from 'react';
import axios from 'axios';

const apiKey = '5686e882ddf3ae0e4f47f7f176080b5c';

const getWeatherDataByCoordinates = async (latitude: number, longitude: number) => {
    try {
        const response = await axios.get(`https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${apiKey}`);
        const { name, main, weather } = response.data;
        const { temp, humidity } = main;
        const { description } = weather[0];

        console.log('Nome da cidade:', name);
        console.log('Temperatura:', temp);
        console.log('Umidade do ar:', humidity);
        console.log('Descrição do clima:', description);

    } catch (error) {
        console.error('Erro ao obter os dados do clima:', error);
    }
};

const HomePage = () => {
    useEffect(() => {
        const getLocationWeather = () => {
            if (navigator.geolocation) {
                navigator.geolocation.getCurrentPosition(
                    (position) => {
                        const { latitude, longitude } = position.coords;
                        getWeatherDataByCoordinates(latitude, longitude);
                    },
                    (error) => {
                        console.error('Erro ao obter a localização!', error);
                    }
                );
            } else {
                console.error('Geolocalização não é suportada pelo navegador.');
            }
        };

        getLocationWeather();
    }, []);

    return <div>Conteúdo da página inicial</div>;
};

export default HomePage;

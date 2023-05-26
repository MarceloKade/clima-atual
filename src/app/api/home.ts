import axios from 'axios';

const openWeatherMapApiKey = '5686e882ddf3ae0e4f47f7f176080b5c';

interface StateAbbreviations {
  [key: string]: string;
}

const stateAbbreviations: StateAbbreviations = {
  'Acre': 'AC',
  'Alagoas': 'AL',
  'Amapá': 'AP',
  'Amazonas': 'AM',
  'Bahia': 'BA',
  'Ceará': 'CE',
  'Distrito Federal': 'DF',
  'Espírito Santo': 'ES',
  'Goiás': 'GO',
  'Maranhão': 'MA',
  'Mato Grosso': 'MT',
  'Mato Grosso do Sul': 'MS',
  'Minas Gerais': 'MG',
  'Pará': 'PA',
  'Paraíba': 'PB',
  'Paraná': 'PR',
  'Pernambuco': 'PE',
  'Piauí': 'PI',
  'Rio de Janeiro': 'RJ',
  'Rio Grande do Norte': 'RN',
  'Rio Grande do Sul': 'RS',
  'Rondônia': 'RO',
  'Roraima': 'RR',
  'Santa Catarina': 'SC',
  'São Paulo': 'SP',
  'Sergipe': 'SE',
  'Tocantins': 'TO',
};

export interface WeatherData {
  name: string;
  temperature: number;
  humidity: number;
  description: string;
  state: string;
  localTime: string;
}

export const getWeatherData = async (): Promise<WeatherData> => {
  if (navigator.geolocation) {
    const position = await new Promise<GeolocationPosition>((resolve, reject) => {
      navigator.geolocation.getCurrentPosition(resolve, reject);
    });

    const { latitude, longitude } = position.coords;

    const openWeatherMapResponse = await axios.get(
      `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${openWeatherMapApiKey}`
    );
    const { name, main, weather } = openWeatherMapResponse.data;
    const { temp, humidity } = main;
    const { description } = weather[0];

    const temperatureInCelsius = Math.ceil(temp - 273.15);

    const reverseGeocodingResponse = await axios.get(
      `https://nominatim.openstreetmap.org/reverse?lat=${latitude}&lon=${longitude}&format=jsonv2`
    );
    const state = reverseGeocodingResponse.data.address.state || '';
    const stateAbbreviation = stateAbbreviations[state] || '';

    const localTimeResponse = await axios.get(
      `https://worldtimeapi.org/api/timezone/Etc/GMT-3`
    );
    const localTime = new Date(localTimeResponse.data.datetime).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

    const cityWithState = stateAbbreviation ? `${name} (${stateAbbreviation})` : name;

    const weatherData: WeatherData = {
      name: cityWithState,
      temperature: temperatureInCelsius,
      humidity,
      description,
      state,
      localTime,
    };

    return weatherData;
  } else {
    throw new Error('Geolocalização não é suportada pelo navegador.');
  }
};

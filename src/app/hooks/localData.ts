
import { useEffect, useState } from "react";
import { useSearchParams } from 'next/navigation';

type LocationData = {
    lat: string;
    lon: string;
    name: string;
    country: string;
    state: string;
    temp: number;
    weather: string;
    description: string;
    humidity: number;
    wind_speed: number;
    feels_like: number;
    pressure: number;
    icon: string;
}


export function localData() {


const searchParams = useSearchParams();
const [locationData, setLocationData] = useState<LocationData | null>(null);

useEffect(() => {
        // Extrai os parâmetros da URL
        const lat = searchParams.get('lat');
        const lon = searchParams.get('lon');
        const name = searchParams.get('name');
        const country = searchParams.get('country');
        const temp = searchParams.get('temp');
        const weather = searchParams.get('weather');
        const description = searchParams.get('description');
        const humidity = searchParams.get('humidity');
        const wind_speed = searchParams.get('wind_speed');
        const icon = searchParams.get('icon');
        const feels_like = searchParams.get('feels_like');
        const pressure = searchParams.get('pressure');
        const state = searchParams.get('state');

        if (lat && lon && name) {
            const tempNum = parseFloat(temp || '0');
            const humidityNum = parseFloat(humidity || '0');
            const windSpeedNum = parseFloat(wind_speed || '0');
            const feelsLikeNum = parseFloat(feels_like || '0');
            const pressureNum = parseFloat(pressure || '0');

            setLocationData({
                lat: lat || '',
                lon: lon || '',
                name: name || '',
                country: country || '',
                state: state || '',
                temp: isNaN(tempNum) ? 0 : tempNum,
                weather: weather || '',
                description: description || '',
                humidity: isNaN(humidityNum) ? 0 : humidityNum,
                wind_speed: isNaN(windSpeedNum) ? 0 : windSpeedNum,
                icon: icon || '',
                feels_like: isNaN(feelsLikeNum) ? 0 : feelsLikeNum,
                pressure: isNaN(pressureNum) ? 0 : pressureNum
            });

            console.log('📍 Dados da localização carregados:', {
                lat,
                lon,
                name,
                country,
                state,
                temp,
                weather
            });
        }
    }, [searchParams]);

return { locationData };
}
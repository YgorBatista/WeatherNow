import { ReadonlyURLSearchParams } from "next/navigation";

export type WeatherData = {
    name: string,
    country:string,
    temp:number,
    weather:string,
    description:string, 
    humidity:number,
    wind_speed:number,
    feels_like:number,
    icon:string,
    pressure:number,


}

export function extractWeatherData( searchParams:ReadonlyURLSearchParams):WeatherData | null {

    const name = searchParams.get('name')
    const country = searchParams.get('country')
    const temp = searchParams.get( 'temp')
    const weather = searchParams.get('weather')
    const description = searchParams.get('description')
    const humidity = searchParams.get('humidity')
    const wind_speed = searchParams.get(' wind_speed')
    const feels_like = searchParams.get('feels_like')
    const pressure = searchParams.get('pressure')
    const icon= searchParams.get('icon')
    
    if (!name || !temp) return null
    
    const toNumber = ( value: string | null) => {
    const num = parseFloat(value || '0')
    return isNaN(num) ? 0 : num 
    }


    return {
        name, country: country || '', temp: toNumber(temp), weather: weather || '', description:description || '', humidity:toNumber(humidity), wind_speed: toNumber(wind_speed), feels_like: toNumber(feels_like), pressure: toNumber(pressure), icon: icon || ''
    }
}


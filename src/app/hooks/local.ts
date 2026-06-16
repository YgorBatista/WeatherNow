'use client'

import axios from "axios";
import { useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";

import {LocationSuggestion} from "@/app/types/localSuggestionProps"

export default function Local() {
    
    const router = useRouter();
    const inputRef = useRef<HTMLInputElement>(null);

    const [query, setQuery] = useState('');
    const [suggestions, setSuggestions] = useState<LocationSuggestion[]>([]);
    const [selectedLocation, setSelectedLocation] = useState<LocationSuggestion | null>(null);
    const [isLoading, setIsLoading] = useState(false);

    // When the user types after having selected a location, clear the selection
    const handleInputChange = (value: string) => {
        setQuery(value);
        if (selectedLocation) {
            setSelectedLocation(null);
        }
    };

      useEffect(() => {
        const isMobile = typeof window !== 'undefined' && window.innerWidth < 450 

        if (!isMobile) {
        inputRef.current?.focus();}
    }, [suggestions]);

    
    useEffect(() => {
        
        if (selectedLocation) {
            return;
        }

        if (query.length < 2) {
            setSuggestions([]);
            return;
        }

        const timer = setTimeout(async () => {
            setIsLoading(true);

            try {
                if (!process.env.NEXT_PUBLIC_MAPBOX_KEY) {
                    setSuggestions([]);
                    setIsLoading(false);
                    return;
                }

                const res = await axios.get(`https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(query)}.json`, {
                    params: {
                        access_token: process.env.NEXT_PUBLIC_MAPBOX_KEY,
                        language: 'pt',
                        types: 'place' 
                    }
                });

                if (res.data?.features && res.data.features.length > 0) {
                    const options = res.data.features.slice(0, 4).map((item: any) => ({
                        name: item.text,
                        fullName: item.place_name,
                        lat: item.center[1],
                        lon: item.center[0],
                        state:item.context?.find((c:any) => c.id.includes('region'))?.text || '',
                        country: item.context?.find((c: any) => c.id.includes('country'))?.text || ''
                    }));

                    console.log('Sugestões retornadas:', options);
                    setSuggestions(options);
                } else {
                    console.log('Nenhum resultado encontrado');
                    setSuggestions([]);
                }
            } catch (e) {
                console.log(' Erro ao buscar sugestões:', e);
                setSuggestions([]);
            } finally {
                setIsLoading(false);
            }
        }, 1000); // Debounce de 1 segundo

        return () => clearTimeout(timer);
    }, [query, selectedLocation]);

    const handleSelectLocation = (item: LocationSuggestion) => {
        setSelectedLocation(item);
        setQuery(`${item.name} - ${item.state}  `);
        // Limpa sugestões e marca que foi selecionado para não fazer nova busca
        setSuggestions([]);
    };

     const SearchCity = async () => {
        if (!selectedLocation) {
            console.log('Nenhuma localização selecionada');
            return;
        }

        console.log('Buscando weather para:', selectedLocation);
        setIsLoading(true);

        try {
            if (!process.env.NEXT_PUBLIC_WEATHER_API_KEY) {
                console.error('OpenWeather API key não configurada');
                setIsLoading(false);
                return;
            }

            const weatherRes = await axios.get('https://api.openweathermap.org/data/2.5/weather', {
                params: {
                    lat: selectedLocation.lat,
                    lon: selectedLocation.lon,
                    appid: process.env.NEXT_PUBLIC_WEATHER_API_KEY,
                    units: 'metric',
                    lang: 'pt_br'
                }
            });

            console.log('Dados climáticos obtidos:', weatherRes.data);

            // Redireciona para o dashboard passando os dados como query params
            const params = new URLSearchParams({
                lat: selectedLocation.lat.toString(),
                lon: selectedLocation.lon.toString(),
                name: selectedLocation.name,
                country: selectedLocation.country,
                temp: weatherRes.data.main.temp.toString(),
                feels_like: weatherRes.data.main.feels_like.toString(),
                pressure: weatherRes.data.main.pressure.toString(),
                weather: weatherRes.data.weather[0].main,
                description: weatherRes.data.weather[0].description,
                humidity: weatherRes.data.main.humidity.toString(),
                wind_speed: weatherRes.data.wind.speed.toString(),
                icon: weatherRes.data.weather[0].icon
            });

            router.push(`/dashboard?${params.toString()}`);
        } catch (e) {
            console.error('Erro ao buscar dados climáticos:');
        } finally {
            setIsLoading(false);
        }
    }
    return{ inputRef, query, setQuery, handleInputChange, suggestions, selectedLocation, isLoading, handleSelectLocation, SearchCity}
}
import axios from "axios";

export default async function fiveDaysAPI(lat: number, lon: number) {

    
  // try common env var names for OpenWeather key
  const key = process.env.NEXT_PUBLIC_WEATHER_API_KEY || process.env.NEXT_PUBLIC_OPENWEATHER_KEY || process.env.NEXT_PUBLIC_OPENWEATHER_API_KEY;

  const url = `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&units=metric&lang=pt_br&appid=${key}`;

  const response = await axios.get(url);
  const data = response.data;

  // Agrupo previsões por dia
  const daily: any = {};

  data.list.forEach((item: any) => {
    const date = item.dt_txt.split(" ")[0];

    if (!daily[date]) {
      daily[date] = [];
    }

    daily[date].push(item);
  });

  // Formato cada dia com temperatura média e o dia da semana
  const formatted = Object.keys(daily).map(day => {
    const entries = daily[day];

    const temps = entries.map((e: any) => e.main.temp);
    const avgTemp = temps.reduce((a: number, b: number) => a + b) / temps.length;

    const middleEntry = entries[Math.floor(entries.length / 2)];

    return {
      weekday: capitalize(getWeekday(middleEntry.dt)), // Ele retora segunda, terça...
      avgTemp: Math.round(avgTemp),
      icon: middleEntry.weather[0].icon
    };
  });

  return formatted;
}

function getWeekday(dt: number) {
  const date = new Date(dt * 1000);
  const weekdays = [
    'dom', 'seg', 'ter', 'qua', 'qui', 'sex', 'sáb' // converto para seg, ter, qua...
  ];
  return weekdays[date.getDay()];
}

function capitalize(str: string) {
  return str.charAt(0).toUpperCase() + str.slice(1);
}


import axios from 'axios'

export type HolidayData ={
    date:string,
    name:string,
    remainingDays:number
}

export default async function holidayAPI(): Promise<HolidayData | null> {

    const year = new Date().getFullYear()
    const url =`https://brasilapi.com.br/api/feriados/v1/${year}`


    try {
        const response = await axios.get(url)

        const holidays = response.data
        const today = new Date()
        const nextHoliday = holidays.find((holiday: any) => new Date(holiday.date) >today)
      

        // Calcular dias restantes
       const holidayDate = new Date(nextHoliday.date)
        const msPerDay = 1000 * 60 * 60 * 24
        const remainingDays =
         Math.ceil(
            (holidayDate.getTime() - today.getTime()) / msPerDay
        )

        return {
            date: formatDate(nextHoliday.date),
            name: nextHoliday.name,
            remainingDays: remainingDays
        }

    } catch (error) {
        return null
    }
}

// Formata data de YYYY-MM-DD para DD/MM/YYYY
function formatDate(dateString: string): string {
    const [year, month, day] = dateString.split('-');
    return `${day}/${month}/${year}`;
}
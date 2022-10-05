export function getDateTime(date:Date){
    date = new Date(date)

    return `${date.getDay()}-${date.getHours()}-${date.getMinutes()}-${date.getSeconds()}`
}


export function getMonthDayY(date:Date){
    let tempDate = new Date(date)
    return `${tempDate.getUTCMonth()}-${tempDate.getDay()}-${tempDate.getFullYear()}`
}
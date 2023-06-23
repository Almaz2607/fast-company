const getMonthName = (date) => {
    const month = [
        "January",
        "February",
        "March",
        "April",
        "May",
        "June",
        "July",
        "August",
        "September",
        "October",
        "November",
        "December"
    ];
    return month[date.getMonth()];
};

export const displayDate = (date) => {
    const now = Date.now();

    // разница между сейчас и временем создания комментария в миллисекундах
    const diffMs = now - Number(date);

    // получаем объект даты создания комментария
    const commentCreatedDate = new Date(parseInt(date));

    // получаем minutes, hour, day, month, year из объекта даты создания комментария
    const minutes = commentCreatedDate.getMinutes();
    const hours = commentCreatedDate.getHours();
    const day = commentCreatedDate.getDay();
    const month = getMonthName(commentCreatedDate);
    const year = commentCreatedDate.getFullYear();

    // устанавливаем продолжительность соответствующих временных отрезков в миллисекундах
    const oneYear = 31536000000; // 365*24*60*60*1000
    const oneDay = 86400000; //     24*60*60*1000
    const halfHour = 1800000; //        30*60*1000
    const tenMin = 600000; //        10*60*1000
    const fiveMin = 300000; //         5*60*1000
    const oneMin = 60000; //         1*60*1000

    // логика для вывода сообщения о времени создания данного комментария
    if (diffMs > oneYear) return `${day}.${month}_${year}`;
    if (diffMs > oneDay) return `${day} ${month}`;
    if (diffMs > halfHour) return `${hours}:${minutes}`;
    if (diffMs > tenMin) return "30 минут назад";
    if (diffMs > fiveMin) return "10 минут назад";
    if (diffMs > oneMin) return "5 минут назад";
    return "1 минуту назад";
};

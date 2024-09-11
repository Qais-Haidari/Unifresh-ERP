export function getDaysFromNow(dateString) {
    const [day, month, year] = dateString.split('-').map(Number);
    if (!day || !month || !year || month > 12 || month < 1 || day < 1 || day > 31) {
        throw new Error("Invalid date format or value");
    }
    const targetDate = new Date(year, month - 1, day);
    if (isNaN(targetDate.getTime())) {
        throw new Error("Invalid date");
    }
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    targetDate.setHours(0, 0, 0, 0);
    const diffInTime = targetDate.getTime() - today.getTime();
    const diffInDays = Math.ceil(diffInTime / (1000 * 3600 * 24));
    return diffInDays;
}
export function AussieDate(str) {
    return str.split('-').reverse().join('-');
}
export function NumToDayName(e) {
    if (e === 1) {
        return 'Monday'
    } else if (e === 2) {
        return 'Tuesday'
    } else if (e === 3) {
        return 'Wednesday'
    } else if (e === 4) {
        return 'Thursday'
    } else if (e === 5) {
        return 'Friday'
    }
}
export function sortDatesIntoWeeks(datesArray) {
    const weeks = [
        [],
        [],
        [],
        []
    ];
    datesArray.forEach((dateStr, index) => {
        let day = dateStr[1].split('-')[0];
        if (day >= 1 && day <= 7) {
            weeks[0].push(dateStr);
        } else if (day >= 8 && day <= 14) {
            weeks[1].push(dateStr);
        } else if (day >= 15 && day <= 21) {
            weeks[2].push(dateStr);
        } else if (day >= 22 && day <= 28) {
            weeks[3].push(dateStr);
        }
    });

    return weeks;
}
export function getLastMonthStartAndEnd() {
    const now = new Date();
    const startOfLastMonth = new Date(now.getFullYear(), now.getMonth() - 1, 1);
    const endOfLastMonth = new Date(now.getFullYear(), now.getMonth(), 0);
    const formatDate = (date) => {
        const day = String(date.getDate()).padStart(2, '0');
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const year = date.getFullYear();
        return `${day}-${month}-${year}`;
    };
    return { startOfLastMonth: formatDate(startOfLastMonth), endOfLastMonth: formatDate(endOfLastMonth)};
}
export function hashArrayWithSecret(array, secret) {
    const jsonString = JSON.stringify(array);
    const hmac = crypto.createHmac('sha256', secret);
    hmac.update(jsonString);
    return hmac.digest('hex');
}

export function ExtractURL(url){
    const hashIndex = url.indexOf('#');
    const fragment = hashIndex !== -1 ? url.substring(hashIndex + 1) : '';
    const queryIndex = fragment.indexOf('?');
    const queryString = queryIndex !== -1 ? fragment.substring(queryIndex + 1) : '';
    const params = new URLSearchParams(queryString);
    return params.get('name');
}
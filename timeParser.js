// return 00:00:00 of the day
export function ToStartOfDay(date) {
  const d = new Date(date);
  d.setHours(0);
  d.setMinutes(0);
  d.setSeconds(0);
  return d;
}

// return 00:00:00 of next day
export function ToEndOfDay(date) {
  const d = new Date(date);
  d.setDate(d.getDate() + 1);
  return ToStartOfDay(d);
}

export function TimeFormatter(time) {
  const monthList = [
    'Januari',
    'Febuari',
    'Maret',
    'April',
    'Mei',
    'Juni',
    'Juli',
    'Agustus',
    'September',
    'Oktober',
    'November',
    'Desember',
  ];
  const dayList = [
    'Minggu',
    'Senin',
    'Selasa',
    'Rabu',
    'Kamis',
    'Jumat',
    'Sabtu',
  ];
  const timeSplitted = time.split('T');
  const currentTime = new Date();

  const year = parseInt(timeSplitted[0].split('-')[0], 10);
  const month = parseInt(timeSplitted[0].split('-')[1], 10);
  const date = parseInt(timeSplitted[0].split('-')[2], 10);

  const hourSplitted = timeSplitted[1].split('+');
  const hour = parseInt(hourSplitted[0].split(':')[0], 10);
  const hourString = hourSplitted[0].split(':')[0];
  const min = parseInt(hourSplitted[0].split(':')[1], 10);
  const minString = hourSplitted[0].split(':')[1];

  const monthString = monthList[month - 1];
  const yearDate = new Date(year, month - 1, date, hour, min);
  const dayString = dayList[yearDate.getDay()];

  function Additional() {
    const diff = currentTime - yearDate;
    if (diff / 31556952000 >= 1) {
      return `${Math.floor(diff / 31556952000)} tahun yang lalu`;
    }
    if (diff / 2629746000 >= 1) {
      return `${Math.floor(diff / 2629746000)} bulan yang lalu`;
    }
    if (diff / 604800000 >= 1) {
      return `${Math.floor(diff / 604800000)} minggu yang lalu`;
    }
    if (diff / 86400000 >= 1) {
      return `${Math.floor(diff / 86400000)} hari yang lalu`;
    }
    if (diff / 3600000 >= 1) {
      return `${Math.floor(diff / 3600000)} jam yang lalu`;
    }
    if (diff / 60000 >= 1) return `${Math.floor(diff / 60000)} menit yang lalu`;
    return 0;
  }

  return {
    time: yearDate,
    min: minString,
    hour: hourString,
    date,
    month,
    year,
    dayName: dayString,
    monthName: monthString,
    milliseconds: new Date(time).getMilliseconds(),
    additional: Additional(),
  };
}

// export to ex: Senin, 11/11/2019
export function PrintDate(data) {
  const timeFormatted = TimeFormatter(data);
  return `${timeFormatted.dayName}, ${timeFormatted.date}  ${timeFormatted.monthName}  ${timeFormatted.year}`;
}

export function PrintDateMonthYear(data) {
  const timeFormatted = TimeFormatter(data);
  return ` ${timeFormatted.date}  ${timeFormatted.monthName}  ${timeFormatted.year}`;
}

export function PrintTime(data) {
  const timeFormatted = TimeFormatter(data);
  return ` ${timeFormatted.hour}:${timeFormatted.min}`;
}

export function TimeDifference(startDate, endDate) {
  const firstDate = TimeFormatter(startDate).time;
  const secondDate = TimeFormatter(endDate).time;
  const diff = secondDate - firstDate;

  if (diff / 31556952000 >= 1) {
    return `${Math.floor(diff / 31556952000)} Years`;
  }

  if (diff / 2629746000 >= 1) {
    return `${Math.floor(diff / 2629746000)} Months (${Math.floor(
      diff / 86400000
    )} Days)`;
  }
  if (diff / 86400000 >= 1) {
    return `${Math.floor(diff / 86400000)} Days`;
  }
}

export function getDisplayDate(value) {
  const today = new Date().setHours(0, 0, 0, 0);
  const yesterday = new Date(today);
  yesterday.setDate(yesterday.getDate() - 1);
  const date = new Date(value);
  const parseDate = new Date(value).setHours(0, 0, 0, 0);
  const diff = (today - parseDate) / 86400000;

  const hour = date.getHours();
  const hours = hour < 10 ? `0${hour}` : hour;
  const minute = date.getMinutes();
  const minutes = minute < 10 ? `0${minute}` : minute;

  if (diff === 0) return `Today, ${hours}:${minutes}`;
  if (diff === 1) return `Yesterday, ${hours}:${minutes}`;
  return `${PrintDateMonthYear(value)}, ${hours}:${minutes}`;
}

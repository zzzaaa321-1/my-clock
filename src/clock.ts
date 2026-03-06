/**
 * 时钟逻辑模块
 * 处理时间计算和格式化
 */

export interface TimeComponents {
    hours: number;
    minutes: number;
    seconds: number;
    milliseconds: number;
}

export interface DateInfo {
    year: number;
    month: number;
    day: number;
    weekday: string;
    dayOfYear: number;
    isLeapYear: boolean;
}

export class Clock {
    /**
     * 获取当前时间组件
     */
    getCurrentTime(): TimeComponents {
        const now = new Date();
        return {
            hours: now.getHours(),
            minutes: now.getMinutes(),
            seconds: now.getSeconds(),
            milliseconds: now.getMilliseconds()
        };
    }

    /**
     * 获取当前日期信息
     */
    getCurrentDateInfo(): DateInfo {
        const now = new Date();
        const year = now.getFullYear();
        const month = now.getMonth() + 1; // 月份从0开始，所以+1
        const day = now.getDate();
        
        // 计算是一年中的第几天
        const start = new Date(year, 0, 0);
        const diff = now.getTime() - start.getTime();
        const oneDay = 1000 * 60 * 60 * 24;
        const dayOfYear = Math.floor(diff / oneDay);
        
        // 判断是否是闰年
        const isLeapYear = (year % 4 === 0 && year % 100 !== 0) || (year % 400 === 0);
        
        // 获取星期几
        const weekdays = ['星期日', '星期一', '星期二', '星期三', '星期四', '星期五', '星期六'];
        const weekday = weekdays[now.getDay()];
        
        return {
            year,
            month,
            day,
            weekday,
            dayOfYear,
            isLeapYear
        };
    }

    /**
     * 格式化时间为两位数
     */
    formatTwoDigits(num: number): string {
        return num < 10 ? `0${num}` : `${num}`;
    }

    /**
     * 获取12小时制时间
     */
    get12HourTime(hours: number): { hour12: number; period: string } {
        if (hours === 0) {
            return { hour12: 12, period: 'AM' };
        } else if (hours < 12) {
            return { hour12: hours, period: 'AM' };
        } else if (hours === 12) {
            return { hour12: 12, period: 'PM' };
        } else {
            return { hour12: hours - 12, period: 'PM' };
        }
    }

    /**
     * 计算模拟时钟指针角度
     */
    calculateHandAngles(time: TimeComponents): { hour: number; minute: number; second: number } {
        // 小时指针：每小时30度，每分钟0.5度
        const hourAngle = (time.hours % 12) * 30 + time.minutes * 0.5;
        
        // 分钟指针：每分钟6度，每秒0.1度
        const minuteAngle = time.minutes * 6 + time.seconds * 0.1;
        
        // 秒钟指针：每秒6度
        const secondAngle = time.seconds * 6;
        
        return {
            hour: hourAngle,
            minute: minuteAngle,
            second: secondAngle
        };
    }

    /**
     * 获取指定时区的时间
     */
    getTimeForTimezone(timezoneOffset: number): Date {
        const now = new Date();
        const localTime = now.getTime();
        const localOffset = now.getTimezoneOffset() * 60000; // 分钟转毫秒
        const utc = localTime + localOffset;
        return new Date(utc + (3600000 * timezoneOffset));
    }

    /**
     * 获取世界主要城市时区信息
     */
    getWorldTimezones(): Array<{ city: string; timezone: string; offset: number }> {
        return [
            { city: '东京', timezone: 'Asia/Tokyo', offset: 9 },
            { city: '上海', timezone: 'Asia/Shanghai', offset: 8 },
            { city: '新加坡', timezone: 'Asia/Singapore', offset: 8 },
            { city: '悉尼', timezone: 'Australia/Sydney', offset: 11 },
            { city: '莫斯科', timezone: 'Europe/Moscow', offset: 3 },
            { city: '巴黎', timezone: 'Europe/Paris', offset: 2 },
            { city: '伦敦', timezone: 'Europe/London', offset: 1 },
            { city: '纽约', timezone: 'America/New_York', offset: -4 },
            { city: '洛杉矶', timezone: 'America/Los_Angeles', offset: -7 },
            { city: '檀香山', timezone: 'Pacific/Honolulu', offset: -10 }
        ];
    }
}

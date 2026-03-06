/**
 * UI 更新模块
 * 处理DOM元素更新和动画
 */

import { Clock } from './clock';

export class UIUpdater {
    private clock: Clock;
    
    // DOM 元素引用
    private digitalClockElement: HTMLElement | null = null;
    private hourHandElement: HTMLElement | null = null;
    private minuteHandElement: HTMLElement | null = null;
    private secondHandElement: HTMLElement | null = null;
    private dateInfoElement: HTMLElement | null = null;
    private dayOfWeekElement: HTMLElement | null = null;
    private dayOfYearElement: HTMLElement | null = null;
    private fullDateElement: HTMLElement | null = null;
    private updateTimeElement: HTMLElement | null = null;

    constructor() {
        this.clock = new Clock();
    }

    /**
     * 初始化UI元素引用
     */
    initialize(): void {
        this.digitalClockElement = document.getElementById('digital-clock');
        this.hourHandElement = document.getElementById('hour-hand');
        this.minuteHandElement = document.getElementById('minute-hand');
        this.secondHandElement = document.getElementById('second-hand');
        this.dateInfoElement = document.getElementById('date-info');
        this.dayOfWeekElement = document.getElementById('day-of-week');
        this.dayOfYearElement = document.getElementById('day-of-year');
        this.fullDateElement = document.getElementById('full-date');
        this.updateTimeElement = document.getElementById('update-time');
    }

    /**
     * 更新数字时钟显示
     */
    updateDigitalClock(date: Date, is24HourFormat: boolean): void {
        if (!this.digitalClockElement) return;

        const hours = date.getHours();
        const minutes = date.getMinutes();
        const seconds = date.getSeconds();

        let displayHours: string;
        let period: string = '';

        if (is24HourFormat) {
            displayHours = this.clock.formatTwoDigits(hours);
        } else {
            const { hour12, period: timePeriod } = this.clock.get12HourTime(hours);
            displayHours = this.clock.formatTwoDigits(hour12);
            period = timePeriod;
        }

        const timeHTML = `
            <span class="time-part hours">${displayHours}</span>
            <span class="time-separator">:</span>
            <span class="time-part minutes">${this.clock.formatTwoDigits(minutes)}</span>
            <span class="time-separator">:</span>
            <span class="time-part seconds">${this.clock.formatTwoDigits(seconds)}</span>
            ${!is24HourFormat ? `<span class="time-period">${period}</span>` : ''}
        `;

        this.digitalClockElement.innerHTML = timeHTML;
    }

    /**
     * 更新模拟时钟指针
     */
    updateAnalogClock(date: Date): void {
        const time = {
            hours: date.getHours(),
            minutes: date.getMinutes(),
            seconds: date.getSeconds(),
            milliseconds: date.getMilliseconds()
        };

        const angles = this.clock.calculateHandAngles(time);

        // 更新指针角度
        if (this.hourHandElement) {
            this.hourHandElement.style.transform = `translateX(-50%) rotate(${angles.hour}deg)`;
        }
        
        if (this.minuteHandElement) {
            this.minuteHandElement.style.transform = `translateX(-50%) rotate(${angles.minute}deg)`;
        }
        
        if (this.secondHandElement) {
            this.secondHandElement.style.transform = `translateX(-50%) rotate(${angles.second}deg)`;
            
            // 添加秒钟动画效果
            if (time.milliseconds < 500) {
                this.secondHandElement.style.transition = 'transform 0.05s cubic-bezier(0.4, 2.3, 0.8, 1)';
            } else {
                this.secondHandElement.style.transition = 'transform 0.1s linear';
            }
        }
    }

    /**
     * 更新日期信息
     */
    updateDateInfo(date: Date): void {
        const dateInfo = this.clock.getCurrentDateInfo();
        
        // 更新完整日期
        if (this.fullDateElement) {
            const monthNames = ['一月', '二月', '三月', '四月', '五月', '六月', 
                               '七月', '八月', '九月', '十月', '十一月', '十二月'];
            this.fullDateElement.textContent = 
                `${dateInfo.year}年${monthNames[dateInfo.month - 1]}${dateInfo.day}日`;
        }
        
        // 更新星期几
        if (this.dayOfWeekElement) {
            this.dayOfWeekElement.textContent = dateInfo.weekday;
        }
        
        // 更新一年中的第几天
        if (this.dayOfYearElement) {
            this.dayOfYearElement.textContent = `第${dateInfo.dayOfYear}天`;
            
            // 如果是闰年，添加特殊标记
            if (dateInfo.isLeapYear) {
                this.dayOfYearElement.title = '今年是闰年';
            }
        }
    }

    /**
     * 更新页脚时间
     */
    updateFooterTime(date: Date): void {
        if (this.updateTimeElement) {
            const hours = this.clock.formatTwoDigits(date.getHours());
            const minutes = this.clock.formatTwoDigits(date.getMinutes());
            const seconds = this.clock.formatTwoDigits(date.getSeconds());
            this.updateTimeElement.textContent = `${hours}:${minutes}:${seconds}`;
        }
    }

    /**
     * 添加数字时钟动画效果
     */
    addDigitalClockAnimation(): void {
        if (!this.digitalClockElement) return;

        const timeParts = this.digitalClockElement.querySelectorAll('.time-part');
        
        timeParts.forEach(part => {
            part.addEventListener('mouseenter', () => {
                part.classList.add('pulse');
            });
            
            part.addEventListener('mouseleave', () => {
                part.classList.remove('pulse');
            });
        });
    }

    /**
     * 显示通知
     */
    showNotification(message: string, type: 'info' | 'success' | 'warning' | 'error' = 'info'): void {
        // 创建通知元素
        const notification = document.createElement('div');
        notification.className = `notification notification-${type}`;
        notification.textContent = message;
        
        // 添加到页面
        document.body.appendChild(notification);
        
        // 显示动画
        setTimeout(() => {
            notification.classList.add('show');
        }, 10);
        
        // 3秒后自动移除
        setTimeout(() => {
            notification.classList.remove('show');
            setTimeout(() => {
                if (notification.parentNode) {
                    notification.parentNode.removeChild(notification);
                }
            }, 300);
        }, 3000);
    }

    /**
     * 更新页面标题显示时间
     */
    updatePageTitle(date: Date): void {
        const hours = this.clock.formatTwoDigits(date.getHours());
        const minutes = this.clock.formatTwoDigits(date.getMinutes());
        document.title = `${hours}:${minutes} - TypeScript 时钟`;
    }
}

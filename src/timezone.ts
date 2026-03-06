/**
 * 时区管理模块
 * 处理世界时间和时区转换
 */

import { Clock } from './clock';

export class TimezoneManager {
    private clock: Clock;
    private timezoneListElement: HTMLElement | null = null;

    constructor() {
        this.clock = new Clock();
        this.timezoneListElement = document.getElementById('timezone-list');
    }

    /**
     * 初始化世界时间显示
     */
    initializeWorldTimes(): void {
        if (!this.timezoneListElement) return;

        const timezones = this.clock.getWorldTimezones();
        
        timezones.forEach(timezone => {
            const timezoneElement = this.createTimezoneElement(timezone);
            this.timezoneListElement?.appendChild(timezoneElement);
        });
    }

    /**
     * 创建时区元素
     */
    private createTimezoneElement(timezone: { city: string; timezone: string; offset: number }): HTMLElement {
        const div = document.createElement('div');
        div.className = 'timezone-item';
        div.dataset.city = timezone.city;
        div.dataset.offset = timezone.offset.toString();
        
        div.innerHTML = `
            <div class="timezone-info">
                <strong>${timezone.city}</strong>
                <small>${timezone.timezone}</small>
            </div>
            <div class="timezone-time" id="time-${timezone.city.replace(/\s+/g, '-').toLowerCase()}">
                00:00:00
            </div>
        `;
        
        return div;
    }

    /**
     * 更新所有世界时间
     */
    updateWorldTimes(): void {
        const timezoneItems = document.querySelectorAll('.timezone-item');
        
        timezoneItems.forEach(item => {
            const city = item.getAttribute('data-city');
            const offset = parseInt(item.getAttribute('data-offset') || '0');
            
            if (city) {
                const time = this.clock.getTimeForTimezone(offset);
                const timeElement = item.querySelector(`.timezone-time`);
                
                if (timeElement) {
                    const hours = this.clock.formatTwoDigits(time.getHours());
                    const minutes = this.clock.formatTwoDigits(time.getMinutes());
                    const seconds = this.clock.formatTwoDigits(time.getSeconds());
                    
                    timeElement.textContent = `${hours}:${minutes}:${seconds}`;
                }
            }
        });
    }

    /**
     * 显示时区选择器
     */
    showTimezoneSelector(): void {
        // 这里可以扩展为更复杂的时区选择器
        const timezones = this.clock.getWorldTimezones();
        const currentOffset = -new Date().getTimezoneOffset() / 60;
        
        // 找到当前时区对应的城市
        let currentCity = '本地';
        const matchedTimezone = timezones.find(tz => Math.abs(tz.offset - currentOffset) < 1);
        if (matchedTimezone) {
            currentCity = matchedTimezone.city;
        }
        
        // 更新按钮文本
        const button = document.getElementById('timezone-select');
        if (button) {
            button.innerHTML = `<i class="fas fa-globe"></i> 时区: ${currentCity}`;
        }
        
        // 显示提示
        alert(`当前时区: ${currentCity} (UTC${currentOffset >= 0 ? '+' : ''}${currentOffset})\n点击世界时间区域查看其他时区`);
    }

    /**
     * 获取用户当前时区
     */
    getUserTimezone(): string {
        return Intl.DateTimeFormat().resolvedOptions().timeZone;
    }

    /**
     * 获取时区偏移量（小时）
     */
    getTimezoneOffset(): number {
        return -new Date().getTimezoneOffset() / 60;
    }

    /**
     * 格式化时区显示
     */
    formatTimezone(offset: number): string {
        const sign = offset >= 0 ? '+' : '-';
        const absOffset = Math.abs(offset);
        const hours = Math.floor(absOffset);
        const minutes = Math.round((absOffset - hours) * 60);
        
        if (minutes === 0) {
            return `UTC${sign}${hours}`;
        } else {
            return `UTC${sign}${hours}:${minutes.toString().padStart(2, '0')}`;
        }
    }
}

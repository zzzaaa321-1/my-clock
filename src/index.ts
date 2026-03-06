/**
 * TypeScript 实时时钟应用
 * 主入口文件
 */

import { Clock } from './clock';
import { ThemeManager } from './theme';
import { TimezoneManager } from './timezone';
import { UIUpdater } from './ui';

// 应用主类
class ClockApp {
    private clock: Clock;
    private themeManager: ThemeManager;
    private timezoneManager: TimezoneManager;
    private uiUpdater: UIUpdater;
    private isPaused: boolean = false;
    private is24HourFormat: boolean = true;

    constructor() {
        this.clock = new Clock();
        this.themeManager = new ThemeManager();
        this.timezoneManager = new TimezoneManager();
        this.uiUpdater = new UIUpdater();
        
        this.init();
    }

    private init(): void {
        // 初始化UI
        this.uiUpdater.initialize();
        
        // 设置初始时间
        this.updateTime();
        
        // 设置事件监听器
        this.setupEventListeners();
        
        // 开始时钟更新
        this.startClock();
        
        // 初始化世界时间
        this.timezoneManager.initializeWorldTimes();
        
        console.log('🚀 TypeScript 时钟应用已启动');
    }

    private startClock(): void {
        // 每秒更新一次时间
        setInterval(() => {
            if (!this.isPaused) {
                this.updateTime();
            }
        }, 1000);
    }

    private updateTime(): void {
        const now = new Date();
        
        // 更新数字时钟
        this.uiUpdater.updateDigitalClock(now, this.is24HourFormat);
        
        // 更新模拟时钟
        this.uiUpdater.updateAnalogClock(now);
        
        // 更新日期信息
        this.uiUpdater.updateDateInfo(now);
        
        // 更新世界时间
        this.timezoneManager.updateWorldTimes();
        
        // 更新页脚时间
        this.uiUpdater.updateFooterTime(now);
    }

    private setupEventListeners(): void {
        // 主题切换
        document.getElementById('theme-toggle')?.addEventListener('click', () => {
            this.themeManager.toggleTheme();
        });

        // 时间格式切换
        document.getElementById('format-toggle')?.addEventListener('click', () => {
            this.is24HourFormat = !this.is24HourFormat;
            const button = document.getElementById('format-toggle');
            if (button) {
                button.innerHTML = this.is24HourFormat 
                    ? '<i class="fas fa-exchange-alt"></i> 切换到12小时制'
                    : '<i class="fas fa-exchange-alt"></i> 切换到24小时制';
            }
            this.updateTime();
        });

        // 暂停/继续按钮
        document.getElementById('pause-btn')?.addEventListener('click', () => {
            this.isPaused = !this.isPaused;
            const button = document.getElementById('pause-btn');
            if (button) {
                if (this.isPaused) {
                    button.innerHTML = '<i class="fas fa-play"></i> 继续';
                    button.classList.add('paused');
                } else {
                    button.innerHTML = '<i class="fas fa-pause"></i> 暂停';
                    button.classList.remove('paused');
                }
            }
        });

        // 时区选择
        document.getElementById('timezone-select')?.addEventListener('click', () => {
            this.timezoneManager.showTimezoneSelector();
        });
    }
}

// 当DOM加载完成后启动应用
document.addEventListener('DOMContentLoaded', () => {
    new ClockApp();
});

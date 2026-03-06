/**
 * 主题管理模块
 * 处理明暗主题切换
 */

export class ThemeManager {
    private isDarkTheme: boolean = true;
    private themeToggleButton: HTMLElement | null = null;

    constructor() {
        this.themeToggleButton = document.getElementById('theme-toggle');
        this.loadThemePreference();
    }

    /**
     * 从本地存储加载主题偏好
     */
    private loadThemePreference(): void {
        const savedTheme = localStorage.getItem('clock-theme');
        if (savedTheme === 'light') {
            this.isDarkTheme = false;
            this.applyTheme();
        }
    }

    /**
     * 切换主题
     */
    toggleTheme(): void {
        this.isDarkTheme = !this.isDarkTheme;
        this.applyTheme();
        this.saveThemePreference();
        this.updateButtonText();
    }

    /**
     * 应用当前主题
     */
    private applyTheme(): void {
        if (this.isDarkTheme) {
            document.body.classList.remove('light-theme');
            document.body.classList.add('dark-theme');
        } else {
            document.body.classList.remove('dark-theme');
            document.body.classList.add('light-theme');
        }
    }

    /**
     * 保存主题偏好到本地存储
     */
    private saveThemePreference(): void {
        localStorage.setItem('clock-theme', this.isDarkTheme ? 'dark' : 'light');
    }

    /**
     * 更新按钮文本
     */
    private updateButtonText(): void {
        if (this.themeToggleButton) {
            if (this.isDarkTheme) {
                this.themeToggleButton.innerHTML = '<i class="fas fa-moon"></i> 切换到亮色主题';
            } else {
                this.themeToggleButton.innerHTML = '<i class="fas fa-sun"></i> 切换到暗色主题';
            }
        }
    }

    /**
     * 获取当前主题
     */
    getCurrentTheme(): string {
        return this.isDarkTheme ? 'dark' : 'light';
    }

    /**
     * 设置特定主题
     */
    setTheme(theme: 'dark' | 'light'): void {
        this.isDarkTheme = (theme === 'dark');
        this.applyTheme();
        this.saveThemePreference();
        this.updateButtonText();
    }
}

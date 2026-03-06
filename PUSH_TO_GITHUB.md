# 推送到 GitHub 指南

## 步骤 1: 在 GitHub 上创建新仓库

1. 访问 https://github.com/new
2. 填写仓库信息：
   - **Repository name**: `ts-clock` (或你喜欢的名称)
   - **Description**: TypeScript 实时时钟网页应用
   - **Visibility**: Public (公开) 或 Private (私有)
   - **不要**初始化 README、.gitignore 或 license
3. 点击 "Create repository"

## 步骤 2: 获取仓库 URL

创建仓库后，你会看到类似这样的 URL：
- **HTTPS**: `https://github.com/你的用户名/ts-clock.git`
- **SSH**: `git@github.com:你的用户名/ts-clock.git`

## 步骤 3: 添加远程仓库并推送

在终端中运行以下命令：

```bash
# 进入项目目录
cd ~/myopencode/projects/ts-clock

# 添加远程仓库 (使用你的实际URL)
git remote add origin https://github.com/你的用户名/ts-clock.git

# 或者使用 SSH (如果你配置了 SSH 密钥)
# git remote add origin git@github.com:你的用户名/ts-clock.git

# 推送代码到 GitHub
git push -u origin main
```

## 步骤 4: 验证推送

1. 访问你的 GitHub 仓库页面：`https://github.com/你的用户名/ts-clock`
2. 确认所有文件都已上传
3. 查看提交历史

## 替代方案: 使用 GitHub CLI

如果你安装了 GitHub CLI，可以使用以下命令：

```bash
# 登录 GitHub
gh auth login

# 创建仓库并推送
gh repo create ts-clock --public --source=. --remote=origin --push
```

## 仓库信息

### 项目名称
`ts-clock` - TypeScript 实时时钟网页

### 项目描述
一个使用 TypeScript 构建的现代化实时时钟网页应用，具有数字和模拟时钟显示、主题切换、世界时间等功能。

### 技术栈
- TypeScript 5.0+
- HTML5 / CSS3
- 模块化架构
- 现代化Web技术

### 功能特性
- 🕒 数字和模拟时钟实时显示
- 🌙 明暗主题一键切换
- 🌍 世界主要城市时间显示
- 📱 响应式设计，适配各种设备
- ⏸️ 暂停/继续功能
- 🔄 12/24小时制切换

## 故障排除

### 问题: 推送被拒绝
```bash
# 如果远程仓库有文件冲突，先拉取
git pull origin main --allow-unrelated-histories

# 然后再次推送
git push origin main
```

### 问题: 认证失败
```bash
# 检查远程URL
git remote -v

# 更新远程URL (如果需要)
git remote set-url origin https://github.com/你的用户名/ts-clock.git

# 或者使用带令牌的URL
git remote set-url origin https://你的令牌@github.com/你的用户名/ts-clock.git
```

### 问题: 分支名称不同
```bash
# 如果本地分支是 master 而不是 main
git branch -M main
git push -u origin main
```

## 项目结构
```
ts-clock/
├── src/                    # TypeScript 源代码
├── styles/                # CSS 样式文件
├── index.html            # 主页面
├── README.md            # 项目说明
├── package.json         # 项目配置
└── tsconfig.json        # TypeScript 配置
```

## 在线预览

推送后，你可以：
1. 启用 GitHub Pages 来托管网站
2. 使用 Netlify、Vercel 等服务部署
3. 直接通过 GitHub 查看代码

## 下一步

1. **启用 GitHub Pages**:
   - 进入仓库 Settings → Pages
   - 选择 main 分支和 / (根目录)
   - 保存后访问 `https://你的用户名.github.io/ts-clock`

2. **添加工作流程**:
   - 添加 CI/CD 自动构建
   - 添加代码质量检查
   - 添加自动化测试

3. **扩展功能**:
   - 添加更多时区
   - 实现闹钟功能
   - 添加天气信息

祝你推送顺利！ 🚀

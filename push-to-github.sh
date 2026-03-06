#!/bin/bash
# TypeScript 时钟项目 GitHub 推送脚本

echo "🚀 TypeScript 时钟项目 GitHub 推送助手"
echo "========================================"

# 检查 Git 状态
if [ ! -d ".git" ]; then
    echo "❌ 错误: 当前目录不是 Git 仓库"
    exit 1
fi

echo "✅ Git 仓库已初始化"

# 显示当前状态
echo ""
echo "📊 当前 Git 状态:"
git status --short

echo ""
echo "📝 最近提交:"
git log --oneline -3

echo ""
echo "🌐 远程仓库配置:"
git remote -v

echo ""
echo "📋 推送步骤:"
echo "1. 在 GitHub 上创建新仓库: https://github.com/new"
echo "2. 仓库名: ts-clock (或自定义)"
echo "3. 不要初始化 README、.gitignore 或 license"
echo "4. 创建后复制仓库 URL"
echo ""
echo "📦 准备好后，运行以下命令:"
echo ""
echo "  # 添加远程仓库 (替换 YOUR_USERNAME)"
echo "  git remote add origin https://github.com/YOUR_USERNAME/ts-clock.git"
echo ""
echo "  # 或者使用 SSH"
echo "  # git remote add origin git@github.com:YOUR_USERNAME/ts-clock.git"
echo ""
echo "  # 推送代码"
echo "  git push -u origin main"
echo ""
echo "📖 详细指南请查看: PUSH_TO_GITHUB.md"

# 检查是否有未提交的更改
if [ -n "$(git status --porcelain)" ]; then
    echo ""
    echo "⚠️  检测到未提交的更改:"
    git status --porcelain
    echo ""
    read -p "是否要提交这些更改? (y/n): " -n 1 -r
    echo
    if [[ $REPLY =~ ^[Yy]$ ]]; then
        git add .
        git commit -m "更新: $(date '+%Y-%m-%d %H:%M:%S')"
        echo "✅ 更改已提交"
    fi
fi

echo ""
echo "🎯 下一步:"
echo "1. 访问 https://github.com/new 创建仓库"
echo "2. 按照上方命令推送代码"
echo "3. 查看 PUSH_TO_GITHUB.md 获取详细指南"

#!/bin/bash
# GitHub 认证快速修复脚本

echo "🔧 GitHub 认证问题修复"
echo "========================"

echo "当前远程仓库:"
git remote -v
echo ""

echo "📋 可选解决方案:"
echo "1. 使用个人访问令牌 (推荐)"
echo "2. 切换到 SSH 认证"
echo "3. 使用 GitHub CLI"
echo "4. 查看详细指南"
echo ""

read -p "请选择方案 (1-4): " choice

case $choice in
    1)
        echo ""
        echo "🔑 使用个人访问令牌"
        echo "------------------"
        echo "1. 访问: https://github.com/settings/tokens"
        echo "2. 点击 'Generate new token' → 'Generate new token (classic)'"
        echo "3. 填写 Note: 'my-clock-push-token'"
        echo "4. 选择 Expiration: 90 days"
        echo "5. 勾选 'repo' 权限"
        echo "6. 点击 'Generate token'"
        echo "7. 立即复制令牌 (只会显示一次!)"
        echo ""
        read -p "请输入你的 GitHub 用户名: " username
        read -p "请输入你的访问令牌: " token
        
        if [[ -n "$token" ]]; then
            echo ""
            echo "🔄 更新远程仓库URL..."
            git remote set-url origin "https://${username}:${token}@github.com/zzzaaa321-1/my-clock.git"
            
            echo "🚀 尝试推送..."
            git push -u origin main
            
            if [ $? -eq 0 ]; then
                echo "✅ 推送成功!"
                echo "📝 提示: 考虑配置凭据助手避免每次输入"
                echo "  git config --global credential.helper osxkeychain"
            else
                echo "❌ 推送失败，请检查令牌权限"
            fi
        else
            echo "❌ 令牌不能为空"
        fi
        ;;
        
    2)
        echo ""
        echo "🔐 切换到 SSH 认证"
        echo "-----------------"
        echo "检查 SSH 密钥..."
        
        if [ -f ~/.ssh/id_ed25519.pub ] || [ -f ~/.ssh/id_rsa.pub ]; then
            echo "✅ 发现 SSH 公钥"
            echo "公钥内容:"
            cat ~/.ssh/id_ed25519.pub 2>/dev/null || cat ~/.ssh/id_rsa.pub
            echo ""
            echo "请确保此公钥已添加到 GitHub:"
            echo "https://github.com/settings/keys"
            echo ""
            read -p "是否已添加公钥到 GitHub? (y/n): " -n 1 -r
            echo
            if [[ $REPLY =~ ^[Yy]$ ]]; then
                echo "🔄 切换到 SSH URL..."
                git remote set-url origin git@github.com:zzzaaa321-1/my-clock.git
                
                echo "🔍 测试 SSH 连接..."
                ssh -T git@github.com
                
                echo "🚀 尝试推送..."
                git push -u origin main
            else
                echo "请先添加公钥到 GitHub"
            fi
        else
            echo "❌ 未找到 SSH 密钥"
            echo "生成新密钥: ssh-keygen -t ed25519 -C '你的邮箱'"
        fi
        ;;
        
    3)
        echo ""
        echo "🛠️ 使用 GitHub CLI"
        echo "----------------"
        if command -v gh &> /dev/null; then
            echo "✅ GitHub CLI 已安装"
            echo "登录 GitHub..."
            gh auth login
            echo "🚀 推送代码..."
            git push -u origin main
        else
            echo "❌ GitHub CLI 未安装"
            echo "安装方法:"
            echo "  # macOS"
            echo "  brew install gh"
            echo ""
            echo "  # 然后登录"
            echo "  gh auth login"
        fi
        ;;
        
    4)
        echo ""
        echo "📖 详细指南"
        echo "----------"
        echo "查看文件: GITHUB_AUTH_FIX.md"
        echo "或访问: https://docs.github.com/en/authentication"
        ;;
        
    *)
        echo "无效选择"
        ;;
esac

echo ""
echo "💡 提示:"
echo "- 仓库名称: my-clock (你创建的)"
echo "- 用户名: zzzaaa321-1"
echo "- 详细指南: cat GITHUB_AUTH_FIX.md"

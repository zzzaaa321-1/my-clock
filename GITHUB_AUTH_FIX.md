# 🔐 GitHub 认证问题解决指南

## 问题描述
```
remote: Invalid username or token. Password authentication is not supported for Git operations.
fatal: Authentication failed for 'https://github.com/zzzaaa321-1/my-clock.git/'
```

GitHub 已于 2021 年 8 月停止支持密码认证，必须使用个人访问令牌或 SSH 密钥。

## 解决方案

### 方案 1: 使用个人访问令牌 (推荐)

#### 步骤 1: 创建令牌
1. 登录 GitHub: https://github.com
2. 点击右上角头像 → Settings
3. 左侧菜单: Developer settings → Personal access tokens → Tokens (classic)
4. 点击 "Generate new token" → "Generate new token (classic)"
5. 填写:
   - Note: `my-clock-push-token`
   - Expiration: 90 days (或自定义)
   - Select scopes: 勾选 `repo` (完全控制仓库)
6. 点击 "Generate token"
7. **立即复制令牌** (只会显示一次!)

#### 步骤 2: 使用令牌推送
```bash
# 进入项目目录
cd ~/myopencode/projects/ts-clock

# 方法 A: 临时使用令牌 (推荐)
git push https://zzzaaa321-1:你的令牌@github.com/zzzaaa321-1/my-clock.git main

# 方法 B: 永久更新远程URL
git remote set-url origin https://zzzaaa321-1:你的令牌@github.com/zzzaaa321-1/my-clock.git
git push -u origin main

# 方法 C: 使用 credential helper (macOS)
git config --global credential.helper osxkeychain
# 然后正常推送，会提示输入用户名和令牌
git push -u origin main
```

### 方案 2: 使用 SSH 密钥

#### 步骤 1: 检查现有密钥
```bash
ls -la ~/.ssh/
# 如果看到 id_rsa.pub 或 id_ed25519.pub，说明已有密钥
```

#### 步骤 2: 生成新密钥 (如果没有)
```bash
ssh-keygen -t ed25519 -C "你的邮箱@example.com"
# 按回车接受默认位置
# 可以设置密码保护 (可选)
```

#### 步骤 3: 添加公钥到 GitHub
```bash
# 复制公钥内容
cat ~/.ssh/id_ed25519.pub
# 或
pbcopy < ~/.ssh/id_ed25519.pub  # macOS 复制到剪贴板
```

1. 访问: https://github.com/settings/keys
2. 点击 "New SSH key"
3. 填写:
   - Title: `My Mac - my-clock`
   - Key type: Authentication Key
   - Key: 粘贴公钥内容
4. 点击 "Add SSH key"

#### 步骤 4: 测试 SSH 连接
```bash
ssh -T git@github.com
# 应该看到: Hi zzzaaa321-1! You've successfully authenticated...
```

#### 步骤 5: 更新远程URL并推送
```bash
git remote set-url origin git@github.com:zzzaaa321-1/my-clock.git
git push -u origin main
```

### 方案 3: 使用 GitHub CLI (最简单)

#### 安装 GitHub CLI
```bash
# macOS
brew install gh

# 其他系统: https://github.com/cli/cli#installation
```

#### 登录并推送
```bash
# 登录 GitHub
gh auth login
# 选择: GitHub.com → HTTPS → 粘贴令牌
# 或选择 SSH

# 推送代码
git push -u origin main
```

## 验证当前配置

```bash
# 查看当前远程URL
git remote -v

# 查看Git配置
git config --list | grep -E "(user|remote|credential)"

# 测试连接
ssh -T git@github.com  # SSH方式
curl -I https://github.com  # HTTPS方式
```

## 常见问题

### Q1: 令牌在哪里查看？
A: 令牌生成后只显示一次。如果丢失，需要重新生成:
1. https://github.com/settings/tokens
2. 找到对应令牌 → 点击 "Regenerate"

### Q2: SSH 连接被拒绝？
```bash
# 检查SSH代理
eval "$(ssh-agent -s)"
ssh-add ~/.ssh/id_ed25519

# 测试连接
ssh -T git@github.com
```

### Q3: 还是认证失败？
```bash
# 清除缓存凭据
git credential-osxkeychain erase
host=github.com
protocol=https

# 或使用完整URL
git push https://用户名:令牌@github.com/zzzaaa321-1/my-clock.git main
```

### Q4: 仓库名称不匹配？
你创建的是 `my-clock`，但项目是 `ts-clock`。可以:
```bash
# 重命名本地文件夹 (可选)
cd ..
mv ts-clock my-clock
cd my-clock

# 或保持原名，但推送到 my-clock
git remote set-url origin https://github.com/zzzaaa321-1/my-clock.git
```

## 快速命令参考

```bash
# 1. 使用令牌推送 (一次性)
git push https://zzzaaa321-1:你的令牌@github.com/zzzaaa321-1/my-clock.git main

# 2. 配置凭据助手 (macOS)
git config --global credential.helper osxkeychain

# 3. 切换到SSH
git remote set-url origin git@github.com:zzzaaa321-1/my-clock.git

# 4. 检查当前配置
git remote -v
git config --get remote.origin.url
```

## 安全提示

1. **不要将令牌提交到代码中**
2. **使用环境变量存储敏感信息**
3. **定期更新令牌**
4. **使用最小必要权限**

## 获取帮助

- GitHub 文档: https://docs.github.com/en/authentication
- 令牌管理: https://github.com/settings/tokens
- SSH 密钥: https://github.com/settings/keys

现在选择一种方案，完成认证后再次推送！

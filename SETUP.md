# GitHub Hosting Setup Guide

## 🚀 Quick Setup Steps

### 1. Create GitHub Repository
1. Go to [GitHub](https://github.com) and create a new repository
2. Name it `Angular-Training` (or your preferred name)
3. Make it public (required for free GitHub Pages)
4. Don't initialize with README (we already have one)

### 2. Push Your Code
```bash
# Initialize git (if not already done)
git init

# Add all files
git add .

# Commit
git commit -m "Initial commit: Angular training projects"

# Add remote origin (replace [username] with your GitHub username)
git remote add origin https://github.com/[username]/Angular-Training.git

# Push to GitHub
git push -u origin main
```

### 3. Enable GitHub Pages
1. Go to your repository on GitHub
2. Click on **Settings** tab
3. Scroll down to **Pages** section
4. Under **Source**, select **GitHub Actions**
5. The deployment will start automatically

### 4. Update README Links
After deployment, update the README.md file:
- Replace `[username]` with your actual GitHub username
- The live demos will be available at:
  - `https://[username].github.io/Angular-Training/`

## 🛠️ Local Development

### Build All Projects
```bash
# Windows
.\deploy.bat

# PowerShell
.\deploy.ps1

# Manual build (for each project)
cd Day1/Phase1
npm install
ng build
```

### Test Locally
```bash
cd Day1/Phase1
ng serve
# Open http://localhost:4200
```

## 🔧 Troubleshooting

### Common Issues:
1. **Build fails**: Check if Angular CLI is installed globally
   ```bash
   npm install -g @angular/cli
   ```

2. **GitHub Pages not working**: 
   - Ensure repository is public
   - Check GitHub Actions tab for build errors
   - Verify GitHub Pages is enabled in Settings

3. **Base href issues**: 
   - Projects are configured with correct base-href for GitHub Pages
   - Local development uses default base-href

### Build Status
Check the **Actions** tab in your GitHub repository to see deployment status.

## 📱 Mobile Responsiveness
All projects should be tested on mobile devices. GitHub Pages serves over HTTPS, so they'll work on all devices.

## 🔄 Continuous Deployment
- Every push to `main` branch triggers automatic deployment
- All 4 Angular projects are built and deployed simultaneously
- Build takes approximately 3-5 minutes
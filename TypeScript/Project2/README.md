# 🐍🪜 Snakes & Ladders Game

A modern, interactive web-based Snakes and Ladders game with stunning animations, multiple game modes, and customizable player colors.

## 🎮 Features

### Game Modes
- **👥 User vs User**: Two human players take turns
- **🤖 User vs Computer**: Play against AI with automatic turns

### Customization
- **🎨 Color Selection**: Choose from 8 vibrant colors for each player
- **🎲 Interactive Dice**: Animated rolling with number cycling
- **📱 Responsive Design**: Works on desktop and mobile devices

### Visual Effects
- **🎊 Winner Celebrations**: Confetti animation and victory popup
- **🪜 Ladder Messages**: "Hooray! Ladder! Climb up!" notifications
- **🐍 Snake Messages**: "Oops! Snake bite! Slide down!" alerts
- **✨ Smooth Animations**: 1.2s player movement with easing

### User Experience
- **🎯 Start Screen**: Welcome interface with play button
- **⚙️ Mode Selection**: Easy game mode choosing
- **🎨 Color Picker**: Visual color selection interface
- **🔄 Auto-Reset**: Returns to menu after 3 seconds on win

## 🚀 Getting Started

### Prerequisites
- Modern web browser (Chrome, Firefox, Safari, Edge)
- Local web server (optional, for audio files)

### Installation
1. Clone or download the repository
2. Ensure all files are in the same directory:
   ```
   cslkl/
   ├── index.html
   ├── game.css
   ├── game.js
   ├── snake ladder.png
   ├── rpg-dice-rolling-95182.mp3 (optional)
   └── winharpsichord-39642.mp3 (optional)
   ```
3. Open `index.html` in your web browser

## 🎯 How to Play

### Starting the Game
1. Click **"🎮 PLAY GAME"** on the start screen
2. Choose your game mode:
   - **User vs User**: Both players select colors
   - **User vs Computer**: You pick color, computer gets random
3. Click **"🚀 START GAME"** when ready

### Gameplay
1. Players take turns clicking **"ROLL DICE"**
2. Watch the interactive dice animation
3. Player pieces move automatically
4. **Ladders** 🪜: Climb up when landed on
5. **Snakes** 🐍: Slide down when bitten
6. First to reach square 100 wins!

### Controls
- **Roll Dice**: Click the dice button
- **Back to Menu**: Click home button (top-right)
- **Auto-Play**: Computer turns happen automatically

## 🎨 Customization Options

### Available Colors
- 🔴 Red
- 🔵 Blue  
- 🟢 Green
- 🟣 Purple
- 🟠 Orange
- 🩷 Pink
- 🟦 Teal
- 🟤 Brown

### Game Elements
- **Snakes**: Positions 32, 36, 48, 62, 88, 95, 97
- **Ladders**: Positions 1, 4, 8, 21, 28, 50, 71, 80
- **Board Size**: 10x10 grid (100 squares)
- **Animation Speed**: 1.2 seconds per move

## 🛠️ Technical Details

### File Structure
- **`index.html`**: Main game interface and structure
- **`game.css`**: Styling, animations, and responsive design
- **`game.js`**: Game logic, interactions, and animations
- **`snake ladder.png`**: Game board background image
- **Audio files**: Sound effects for dice and winning

### Technologies Used
- **HTML5**: Game structure and layout
- **CSS3**: Animations, gradients, and responsive design
- **JavaScript**: Game logic and interactivity
- **Google Fonts**: Fredoka One and Poppins fonts

### Browser Compatibility
- ✅ Chrome 60+
- ✅ Firefox 55+
- ✅ Safari 12+
- ✅ Edge 79+

## 🎵 Audio Features

### Sound Effects
- **Dice Rolling**: `rpg-dice-rolling-95182.mp3`
- **Victory Sound**: `winharpsichord-39642.mp3`
- **Auto-Play**: Sounds play automatically when available

### Audio Setup
1. Place audio files in the same directory as HTML
2. Files will load automatically if present
3. Game works without audio files (silent mode)

## 📱 Mobile Support

### Responsive Features
- **Adaptive Layout**: Scales to screen size
- **Touch Controls**: Optimized for mobile taps
- **Bottom Dice**: Dice container moves to bottom on mobile
- **Flexible Grid**: Board adjusts to viewport width

### Mobile Optimizations
- Larger touch targets
- Simplified animations
- Reduced font sizes
- Optimized spacing

## 🎊 Animation Details

### Dice Animation
- **Rolling Effect**: Numbers cycle 1-6 for 1 second
- **Final Result**: Shows emoji dice face
- **Rotation**: 360° spin during roll

### Player Movement
- **Duration**: 1.2 seconds with ease-in-out
- **Path**: Follows board layout (zigzag pattern)
- **Smooth**: CSS transitions for fluid motion

### Winner Celebration
- **Confetti**: 50 colorful pieces falling
- **Popup**: Bouncing entrance with pulsing text
- **Duration**: 3-second celebration before reset

## 🐛 Troubleshooting

### Common Issues
1. **Audio not playing**: Ensure audio files are in correct directory
2. **Board not aligned**: Check image file path and dimensions
3. **Mobile layout issues**: Clear browser cache and reload
4. **Slow animations**: Reduce CSS transition durations

### Performance Tips
- Use modern browser for best performance
- Close other tabs for smoother animations
- Ensure stable internet connection for fonts

## 🤝 Contributing

### Development Setup
1. Fork the repository
2. Make your changes
3. Test on multiple browsers
4. Submit pull request

### Code Style
- Use consistent indentation (2 spaces)
- Comment complex functions
- Follow existing naming conventions
- Test responsive design

## 📄 License

This project is open source and available under the MIT License.

## 🎯 Future Enhancements

### Planned Features
- 🏆 Score tracking and statistics
- 🎵 More sound effects and music
- 🌟 Power-ups and special squares
- 👥 Online multiplayer support
- 🎨 More themes and board designs

---
## 🌐 Live Demo

Play the Snakes & Ladders game instantly in your browser:
👉 [Snakes & Ladders – Project 2 Demo (Play Online)](https://hariram7405.github.io/Angular/TypeScript/Project2/index.html)  
*(Open the HTML file directly in your browser or host via GitHub Pages for best experience)*


**Enjoy playing Snakes & Ladders!** 🎮✨

*For support or questions, please open an issue in the repository.*

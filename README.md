# 🎱 Pool Billiard Virtual Casino Game

A web-based pool/billiard game with virtual currency mechanics for educational and entertainment purposes only.

## ⚠️ Important Disclaimer
**This is for educational purposes only** - No real money gambling involved. All currency is virtual/play money.

## 🎮 How to Play

1. **Place Your Bet**: Choose from 25, 50, 100, or 200 virtual coins
2. **Shoot the Ball**: Click "Shoot Ball" to take your shot
3. **Earn Virtual Coins**: Based on your performance:
   - 🎉 **Jackpot** (2+ balls potted): 4x-10x multiplier
   - 🎯 **Good Shot** (1 ball potted): 2x multiplier
   - 😐 **Close Shot**: 1x multiplier (bet returned)
   - 😞 **Miss**: 0x multiplier (lose bet)
4. **Manage Your Bankroll**: Try to grow your virtual coin collection!

## 🚀 Getting Started

### Option 1: Open Directly
Simply open `index.html` in your web browser.

### Option 2: Local Server
```bash
# Start a local server (Python 3)
python3 -m http.server 8000

# Or use Node.js
npx serve .

# Then visit http://localhost:8000
```

## 🎯 Game Features

- **Virtual Currency System**: Play with virtual coins only
- **Realistic Pool Table**: HTML5 Canvas-based game board
- **Multiple Betting Options**: Choose your risk level
- **Earnings History**: Track your recent game results
- **Responsive Design**: Works on desktop and mobile
- **Local Storage**: Game progress is saved automatically

## 🧪 Testing

Open the browser console and run:
```javascript
runTests(); // Runs basic functionality tests
```

## 📁 Project Structure

```
pool-billard-/
├── index.html      # Main game interface
├── style.css       # Game styling and responsive design
├── game.js         # Core game logic and mechanics
├── tests.js        # Basic functionality tests
└── README.md       # This documentation
```

## 🎯 Game Mechanics

### Virtual Economy
- Start with 1,000 virtual coins
- Minimum bet: 25 coins
- Maximum bet: Limited by your virtual balance
- Add more virtual coins anytime with the "Add Virtual Coins" button

### Probability System
The game uses a realistic probability system:
- 15% chance of jackpot (multiple balls)
- 20% chance of good shot (1 ball)
- 20% chance of close shot (break even)
- 45% chance of miss (lose bet)

### Progressive Gameplay
- Track games played and earnings history
- Learn bankroll management
- Understand risk vs reward concepts

## 🎓 Educational Value

This game demonstrates:
- **Probability and Statistics**: Understanding odds and outcomes
- **Risk Management**: Betting strategies and bankroll management
- **Game Theory**: Decision making under uncertainty
- **Web Development**: HTML5 Canvas, CSS animations, JavaScript

## 🔧 Technical Features

- **HTML5 Canvas**: Smooth graphics and animations
- **CSS3**: Modern styling with gradients and animations
- **Vanilla JavaScript**: No external dependencies
- **Local Storage**: Persistent game state
- **Responsive Design**: Mobile-friendly interface

## 🤝 Contributing

This is an educational project. Feel free to fork and enhance:
- Add more game modes
- Improve graphics and animations
- Add sound effects
- Implement different difficulty levels
- Add achievement system

## 📄 License

This project is for educational purposes only. No real gambling functionality included.

---

**Remember**: This is a demonstration of game mechanics using virtual currency only. No real money gambling - Educational and entertainment purposes only.

# 🏇 Horse Racing Game

An interactive horse racing game built with Vue 3, TypeScript, and Vuex for state management.

## 🎯 Features

### Core Functionality

- **20 Unique Horses**: Each with a unique name (famous computer scientists), condition score (1-100), and distinct color
- **6-Round Race Program**: Races at different distances (1200m, 1400m, 1600m, 1800m, 2000m, 2200m)
- **Animated Racing**: Smooth horse movement animations across the track
- **Sequential Results**: Race results displayed as each round completes
- **Smart Racing Logic**: Horse speed calculated based on condition, distance, and randomness

### User Interface

- **Control Panel**: Generate Program and Start/Pause buttons
- **Horse List**: Complete roster of 20 horses with their stats
- **Race Track**: Visual representation with 10 lanes and animated horse silhouettes
- **Program Schedule**: Shows all 6 rounds with participating horses
- **Results Panel**: Displays completed race results with podium highlighting

## 🏗️ Architecture

### State Management (Vuex)

```
src/store/index.ts
```

- Centralized state management for horses, races, and game status
- Actions for generating programs, starting/pausing races, and animations
- Mutations for updating game state
- Getters for computed properties

### Type Definitions

```
src/types/index.ts
```

- `Horse`: Horse data structure
- `Race`: Race configuration and status
- `RaceResult`: Race outcome data
- `GameStatus`: Game state enumeration

### Utilities

```
src/utils/horseGenerator.ts
```

- `generateHorses()`: Creates 20 horses with unique properties
- `selectRandomHorses()`: Picks 10 random horses for each race
- `generateRaceProgram()`: Creates 6-round race schedule
- `calculateHorseSpeed()`: Computes horse performance based on multiple factors
- `simulateRace()`: Determines race outcomes

### Components

#### ControlPanel.vue

- Main control buttons (Generate Program, Start/Pause)
- Manages game state transitions
- Beautiful gradient styling

#### HorseList.vue

- Displays all 20 horses in a scrollable table
- Shows name, condition, and color for each horse
- Sticky header for easy navigation

#### RaceTrack.vue

- Visual race track with 10 lanes
- Animated horse silhouettes using SVG
- Real-time position updates during races
- Dashed lane separators and finish line

#### RaceSchedule.vue

- Shows all 6 rounds with participating horses
- Highlights active race
- Dims completed races

#### RaceResults.vue

- Displays results sequentially as races complete
- Podium highlighting (gold, silver, bronze)
- Smooth slide-in animations

## 🎮 How to Use

1. **Start the Application**

   ```bash
   npm run dev
   ```

2. **Generate Program**
   - Click "GENERATE PROGRAM" button
   - System creates 6 races with random horse selections

3. **Start Racing**
   - Click "START" button
   - Races run automatically, one after another
   - Watch horses move across the track in real-time

4. **View Results**
   - Results appear in the right panel as each race completes
   - See final positions and winning horses

## 🎨 Design Highlights

- **Modern UI**: Clean, professional design with gradient accents
- **Responsive Layout**: Grid-based layout that adapts to different screen sizes
- **Smooth Animations**: CSS transitions and requestAnimationFrame for fluid motion
- **Visual Hierarchy**: Clear separation of information sections
- **Color Coding**: Each horse has a unique color for easy identification

## 🏁 Race Logic

### Horse Performance Calculation

- **Condition Factor**: 0.5 to 1.5 multiplier based on condition score
- **Distance Factor**: Race length affects different horses
- **Random Factor**: 0.8 to 1.2 for unpredictability

### Animation System

- Uses `requestAnimationFrame` for smooth 60fps animation
- Real-time position updates based on calculated speeds
- Ensures all horses reach finish line at appropriate times

## 📁 Project Structure

```
horserace/
├── src/
│   ├── components/
│   │   ├── ControlPanel.vue
│   │   ├── HorseList.vue
│   │   ├── RaceTrack.vue
│   │   ├── RaceSchedule.vue
│   │   └── RaceResults.vue
│   ├── store/
│   │   └── index.ts
│   ├── types/
│   │   └── index.ts
│   ├── utils/
│   │   └── horseGenerator.ts
│   ├── App.vue
│   └── main.ts
├── package.json
└── vite.config.ts
```

## 🔧 Technical Stack

- **Vue 3**: Composition API with `<script setup>`
- **TypeScript**: Full type safety throughout
- **Vuex**: Centralized state management
- **Vite**: Fast development and building
- **CSS3**: Modern styling with gradients, animations, and flexbox/grid

## 🧪 Code Quality

- **Clean Architecture**: Separation of concerns (components, store, utils, types)
- **Type Safety**: Full TypeScript coverage
- **Maintainability**: Well-organized, commented code
- **Scalability**: Easy to extend with new features
- **Best Practices**: Vue 3 Composition API, proper state management

## 🚀 Future Enhancements

Potential improvements:

- Betting system
- Horse statistics and history
- Multiple race modes (sprint, marathon)
- Sound effects and music
- Replay functionality
- Save/load race programs
- Tournament mode

---

Built with ❤️ using Vue 3, TypeScript, and Vuex

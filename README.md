# Best Before Tracker 

A React Native mobile application that helps you track food expiration dates and reduce food waste by sending timely reminders about items approaching their best before dates.

## Features

- **Food Inventory Management**: Add food items with their expiration dates
- **Camera Integration**: Scan barcodes or take photos of food items for quick entry
- **Smart Notifications**: Get alerts when items are approaching their expiration dates
- **Expiration Calendar**: Visual calendar view of all upcoming expiration dates
- **Food Categories**: Organize items by category (dairy, produce, pantry, etc.)
- **Search & Filter**: Quickly find specific items in your inventory
- **Waste Tracking**: Monitor how much food you've saved from going to waste

## Installation

### Prerequisites

- Node.js (>= 18)
- React Native CLI
- iOS development: Xcode and iOS Simulator
- Android development: Android Studio and Android SDK

### Setup

1. Clone the repository:
```bash
git clone https://github.com/yourusername/best-before-tracker.git
cd best-before-tracker
```

2. Install dependencies:
```bash
npm install
```

3. For iOS (macOS only):
```bash
cd ios && pod install && cd ..
```

4. Start the Metro bundler:
```bash
npm start
```

5. Run the app:
```bash
# For iOS
npm run ios

# For Android
npm run android
```

## Usage 🎯

1. **Add Items**: Tap the "+" button to add new food items
2. **Set Expiration Dates**: Use the date picker to set when items expire
3. **Scan Barcodes**: Use the camera to quickly identify products
4. **View Expiring Items**: Check the home screen for items expiring soon
5. **Mark as Consumed**: Remove items when you use them to track waste reduction

## Tech Stack

- **Framework**: React Native 0.80.1
- **Navigation**: React Navigation 7.x
- **UI Components**: React Native core components
- **Camera**: React Native Camera
- **Date Handling**: React Native Date Picker
- **Language**: TypeScript
- **Testing**: Jest


## Testing

Run the test suite:
```bash
npm test
```

Run tests in watch mode:
```bash
npm test -- --watch
```

## Building for Production

### Android
```bash
cd android && ./gradlew assembleRelease
```

### iOS
1. Open `ios/BestBeforeTracker.xcworkspace` in Xcode
2. Select "Product" > "Archive"
3. Follow the App Store submission process

## Roadmap
- [ ] Add OCR scanning for quicker input
- [ ] Cloud sync across devices
- [ ] Barcode database integration
- [ ] Recipe suggestions for expiring items
- [ ] Grocery list integration
- [ ] Nutritional information display
- [ ] Sharing capabilities with family members
- [ ] Dark mode support
- [ ] Widget for quick access to expiring items
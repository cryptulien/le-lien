# Le LIEN - Technical Documentation

## Architecture Overview

### Tech Stack
- **Frontend Framework**: React with TypeScript
- **Routing**: React Router v6
- **Styling**: Tailwind CSS
- **Icons**: Lucide React
- **Build Tool**: Vite
- **Deployment**: Netlify

### Project Structure
```
src/
├── components/       # Reusable UI components
├── data/            # Static data and configurations
├── hooks/           # Custom React hooks
├── pages/           # Page components and routing
├── types/           # TypeScript type definitions
└── utils/           # Helper functions and utilities
```

## Core Components

### 1. App Component (`src/App.tsx`)
- Root component implementing React Router
- Manages global state (favorites, theme)
- Handles routing logic and navigation
- Implements responsive sidebar layout

### 2. Sidebar (`src/components/Sidebar.tsx`)
- Responsive navigation menu
- Collapsible on mobile devices
- Dark mode toggle
- Footer with legal links

### 3. MainContent (`src/components/MainContent.tsx`)
- Dynamic content rendering based on current route
- Handles category and card display
- Implements favorites functionality

### 4. CardList (`src/components/CardList.tsx`)
- Reusable component for displaying medical cards
- Handles favorite toggling
- Implements card navigation

### 5. SearchBar (`src/components/SearchBar.tsx`)
- Real-time search functionality
- Search suggestions dropdown
- Category filtering

## State Management

### Local Storage Hook
```typescript
// src/hooks/useLocalStorage.ts
export function useLocalStorage<T>(key: string, initialValue: T) {
  const [storedValue, setStoredValue] = useState<T>(() => {
    try {
      const item = window.localStorage.getItem(key);
      return item ? JSON.parse(item) : initialValue;
    } catch (error) {
      console.error('Error reading from localStorage:', error);
      return initialValue;
    }
  });

  useEffect(() => {
    try {
      window.localStorage.setItem(key, JSON.stringify(storedValue));
    } catch (error) {
      console.error('Error writing to localStorage:', error);
    }
  }, [key, storedValue]);

  return [storedValue, setStoredValue];
}
```

### Favorites Management
- Uses `useLocalStorage` hook for persistence
- Implemented as a Set for efficient lookups
- Syncs across components via prop drilling

## Routing Implementation

### Route Structure
```typescript
<Routes>
  <Route path="/" element={<MainContent />} />
  <Route path="/favorites" element={<MainContent currentView="favorites" />} />
  <Route path="/:category" element={<CategoryPage />} />
  <Route path="/:category/:cardId" element={<CardDetail />} />
  <Route path="/preface" element={<PrefaceContent />} />
  <Route path="/preamble" element={<PreambuleContent />} />
  <Route path="/oath" element={<OathContent />} />
  <Route path="/help" element={<HelpContent />} />
  <Route path="/terms" element={<TermsContent />} />
  <Route path="/legal" element={<LegalContent />} />
</Routes>
```

### Navigation
- Uses `useNavigate` hook for programmatic navigation
- Implements back navigation with browser history
- Handles dynamic category and card routing

## Styling System

### Tailwind Configuration
```javascript
// tailwind.config.js
module.exports = {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        primary: '#005BB5',
        success: '#00C853',
        warning: '#FF6F00',
        neutral: '#F4F4F4',
      }
    }
  }
}
```

### Dark Mode Implementation
- Toggle via Sidebar button
- Class-based approach using Tailwind
- Persisted in localStorage

## Data Structure

### Category Type
```typescript
interface Category {
  id: string;
  icon: any;
  name: string;
  color: string;
  cards: Card[];
}
```

### Card Type
```typescript
interface Card {
  id: string;
  title: string;
  category: string;
}
```

## Performance Optimizations

1. **Code Splitting**
   - Route-based splitting using React Router
   - Lazy loading of category pages

2. **Memoization**
   - UseCallback for event handlers
   - UseMemo for expensive computations

3. **Asset Optimization**
   - SVG icons from Lucide React
   - Responsive images with proper sizing

## Deployment

### Netlify Configuration
```toml
# public/_redirects
/* /index.html 200
```

### Build Process
1. TypeScript compilation
2. Vite production build
3. Asset optimization
4. Deployment to Netlify

## Development Guidelines

### Adding New Categories
1. Add category data to `src/data/categories.ts`
2. Create category page in `src/pages`
3. Add route in `App.tsx`
4. Update types if necessary

### Adding New Cards
1. Add card data to appropriate category
2. Create card component in category folder
3. Add route in `App.tsx`
4. Update search functionality if needed

### Styling Conventions
- Use Tailwind utility classes
- Follow component-based styling
- Maintain dark mode compatibility
- Use CSS modules for complex styles

## Testing Strategy

### Unit Tests
- Component rendering
- User interactions
- State management
- Route handling

### Integration Tests
- Navigation flows
- Search functionality
- Favorites system
- Theme switching

## Future Improvements

1. **Offline Support**
   - Service Worker implementation
   - Local data caching
   - Offline-first architecture

2. **Authentication**
   - User accounts
   - Personalized favorites
   - Role-based access

3. **Performance**
   - Image optimization
   - Code splitting
   - Caching strategies

4. **Features**
   - Print functionality
   - Export to PDF
   - Share capabilities
   - Mobile app wrapper
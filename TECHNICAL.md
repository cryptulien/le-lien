# Le LIEN - Technical Documentation

## Architecture Overview

### Tech Stack
- **Frontend Framework**: React with TypeScript
- **Routing**: React Router v6
- **Styling**: Tailwind CSS
- **Icons**: Lucide React
- **Build Tool**: Vite
- **Deployment**: Vercel

### Project Structure
```
src/
├── components/       # Reusable UI components
├── config/           # Configuration files
├── contexts/         # Context API implementations
├── data/            # Static data and configurations
├── hooks/           # Custom React hooks
├── layouts/          # Layout components
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

## Detailed File Descriptions

### Components (`src/components/`)
- **AuthButton.tsx**: Handles authentication button logic.
- **AuthStatus.tsx**: Displays user's authentication status.
- **CardList.tsx**: Reusable component for displaying medical cards.
- **CategoryGrid.tsx**: Displays a grid of categories.
- **EquivalencesGrid.tsx**: Displays a grid of equivalences.
- **Header.tsx**: Header component for the application.
- **MainContent.tsx**: Renders main content based on current route.
- **OathContent.tsx**: Displays oath content.
- **PreambuleContent.tsx**: Displays preamble content.
- **PrefaceContent.tsx**: Displays preface content.
- **RecentCards.tsx**: Displays recent cards.
- **ScoresGrid.tsx**: Displays a grid of scores.
- **SearchBar.tsx**: Search bar with real-time suggestions.
- **Sidebar.tsx**: Navigation menu with collapsible sections.
- **layouts/**: Contains layout components.

### Config (`src/config/`)
- **firebase.ts**: Configuration for Firebase integration.

### Contexts (`src/contexts/`)
- **AuthContext.tsx**: Provides context for managing user authentication state.

### Data (`src/data/`)
- **categories.ts**: Static data and configurations for categories.

### Hooks (`src/hooks/`)
- **useFavorites.ts**: Custom hook for managing favorites.
- **useLocalStorage.ts**: Custom hook for local storage interactions.

### Layouts (`src/components/layouts/`)
- **StaticPageLayout.tsx**: Layout component for structuring static pages.

### Pages (`src/pages/`)
- **LegalContent.tsx**: Content for legal pages.
- **TermsContent.tsx**: Content for terms and conditions pages.
- **Subdirectories**: Contain specific pages for various medical categories and sections.

### Types (`src/types/`)
- **index.ts**: General TypeScript type definitions.
- **pages.ts**: Type definitions specific to pages.

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

## Application Workflow

This section describes the typical user flow within the application, detailing how users navigate from the homepage to specific features.

## State Management

The application uses React's Context API to manage global state, including user authentication and theme preferences.

## External APIs and Services

The application integrates with Firebase for authentication and data storage. Firebase configuration details are provided in the `src/config/firebase.ts` file.

## Security and Authentication

User authentication is handled through Firebase, ensuring secure login and data protection. Authentication state is managed using the `AuthContext`.

## Testing and Quality Assurance

The project employs unit and integration tests to ensure code quality and reliability. Testing frameworks like Jest and React Testing Library are used.

## Deployment and CI/CD

The application is deployed on Netlify, with a CI/CD pipeline set up to automate testing and deployment processes.

## Error Handling and Logging

Error boundaries are implemented to catch and handle errors gracefully. Logging is performed using console statements and integrated monitoring tools.

## Accessibility and Internationalization

The application follows accessibility best practices to ensure usability for all users. Internationalization support is planned for future releases.

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
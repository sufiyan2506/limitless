# Hooks Directory

This directory contains custom React hooks that encapsulate reusable logic and provide clean interfaces for common functionality.

## 📁 Current Hooks

```
hooks/
├── use-toast.ts          # Toast notification management
├── useCountUp.tsx        # Number animation hook
├── useNavigationTransition.ts  # Page transition logic
└── useScrollToTop.tsx    # Auto-scroll on route changes
```

## 🎯 Hook Categories

### UI Interaction Hooks
- **use-toast**: Toast notification system integration
- **useNavigationTransition**: Smooth page transition management
- **useScrollToTop**: Automatic page scrolling on route changes

### Animation Hooks
- **useCountUp**: Animated number counting with easing

## 🔧 Hook Development Standards

### Hook Structure Template
```typescript
import { useState, useEffect, useCallback } from 'react';

interface HookOptions {
  // Configuration options
  option1?: boolean;
  option2?: string;
}

interface HookReturn {
  // Return value interface
  value: any;
  actions: {
    action1: () => void;
    action2: (param: string) => void;
  };
  state: {
    isLoading: boolean;
    error?: string;
  };
}

/**
 * Custom hook description
 * 
 * @param options Configuration options
 * @returns Hook return value with state and actions
 * 
 * @example
 * ```tsx
 * const { value, actions, state } = useCustomHook({
 *   option1: true,
 *   option2: 'value'
 * });
 * ```
 */
export const useCustomHook = (options: HookOptions = {}): HookReturn => {
  const [value, setValue] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string>();

  const action1 = useCallback(() => {
    // Implementation
  }, []);

  const action2 = useCallback((param: string) => {
    // Implementation
  }, []);

  useEffect(() => {
    // Side effects
  }, []);

  return {
    value,
    actions: { action1, action2 },
    state: { isLoading, error }
  };
};
```

### TypeScript Guidelines
- **Strict typing** for all parameters and return values
- **Generic types** where appropriate for flexibility
- **Interface definitions** for complex options and return values
- **JSDoc documentation** explaining purpose and usage

### Performance Considerations
- **useCallback** for function returns to prevent unnecessary re-renders
- **useMemo** for expensive computations
- **Proper dependencies** in useEffect to avoid infinite loops
- **Cleanup functions** for subscriptions and timers

## 📚 Hook Documentation

### use-toast
Toast notification system for user feedback.

```typescript
const { toast } = useToast();

toast({
  title: "Success!",
  description: "Your action was completed successfully.",
  variant: "default"
});
```

### useCountUp
Animated number counting with customizable easing.

```typescript
const { count, start, reset } = useCountUp({
  start: 0,
  end: 100,
  duration: 2000,
  easing: 'easeOutExpo'
});
```

### useNavigationTransition
Manages smooth page transitions between routes.

```typescript
const { isTransitioning, startTransition } = useNavigationTransition();
```

### useScrollToTop
Automatically scrolls to page top on route changes.

```typescript
// Simply use in your app component
useScrollToTop();
```

## 🚀 Creating New Hooks

### Development Process
1. **Identify reusable logic** that appears in multiple components
2. **Design clean API** with clear inputs and outputs
3. **Implement with performance** in mind
4. **Add comprehensive tests** for all functionality
5. **Document thoroughly** with JSDoc and examples
6. **Review and refactor** for optimal developer experience

### Testing Hooks
```typescript
import { renderHook, act } from '@testing-library/react';
import { useCustomHook } from './useCustomHook';

describe('useCustomHook', () => {
  it('should initialize with default values', () => {
    const { result } = renderHook(() => useCustomHook());
    
    expect(result.current.value).toBeNull();
    expect(result.current.state.isLoading).toBe(false);
  });

  it('should handle actions correctly', () => {
    const { result } = renderHook(() => useCustomHook());
    
    act(() => {
      result.current.actions.action1();
    });
    
    expect(result.current.value).toBe(expectedValue);
  });
});
```

## 🎯 Best Practices

### Hook Design Principles
- **Single Responsibility**: Each hook should have one clear purpose
- **Composition over Complexity**: Combine simple hooks rather than creating complex ones
- **Consistent API**: Follow established patterns across all hooks
- **Error Handling**: Provide clear error states and recovery mechanisms

### Performance Optimization
- **Minimize Re-renders**: Use useCallback and useMemo appropriately
- **Lazy Initialization**: Use lazy initial state for expensive computations
- **Cleanup**: Always cleanup subscriptions, timers, and event listeners
- **Dependencies**: Be precise with dependency arrays to avoid issues

### Common Patterns
```typescript
// 1. Data Fetching Hook
export const useApiData = (url: string) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Fetch data logic with cleanup
  }, [url]);

  return { data, loading, error, refetch };
};

// 2. Local Storage Hook
export const useLocalStorage = <T>(key: string, initialValue: T) => {
  const [storedValue, setStoredValue] = useState<T>(() => {
    try {
      const item = localStorage.getItem(key);
      return item ? JSON.parse(item) : initialValue;
    } catch (error) {
      return initialValue;
    }
  });

  const setValue = (value: T | ((val: T) => T)) => {
    try {
      const valueToStore = value instanceof Function ? value(storedValue) : value;
      setStoredValue(valueToStore);
      localStorage.setItem(key, JSON.stringify(valueToStore));
    } catch (error) {
      console.error('Error saving to localStorage:', error);
    }
  };

  return [storedValue, setValue] as const;
};

// 3. Event Listener Hook
export const useEventListener = (
  eventName: string,
  handler: (event: Event) => void,
  element: HTMLElement | Window = window
) => {
  const savedHandler = useRef(handler);

  useEffect(() => {
    savedHandler.current = handler;
  }, [handler]);

  useEffect(() => {
    const eventListener = (event: Event) => savedHandler.current(event);
    element.addEventListener(eventName, eventListener);
    
    return () => {
      element.removeEventListener(eventName, eventListener);
    };
  }, [eventName, element]);
};
```

## 🔄 Hook Lifecycle

### Creation Checklist
- [ ] Clear purpose and use case defined
- [ ] TypeScript interfaces for options and return values
- [ ] Comprehensive JSDoc documentation
- [ ] Unit tests with good coverage
- [ ] Performance optimizations applied
- [ ] Error handling implemented
- [ ] Examples and usage documentation

### Maintenance Guidelines
- **Regular audits** for performance and usage patterns
- **Version compatibility** when updating dependencies
- **Breaking change management** with deprecation warnings
- **Documentation updates** to reflect changes
- **Community feedback** integration for improvements

---

Custom hooks are a powerful way to share stateful logic between components. Follow these guidelines to create maintainable, performant, and well-documented hooks that enhance the developer experience.
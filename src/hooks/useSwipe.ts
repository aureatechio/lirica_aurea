import { useEffect, useRef, useCallback } from "react";

interface SwipeConfig {
  onSwipeLeft?: () => void;
  onSwipeRight?: () => void;
  onSwipeUp?: () => void;
  onSwipeDown?: () => void;
  minSwipeDistance?: number;
  maxSwipeTime?: number;
  enabled?: boolean;
}

interface SwipeState {
  startX: number;
  startY: number;
  startTime: number;
}

export function useSwipe(config: SwipeConfig) {
  const {
    onSwipeLeft,
    onSwipeRight,
    onSwipeUp,
    onSwipeDown,
    minSwipeDistance = 50,
    maxSwipeTime = 300,
    enabled = true,
  } = config;

  const swipeState = useRef<SwipeState | null>(null);

  const handleTouchStart = useCallback((e: TouchEvent) => {
    if (!enabled) return;
    
    const touch = e.touches[0];
    swipeState.current = {
      startX: touch.clientX,
      startY: touch.clientY,
      startTime: Date.now(),
    };
  }, [enabled]);

  const handleTouchEnd = useCallback((e: TouchEvent) => {
    if (!enabled || !swipeState.current) return;

    const touch = e.changedTouches[0];
    const { startX, startY, startTime } = swipeState.current;
    
    const deltaX = touch.clientX - startX;
    const deltaY = touch.clientY - startY;
    const deltaTime = Date.now() - startTime;

    // Verificar se o swipe foi rápido o suficiente
    if (deltaTime > maxSwipeTime) {
      swipeState.current = null;
      return;
    }

    const absX = Math.abs(deltaX);
    const absY = Math.abs(deltaY);

    // Verificar se o swipe foi longo o suficiente
    if (absX < minSwipeDistance && absY < minSwipeDistance) {
      swipeState.current = null;
      return;
    }

    // Determinar direção do swipe (horizontal tem prioridade se for mais forte)
    if (absX > absY) {
      // Swipe horizontal
      if (deltaX > 0 && onSwipeRight) {
        onSwipeRight();
        triggerHapticFeedback();
      } else if (deltaX < 0 && onSwipeLeft) {
        onSwipeLeft();
        triggerHapticFeedback();
      }
    } else {
      // Swipe vertical
      if (deltaY > 0 && onSwipeDown) {
        onSwipeDown();
        triggerHapticFeedback();
      } else if (deltaY < 0 && onSwipeUp) {
        onSwipeUp();
        triggerHapticFeedback();
      }
    }

    swipeState.current = null;
  }, [enabled, minSwipeDistance, maxSwipeTime, onSwipeLeft, onSwipeRight, onSwipeUp, onSwipeDown]);

  useEffect(() => {
    if (!enabled) return;

    document.addEventListener("touchstart", handleTouchStart, { passive: true });
    document.addEventListener("touchend", handleTouchEnd, { passive: true });

    return () => {
      document.removeEventListener("touchstart", handleTouchStart);
      document.removeEventListener("touchend", handleTouchEnd);
    };
  }, [enabled, handleTouchStart, handleTouchEnd]);
}

// Função para feedback háptico (vibração)
function triggerHapticFeedback() {
  if ("vibrate" in navigator) {
    navigator.vibrate(10); // Vibração curta de 10ms
  }
}

// Hook para navegação entre páginas com swipe
export function useSwipeNavigation(routes: string[], currentPath: string, navigate: (path: string) => void) {
  const currentIndex = routes.indexOf(currentPath);

  const goToPrevious = useCallback(() => {
    if (currentIndex > 0) {
      navigate(routes[currentIndex - 1]);
    }
  }, [currentIndex, routes, navigate]);

  const goToNext = useCallback(() => {
    if (currentIndex < routes.length - 1) {
      navigate(routes[currentIndex + 1]);
    }
  }, [currentIndex, routes, navigate]);

  useSwipe({
    onSwipeRight: goToPrevious,
    onSwipeLeft: goToNext,
    enabled: typeof window !== "undefined" && window.innerWidth < 768,
  });

  return {
    currentIndex,
    totalRoutes: routes.length,
    canGoPrevious: currentIndex > 0,
    canGoNext: currentIndex < routes.length - 1,
  };
}

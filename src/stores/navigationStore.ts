// src/stores/navigationStore.ts
import { create } from 'zustand';

export type ViewType = 'home' | 'star' | 'start';

interface NavigationState {
  currentView: ViewType;
  selectedStarId: string | null;
  isTransitioning: boolean;
  setView: (view: ViewType, starId?: string | null) => void;
  setTransitioning: (transitioning: boolean) => void;
}

export const useNavigationStore = create<NavigationState>((set) => ({
  currentView: 'start',
  selectedStarId: null,
  isTransitioning: true,
  setView: (view: ViewType, starId: string | null = null) =>
    set({ currentView: view, selectedStarId: starId }),
  setTransitioning: (transitioning: boolean) =>
    set({ isTransitioning: transitioning }),
}));
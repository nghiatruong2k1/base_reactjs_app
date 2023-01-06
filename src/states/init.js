import { createContext} from 'react';
import {
  createDispatchHook,
  createSelectorHook
} from 'react-redux';
export const GlobalContext = createContext({});
export const useDispatchGlobal = createDispatchHook(GlobalContext);
export const useSelectorGlobal = createSelectorHook(GlobalContext);
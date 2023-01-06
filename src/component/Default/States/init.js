import { createContext} from 'react';
import {
  createDispatchHook,
  createSelectorHook
} from 'react-redux';
export const DefaultContext = createContext({});
export const useDispatchDefault = createDispatchHook(DefaultContext);
export const useSelectorDefault = createSelectorHook(DefaultContext);
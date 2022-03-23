import { AnyAction, configureStore, ThunkAction } from '@reduxjs/toolkit';
import calculationReducer from '../features/calculation/calculationSlice';

export const store = configureStore({
    reducer: {
        calculation: calculationReducer
    }
});

export type RootState = ReturnType<typeof store.getState>

export type AppDispatch = typeof store.dispatch

export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  AnyAction
>
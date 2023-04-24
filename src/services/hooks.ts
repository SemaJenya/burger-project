import { TypedUseSelectorHook, useDispatch as useDispatchRedux, useSelector as useSelectorRedux } from 'react-redux';
import { AppDispatch, RootState } from './store';

export const  useDispatch = () => useDispatchRedux<AppDispatch>();
export const useSelect: TypedUseSelectorHook<RootState> = useSelectorRedux;
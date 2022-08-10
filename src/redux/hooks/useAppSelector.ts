import {useSelector, TypedUseSelectorHook} from 'react-redux';
import { Rootstate } from '../store';

export const useAppSelector: TypedUseSelectorHook<Rootstate> = useSelector;
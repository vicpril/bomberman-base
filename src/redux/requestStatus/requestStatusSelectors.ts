import { RootState } from 'redux/store';

export const selectIsLoadingShown = (state: RootState) => state.requestStatus.isLoadingShown;

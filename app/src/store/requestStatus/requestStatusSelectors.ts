import { RootState } from 'store/store';

export const selectIsLoadingShown = (state: RootState) => state.requestStatus.isLoadingShown;

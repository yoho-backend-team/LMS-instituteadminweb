// src/store/selectors/branchSelectors.ts
import { type RootState } from '../../../store/store';

export const selectBranches = (state: RootState) => state.authuser.branches;
export const selectLoading = (state: RootState) => state.branches.loading;
export const selectError = (state: RootState) => state.branches.error;
export const selectSearchTerm = (state: RootState) => state.branches.searchTerm;

export const selectFilteredBranches = (state: RootState) => {
	const branches = selectBranches(state);
	const searchTerm = selectSearchTerm(state).toLowerCase();

	return searchTerm
		? branches.filter((branch: any) =>
				branch.cityName.toLowerCase().includes(searchTerm)
		  )
		: branches;
};

export const selectBranchById = (id: string) => (state: RootState) =>
	state.branches.branches.find((branch) => branch.id === id);

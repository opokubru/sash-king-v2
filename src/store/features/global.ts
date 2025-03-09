import { createSlice, PayloadAction } from '@reduxjs/toolkit';

const initialState = {
	targetOrganization: {},
	assignedRole: Array<string>(),
};

const globalSlice = createSlice({
	name: 'global',
	initialState,
	reducers: {
		updateGlobalState: (
			state,
			action: PayloadAction<Partial<typeof initialState>>,
		) => {
			return {
				...state,
				...action.payload,
			};
		},

		resetGlobal: () => {
			return initialState;
		},
	},
});

export const { resetGlobal, updateGlobalState } = globalSlice.actions;

export default globalSlice;

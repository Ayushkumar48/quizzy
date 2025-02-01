export const actions = {
	default: async ({ cookies }) => {
		cookies.delete('username', { path: '/' });
	}
};

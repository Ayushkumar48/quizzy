import Quiz from './model/User';

export async function getUserInformation(username) {
	try {
		if (!username) {
			return null;
		}

		const user = await Quiz.query('username').eq(username).exec();

		if (!user || user.count === 0) {
			return null;
		}

		return {
			data: {
				firstname: user[0].firstname,
				lastname: user[0].lastname,
				username: user[0].username
			}
		};
	} catch (error) {
		console.error('Error fetching user information:', error);
		throw error;
	}
}

import connectDB from '$lib/db';
import { getUserInformation } from '$lib/getuser';

export async function handle({ event, resolve }) {
	try {
		await connectDB();

		const username = event.cookies.get('username');

		if (username) {
			const userInfo = (await getUserInformation(username)).data;
			event.locals.user = userInfo;
		} else {
			event.locals.user = null;
		}

		const response = await resolve(event);
		return response;
	} catch (error) {
		console.error('Hook error:', error.message, error.stack);
		const response = await resolve(event);
		return response;
	}
}

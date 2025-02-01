import Quiz from '$lib/model/User.js';

export async function POST({ request, cookies }) {
	const username = cookies.get('username');
	try {
		const data = (await request.json()).map((item) => {
			if (item === null) return 'nullnull';
			return item;
		});
		const res = await Quiz.update({ username, answers: data });
		return new Response(JSON.stringify({ success: true, res }), {
			status: 200,
			headers: {
				'Content-Type': 'application/json'
			}
		});
	} catch (error) {
		console.error('Error processing request:', error);
		return new Response(JSON.stringify({ success: false, error: 'Invalid request body' }), {
			status: 400,
			headers: {
				'Content-Type': 'application/json'
			}
		});
	}
}

import Quiz from '$lib/model/User';
import { redirect } from '@sveltejs/kit';

async function fetchWithRetry(url, retries = 3, delay = 1000) {
	for (let i = 0; i < retries; i++) {
		try {
			const res = await fetch(url);
			if (res.ok) {
				return await res.json();
			}
			console.warn(`Retry ${i + 1}: HTTP ${res.status}`);
		} catch (err) {
			console.error(`Retry ${i + 1} failed:`, err);
		}
		await new Promise((resolve) => setTimeout(resolve, delay));
	}
	throw new Error('API is not responding');
}

export async function load({ cookies }) {
	const username = cookies.get('username');
	if (!username || username === '') {
		throw redirect('/login');
	}
	try {
		const res = await Quiz.scan('username').contains(username).exec();
		const questions = (await fetchWithRetry('https://api.jsonserve.com/Uw5CrX')).questions;

		return { answers: res[0].answers, questions };
	} catch (err) {
		console.error(err);
	}
}

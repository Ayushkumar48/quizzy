import { error, redirect } from '@sveltejs/kit';

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
	// Disable login check her for development purposes
	if (!username || username === '') {
		redirect(307, '/login');
	}
	try {
		const data = await fetchWithRetry('https://api.jsonserve.com/Uw5CrX');
		return { data };
	} catch (err) {
		console.error('Final Fetch Error:', err);
		throw error(500, 'Failed to load data from API');
	}
}

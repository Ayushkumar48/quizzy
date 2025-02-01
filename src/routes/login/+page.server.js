import Quiz from '$lib/model/User';
import bcrypt from 'bcrypt';
import { fail, redirect } from '@sveltejs/kit';

export const actions = {
	login: async ({ cookies, request }) => {
		try {
			const data = await request.formData();

			const username = data.get('username');
			const password = data.get('password');
			const res = await Quiz.scan('username').contains(username).exec();
			const check = await bcrypt.compare(password, res[0].password);

			if (res.count === 1) {
				if (check) {
					cookies.set('username', username, { path: '/' });
					return { success: true };
				} else {
					return fail(400, { success: false, message: 'Your credentials are invalid!' });
				}
			} else {
				return fail(402, { success: false, message: 'User not found!' });
			}
		} catch (err) {
			console.error(err);
			return fail(500, { success: false, message: 'Internal Server Error' });
		}
	},
	signup: async ({ cookies, request }) => {
		try {
			const regex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;
			const data = await request.formData();
			const firstname = data.get('firstname');
			const lastname = data.get('lastname');
			const username = data.get('username');
			const password = data.get('password');
			const confirmpassword = data.get('confirmpassword');
			if (!firstname || !lastname || firstname.length === 0 || lastname.length === 0) {
				return fail(400, {
					firstname,
					lastname,
					username,
					success: false,
					message: 'Name fields are required!'
				});
			}
			if (!username || username.length < 4) {
				return fail(400, {
					firstname,
					lastname,
					username,
					success: false,
					message: 'Username should be of greater than 4 characters'
				});
			}
			if (!password || !regex.test(password)) {
				return fail(400, {
					firstname,
					lastname,
					username,
					success: false,
					message:
						'Password must be at least 8 characters long and contain at least one letter and one number.'
				});
			}
			if (password !== confirmpassword) {
				return fail(400, {
					firstname,
					lastname,
					username,
					success: false,
					message: 'Both passwords should match.'
				});
			}
			const hashPassword = await bcrypt.hash(password, 10);

			const existingUser = await Quiz.scan('username').contains(username).exec();
			if (existingUser.count !== 0) {
				return fail(402, { success: false, message: 'Username already exists!' });
			}

			const newQuizUser = new Quiz({
				firstname,
				lastname,
				username,
				password: hashPassword,
				answers: []
			});
			await newQuizUser.save();

			cookies.set('username', username, { path: '/' });
		} catch (err) {
			console.error(err);
			return fail(500, { success: false, message: 'Internal Server Error' });
		}
	}
};

export async function load({ cookies }) {
	const username = cookies.get('username');
	if (username && username !== '') {
		redirect(308, '/');
	}
}

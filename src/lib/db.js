import dynamoose from 'dynamoose';
import { AWS_ACCESS_KEY_ID, AWS_REGION, AWS_SECRET_ACCESS_KEY } from '$env/static/private';

let isConnected = false;

export default async function connectDB() {
	if (!isConnected) {
		try {
			const ddb = new dynamoose.aws.ddb.DynamoDB({
				region: AWS_REGION,
				credentials: {
					secretAccessKey: AWS_SECRET_ACCESS_KEY,
					accessKeyId: AWS_ACCESS_KEY_ID
				}
			});
			dynamoose.aws.ddb.set(ddb);
			isConnected = true;
			console.log('Connected to DynamoDB successfully.');
		} catch (error) {
			console.error('Error connecting to DynamoDB:', error);
			throw error;
		}
	}
}

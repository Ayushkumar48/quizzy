import dynamoose from 'dynamoose';

const quizSchema = new dynamoose.Schema({
	username: String,
	firstname: String,
	lastname: String,
	password: String,
	answers: {
		type: Array,
		schema: [
			{
				type: String,
				required: false,
				allowNull: true
			}
		],
		default: []
	},
	timestamp: {
		type: Date,
		default: Date.now
	}
});

const Quiz = dynamoose.model('quiz', quizSchema);
export default Quiz;

import * as express from 'express';
import * as cors from 'cors';
import * as bodyparser from 'body-parser';

import { requestLoggerMiddleware } from './request.logger.middleware';
import '../todo.controller';
import  './../controllers/user/UserController';

import { RegisterRoutes } from '../routes/Routes';
import * as swaggerUi from 'swagger-ui-express';

const app = express();
app.use(cors());
app.use(bodyparser.json());

app.use(requestLoggerMiddleware);
RegisterRoutes(app);

try {
	const swaggerDocument = require('../../swagger.json');
	app.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));
} catch (err) {
	console.error('Unable to read swagger.json', err);
}

export const token ={
	secret: 'you do not know secret',
	tokens:{
		access:{
			type:'access',
			expiresIn:'45m'
		},
		refresh:{
			type: 'refresh',
			expiresIn: '60m'
		}
	}
};


export { app };

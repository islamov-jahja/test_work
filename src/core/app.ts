import * as express from 'express';
import * as cors from 'cors';
import * as bodyparser from 'body-parser';

import { requestLoggerMiddleware } from './request.logger.middleware';
import  './../controllers/user/UserController';

import { RegisterRoutes } from '../routes/Routes';
import * as swaggerUi from 'swagger-ui-express';

const app = express();
app.use(cors());
app.use(bodyparser.json());

app.use(requestLoggerMiddleware);
RegisterRoutes(app);
app.use(swaggerUi.serve);
app.use(express.static('./'));
try {
	//const swaggerDocumentUser = require('../docs/user.json');
	//const swaggerDocumentTheme = require('../docs/theme.json');
	const swaggerDocument = require('../docs/swagger.json');
	app.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));
	//app.use('/docs/theme', swaggerUi.setup(swaggerDocumentTheme));
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
		},
	}
};


export { app };

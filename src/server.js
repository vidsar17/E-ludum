import express from 'express';
import engine from 'react-engine';
import path from 'path';
import webpack from 'webpack';
import webpackDevMiddleware from 'webpack-dev-middleware';
import webpackConfig from  '../webpack.config';
import routes from './routes/routes.js';
import morgan from 'morgan';

//inicializacion:
const app = express();

//configurar:
app.set('port', process.env.PORT || 3303);

//middleware:
app.use(webpackDevMiddleware(webpack(webpackConfig)));
app.use(express.json());
app.use(morgan('dev'))

//rutas:
app.use(routes);

//run server:
app.listen(app.get('port'), () => {
    console.log('server on port ', app.get('port'));
});


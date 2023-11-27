import cors from 'cors';
import express from 'express';
import passport from 'passport';
import config from './config/config';
import authRoutes  from './routes/auth.routes';
import privateRoutes from './routes/private.routes';
import passportMiddleware from './middlewares/passport';

export const app = express();

app.set('port', config.port);

app.use(cors());
app.use(express.json());
app.use(passport.initialize());
app.use(express.urlencoded({ extended: false }));
app.use(authRoutes);
passport.use(passportMiddleware);
app.use(privateRoutes);

app.get ('/', (req, res) => {
  res.send('The API is at http://localhost:' + app.get('port'));
});
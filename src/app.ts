import cors from 'cors';
import express from 'express';
import passport from 'passport';
import authRoutes  from './routes/auth.routes';
import passportMiddleware from './middlewares/passport';

export const app = express();

app.set('port', process.env.PORT || 3000);

app.use(cors());
app.use(express.json());
app.use(passport.initialize());
app.use(express.urlencoded({ extended: false }));
app.use(authRoutes);
passport.use(passportMiddleware);

app.get ('/', (req, res) => {
  res.send('The API is at http://localhost:' + app.get('port'));
});
import cors from 'cors';
import express from 'express';
import passport from 'passport';
import passportMiddleware from './middlewares/passport';

export const app = express();

app.set('port', process.env.PORT || 3000);

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(passport.initialize());
passport.use(passportMiddleware);

app.get ('/', (req, res) => {
  res.send('The API is at http://localhost:' + app.get('port'));
});
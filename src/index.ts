import { app } from './app';

app.listen(app.get('port'), () => {
    console.log('API: Server running on port', app.get('port'));
});
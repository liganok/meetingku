/**
 * Created by Administrator on 2017/4/27.
 */
import 'babel-register';
import Express from 'express';
import {default as Logger} from 'morgan';
import Path from 'path';

const app = Express();
app.set('port', process.env.PORT || 3000);
app.use(Logger('dev'));
app.use(Express.static(Path.join(__dirname, 'build')));

app.use('/', function (request, response) {
  response.sendFile(path.resolve(__dirname, '../build', 'index.html'));
});


app.listen(app.get('port'), function () {
  console.log('Express server listening on port ' + app.get('port'));
});

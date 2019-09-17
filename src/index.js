const app = require('./app.js');
const server = require('./config/server.js');
const vlog = console.log;

app.post('/image', require('./handles/poster.js'));

app.listen(server.port, () => {
    vlog('服务器启动成功')
})
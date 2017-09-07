var Client = require('ssh2').Client;
var co=require('co')
var thunkify=require('thunkify')
var fs=require('fs')
var path=require('path')

var conn1 = new Client();
var conn2 = new Client();

var argv=process.argv;
if(argv.length<3){
  return console.log('请传入namespace')
}
var namespace=argv[2]

var {jump,server,serverPath}=require('../config/server.json')
var config=require('../config/config.json')[namespace]

// 引入 events 模块
var events = require('events');
// 创建 eventEmitter 对象
var serverEmitter = new events.EventEmitter();

const resourceHost='http://m.xianzaishi.net';

conn1.on('ready', function() {
  console.log('跳板机连接成功');
  conn1.exec('nc '+server.host+' 22', function(err, stream) {
    if (err) {
      console.log('跳板机连接失败:' + err);
      return conn1.end();
    }
    conn2.connect({
      sock: stream,
      username: server.username,
      password: server.password
    });
  });
}).connect(jump);

conn2.on('ready', function() {
  console.log('测试机连接成功');
  const localDir=path.join(process.cwd(),config.path,config.dir)
  const remoteDir=config.serverPath||path.join(serverPath,namespace)

  conn2.sftp((err,sftp)=>{
    if(err){
      console.log('上传文件失败')
      serverEmitter.emit("end")
      return;
    }
    var files=fs.readdirSync(localDir)
    var count=0;
    for(var i=0;i<files.length;i++){
      (function(i){
        sftp.fastPut(path.join(localDir,files[i]),path.join(remoteDir,files[i]),(err)=>{
          count++;
          if(count===files.length){
            serverEmitter.emit('end')
          }
          if(err){
            console.log(err)
            return;
          }
          console.log(`上传成功:${config.host||(resourceHost+'/'+namespace)}/${files[i]}`)
        });
      })(i)
    }

  })

});
serverEmitter.on('end',()=>{
  conn2.end();
  conn1.end();
})

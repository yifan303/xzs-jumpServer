var io = require('socket.io-client')();

var config = require('../../../config/config.json');
var store = Object.keys(config).reduceRight(($1,$2)=>{
  $1[$2]={};
  return $1;
},{});


import "./component.less";
import "./index.less";
import navHtml from './navbar.html'
import _ from 'underscore'

var handleText = text => {
  return text.replace(/(http|https)(.*?)(?:\n|$)/g,(s,$1)=>{
    return `<a target="_blank" href="${s}">${s}</a>`
  });
};

document.title="前端测试环境发布";

$(e=>{

  var body = $('body');

  // navbar
  var navbar = $(_.template(navHtml)({config}))
  navbar.on('click','.navbar-nav a',e=>{
    var target=$(e.target)
    navbar.find('.navbar-nav li').removeClass('active')
    target.parent().addClass('active')

    var frame=$(`.frame-box`);
    frame.hide()
    return $(`.frame-box[target=${target.attr('target-name')}]`).show()
  })

  body.append(navbar)

  var frame = $('<div class="frame"></div>');

  body.append(frame);

  var appendLineTo=text=>{

    var response = JSON.parse(text);
    var log = (store[response.namespace]||{}).log;
    var line = $(`<div class="line"></div>`);

    if(!log){return;}
    line.html(handleText(response.msg));
    log.append(line);

    log[0].scrollTop=log[0].scrollHeight;

  };


  for(var i in config){

    // 点击运行按钮
    var box = store[i].box = $(`<div target="${i}" class="frame-box"></div>`);
    var a = store[i].btn = $(`<a href="javascript:void(0)">${config[i].text}</a>`);
    a.addClass('run-btn mu-raised-button-primary mu-raised-button mu-box-shadow');

    box.append(a);

    // 输出log
    var log = store[i].log = $(`<pre class="log mu-log-panel mu-box-shadow"></pre>`);
    box.append(log);

    frame.append(box);

    (function(i){
      $(a[0]).on('click',e=>{
        io.emit('script-start',i);
        appendLineTo(JSON.stringify({namespace:i,msg:'发布启动'}))
      })
    })(i);
  }

  io.on('script-log',appendLineTo);
  io.on('script-end',data=>{
    var m = store[data];
    if(!m){return;}
    m.log.append(`<div class="line line-end">${data}发布结束</div>`)
    log[0].scrollTop=log[0].scrollHeight;
  });

  navbar.find('.navbar-nav a').eq(0).trigger('click')

});

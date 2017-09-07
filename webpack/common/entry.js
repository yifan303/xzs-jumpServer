var path=require('path')
var fs=require('fs')
var HtmlWebpackPlugin = require('html-webpack-plugin')

var pageDir=path.join(__dirname,'../../src/page')
var folders=fs.readdirSync(pageDir)
var entry={}
var htmlConfig=[]

// 需要忽略的页面，比如一些已经下线的页面,还有.DS_Store
var ignore = ['.DS_Store']

for(var i=0;i<folders.length;i++){
  if(ignore.indexOf(folders[i])>-1){
    continue;
  }
  entry[folders[i]]=[require.resolve(path.join(pageDir,folders[i]))]
  htmlConfig.push(
    new HtmlWebpackPlugin({
      chunks: ['manifest','zzlib',folders[i]],
      template:'./webpack/common/template.html',
      filename:`${folders[i]}.html`
    })
  )
}


module.exports={
  entry,
  htmlConfig
}

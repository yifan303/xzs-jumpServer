var path = require('path')
var node_modules = path.resolve(__dirname,'../../node_modules')

module.exports={
  // lib
  lib:{
    zzlib:['underscore']
  },
  resolve:{
    "alias":{
      "widget":path.resolve(__dirname,'../../src/widget')
    //   "ant":path.resolve(node_modules,'antd','dist/antd.min.js'),
    //   "react":path.resolve(node_modules,'react','dist/react.min.js'),
    //   'react-dom':path.resolve(node_modules,'react-dom','dist/react-dom.min.js')
    }
  }
};

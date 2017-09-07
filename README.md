# deploy
前端测试环境发布工具

- 测试分支 `develop`
- 发布脚本 `npm run qa`
- 发布项目目录 'deploy-projects'

#### 配置文件

````

// 项目配置 config/config.json
{
  "activity":{
    "text":"发布活动",
    "path":"./deploy-projects/activity",
    "branch":"develop",
    "dir":"dist"
  }
}

// ssh配置 config/server.json
{
  "jump":{
    "host":"跳板机ip",
    "username":"跳板机username",
    "password":"跳板机password"
  },
  "server":{
    "host":"测试环境ip",
    "username":"测试环境username",
    "password":"测试环境password"
  },
  "serverPath":"/usr/works/root/h5"
}

````

### 开发

````

npm install
npm install webpack-dev-server -g
npm run dev
npm run dev-server

````

### 部署

````
npm install
npm install pm2 -g
npm run server

````

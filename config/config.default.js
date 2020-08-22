/* eslint valid-jsdoc: "off" */

'use strict'

/**
 * @param {Egg.EggAppInfo} appInfo app info
 */
module.exports = appInfo => {
  /**
   * built-in config
   * @type {Egg.EggAppConfig}
   **/
  const config = exports = {}

  // use for cookie sign key, should change to your own and keep security
  config.keys = appInfo.name + '_1597920257392_9854'

  // add your middleware config here
  config.middleware = ['proxy']

  // add your user config here
  const userConfig = {
    // myAppName: 'egg',
  }

  // 数据库配置信息
  config.sequelize = {
    dialect: 'mysql',
    host: '114.67.208.187',
    port: 3306,
    database: 'gaokao',
    // 数据库连接的用户和密码
    username: 'gaokao',
    password: 'gaokao',
    // 是否自动进行下划线转换（这里是因为DB默认的命名规则是下划线方式，而我们使用的大多数是驼峰方式）
    underscored: true,
    // 时区，sequelize有很多自动时间的方法，都是和时区相关的，记得设置成东8区（+08:00）
    timezone: '+08:00',
  }

  // swigger
  config.swaggerdoc = {
    dirScanner: './app/controller', // 配置自动扫描的控制器路径。
    // 接口文档的标题，描述或其它。
    apiInfo: {
      title: 'EngineChina API', // 接口文档的标题。
      description: 'swagger-ui for NAPI document.', // 接口文档描述。
      version: '1.0.0', // 接口文档版本。
    },
    schemes: [ 'http', 'https' ], // 配置支持的协议。
    consumes: [ 'application/json' ], // 指定处理请求的提交内容类型（Content-Type），例如application/json, text/html。
    produces: [ 'application/json' ], // 指定返回的内容类型，仅当request请求头中的(Accept)类型中包含该指定类型才返回。
    securityDefinitions: { // 配置接口安全授权方式。
      // apikey: {
      //   type: 'apiKey',
      //   name: 'clientkey',
      //   in: 'header',
      // },
      // oauth2: {
      //   type: 'oauth2',
      //   tokenUrl: 'http://petstore.swagger.io/oauth/dialog',
      //   flow: 'password',
      //   scopes: {
      //     'write:access_token': 'write access_token',
      //     'read:access_token': 'read access_token',
      //   },
      // },
    },
    enableSecurity: false, // 是否启用授权，默认 false（不启用）。
    // enableValidate: true,    // 是否启用参数校验，默认 true（启用）。
    routerMap: true, // 是否启用自动生成路由，默认 true (启用)。
    enable: true, // 默认 true (启用)。
  }

  // 接口代理
  config.proxy = {
    '/api/v2': {
        target: 'https://q.e-spy.cn/',
        changeOrigin: true,
        secure: false,
        pathRewrite: { '^/api/v2': 'api' },
    },
  }

  // 跨域问题
  // config.security = {
  //   // csrf: {
  //   //   enable: false,
  //   //   ignoreJSON: true
  //   // },
  //   domainWhiteList: ['http://localhost:8080']
  // }
  config.cors = {
    origin:'*',
    allowMethods: 'GET,HEAD,PUT,POST,DELETE,PATCH'
  }

  return {
    ...config,
    ...userConfig,
  }
}

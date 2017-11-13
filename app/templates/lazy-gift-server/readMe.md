###发布消息 接口

接口地址：
  /publish.json
  
参数：
  p = {
    "uname": "slh",
    "title": "去烧烤需要带什么",
    "items": [
      {
          "detail_level": 1,
          "title": "烧烤工具",
          "content": "qsqqqqqq"
      },
      {
          "detail_level": 2,
          "title": "烧烤食材",
          "content": "啊啊啊啊啊啊"
       },
       {
          "detail_level": 3,
          "title": "烧烤调味料",
          "content": "等等等等等等"
       }
    ]
  }
  
返回：
 {
    success: true/false,   //成功或失败
    message: '失败原因'     //查询失败原因
 }



###获取列表 接口

接口地址：
 ／detail.json
 
参数：
 p = {
    "start": 1, //分页页数
    "limit": 10 //每页获取条数
 }

返回：数据，时间戳
 {
 }

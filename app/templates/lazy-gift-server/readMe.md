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



###推荐 接口

接口地址：
 ／recommend.json
 
参数：
 p = {
    "start": 1, //分页页数
    "limit": 10 //每页获取条数
    "timestamp": "2017-11-15T02:42:22.263Z"  //第一次请求不带该参数，后续请求需要
 }

返回：数据，时间戳
 {
   success: true/false,  //成功或失败,注：数据全部加载完成返回 false
   message："失败原因",     //数据全部加载完显示："没有更多数据"
   firstTime： "2017-11-15T02:42:22.263Z",
   result:[
      {
        id: 50,
        name: 'slh',
        header_url: 'url',
        title: '去烧烤要带什么',
        date: '1510620431',
        interest_count: 3,
        uninterest_count: 4,
        items:[
          {
            detail_level: 1,
            brief: '烧烤工具',
            content: '烧烤架、烧烤冰块'
          }        
        ]
      }
   ]
 }
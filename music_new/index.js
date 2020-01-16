const rp = require("request-promise");
exports.main = async (event, context) => {
  var url = `http://jsonp.bolefx.xyz/jsonp/get?url=http://musicapi.qianqian.com/v1/restserver/ting?from=android&version=8.1.6.1&channel=xiaomi&operator=3&method=baidu.ting.plaza.getNewest&type_id=1&page=${event.page}&size=${event.page}`
  return rp(url)
    .then(res => {
      return res;
    })
    .catch(err => {
      console.log(err)
    })
}
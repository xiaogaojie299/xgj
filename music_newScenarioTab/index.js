const rp = require("request-promise");
exports.main = async (event, context) => {
  var url = `https://musicapi.qianqian.com/v1/restserver/ting?method=baidu.ting.ugcdiy.getSceneDiy&label_id=${event.lable_id}&offset=${event.offset}&size=${event.size}&style_id=${event.style_id}&cuid=c603078e833d651cab813981a93852ac8e830ead&channel=appstore&from=ios&version=8.1.7`
  return rp(url)
    .then(res => {
      return res;
    })
    .catch(err => {
      console.log(err)
    })
}
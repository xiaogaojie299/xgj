// pages/newMusic/newMusic.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    page:1,
    size:1,
    list:[],
    // 获取歌单列表的page1
    page1:0,
    list1:[],
    //获取最新场景的size
    size1:0,
    list2:[]
  },
  // 访问千千音乐接口
  getmusicnew:function(){
      //功能：分页查询千千音乐中的数据
      //1.在data中添加page页参数
      //2.调用page这个参数
      //page:0;
      //3.获取云函数且返回结果
      wx.cloud.callFunction({
        name:"music_new",
        data:{
          page:this.data.page,
          size: this.data.size
        }
      }).then(res=>{
        var res=JSON.parse(res.result);
        var list=res.result.list;
        console.log(list);
        this.setData({
          list: list,
          //id:id
        })
      })
  },
  // 访问最新歌单接口
  getmusicnewPlaylist:function(){
    //功能：访问最新分歌单中的数据
    //1.在data中定义页码page1,list1;
    wx.cloud.callFunction({
      name:"music_newPlaylist",
      data:{
        page: this.data.page1++
      }
    }).then(res=>{
      var res=JSON.parse(res.result);
      var list1 = this.data.list1.concat(res.result.list);
      
      this.setData({
        list1:list1
      })
     
    })
  },
  //访问最新场景接口
  getmusicnewScenario:function(){
    wx.cloud.callFunction({
      name:"music_newScenario",
      data:{
        size:this.data.size1+=10
      }
    }).then(res=>{
      var res=JSON.parse(res.result);
      var list2=this.data.list2.concat(res.result.list);
      this.setData({
        list2:list2
      })
    })
  },
  // 跳转
  jumpScenarioIndex(event){
    //console.log(`跳转成功`);
    var lable_id = event.currentTarget.dataset.id;
    var url =`/pages/music_newScenarioIndex/music_newScenarioIndex?lable_id=${lable_id}`;
    wx.navigateTo({
      url: url
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getmusicnew();
    this.getmusicnewPlaylist();
    this.getmusicnewScenario();
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
    //this.getmusicnewPlaylist()
    //console.log(123);
    this.getmusicnewPlaylist();
    //this.getmusicnewScenario();
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})
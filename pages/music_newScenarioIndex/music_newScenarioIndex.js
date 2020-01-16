// pages/music_newScenarioIndex/music_newScenarioIndex.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    lable_id:0,
    // 电台列表
    list:[],
    // 每页显示多少条数据
    size:10,
    active:0,
    // 每页数据显示
    size1:10,
    list1:[],
    style_id:0,
    offset:-10,
    //如果没有数据则提示我是有底线的
    tabbool:true
  },
  // 获取拿到的tab标签栏中的值
  onChange(event){
    //获取label_id
    var style_id = this.data.list.label_info.rec_label[event.detail.index].label_id;
    this.setData({
      tabbool:true,
      offset:-10,
      style_id: style_id
    })
    //this.getmusic_newScenarioIndex(label_id);
    this.data.list1 = [];
    this.getmusic_newScenarioTab(style_id);
  },
  // 点击tab中的标签向服务器发送请求
  getmusic_newScenarioTab(style_id){
    var offset=this.data.offset;
    this.setData({
      offset:offset+10
    });
    wx.cloud.callFunction({
      name:"music_newScenarioTab",
      data:{
        lable_id: this.data.lable_id,
        offset:offset += 10,//this.data.offset+=10
        size: this.data.size1, 
        style_id: style_id
      }
    }).then(res=>{
      // this.setData({
      //   list1: 0
      // });
      var list1=JSON.parse(res.result).result.diy_list;
      if(!list1||list1.length<10){
        console.log(`小于10`);
        this.setData({
          tabbool:false
        })
      }
      list1 = this.data.list1.concat(list1);
      this.setData({
        list1: list1
      })
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      lable_id: options.lable_id,
      active: options.lable_id
    });
  },
  getmusic_newScenarioIndex(lable_id) {
    // 引入music_newScenarioIndex云函数
    console.log(lable_id)
    wx.cloud.callFunction({
      name: "music_newScenarioIndex",
      data: {
        lable_id:lable_id,
        size: this.data.size
      }
    }).then(res => {
      var list=JSON.parse(res.result).result;
      console.log(list);
      list.label_info.rec_label.unshift({ lable_id: this.data.lable_id,title:"全部"});
      console.log(list);
      this.setData({
        list:list
      })
      this.getmusic_newScenarioTab(this.data.lable_id);
    })
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    this.getmusic_newScenarioIndex(this.data.lable_id); 
    //this.getmusic_newScenarioTab()
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

      if(this.data.tabbool){
        this.getmusic_newScenarioTab(this.data.style_id);
      }else{
        wx.hideLoading(); //隐藏加载提示框
        wx.showToast({
          title: '我是有底线的',
        })
      }
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})
/**
 * 请求相关的封装
 */

const baseUrl = "https://longhuangroup.top/longhuan-api/v1/"; // 接口地址
const FormData = require('../miniprogram_npm/@zlyboy/wx-formdata/index.js');

/**
 * 封装请求
 */
function fetch(options) {
  if (options.loading) {
    wx.showLoading({
      title: '加载中',
      mask: true
    })
  }
  return new Promise((resolve, reject) => {
    wx.request({
      url: baseUrl + options.url,
      data: options.data,
      header: {
        'Authorization': "Bearer " + wx.getStorageSync("openid"),
        ...options.header
      },
      method: options.method,
      success: function (res) {
        if (options.loading) {
          wx.hideLoading()
        }
        console.log(res);
        if (res.statusCode != 200) {
          wx.showToast({
            title: '网络错误：' + res.errMsg,
          })
          return;
        }
        resolve(res.data); //把请求到的数据发到引用请求的地方
      },
      fail: function (err) {
        if (options.loading) {
          wx.hideLoading()
        }
        wx.showToast({
          title: "网络连接超时",
          icon: 'none',
          duration: 3000,
        })
      }
    })
  })
}
/**
 * POST 请求
 */
export function post(url, params, loading = true) {
  console.log(params, loading);
  let formData = new FormData();
  for (let k in params) {
    formData.append(k, params[k]);
  }
  let data = formData.getData();
  console.log(data);
  console.log(data.contentType);
  var option = {
    url,
    data: data.buffer,
    method: 'POST',
    header: {
      'Content-Type': data.contentType
    },
    loading
  }
  return fetch(option);
}

/**
 * GET请求
 */
export function get(url, params, loading = true) {
  console.log(params, loading);
  var option = {
    url,
    header: {
      "Content-Type": "application/www-form-urlencoded"
    },
    data: params,
    method: 'GET',
    loading
  }
  return fetch(option);
}

module.exports = {
  get,
  post
}
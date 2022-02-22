/**
 * 请求相关的封装
 */

import {TEST_BACKEND_URL} from '../common';

const baseUrl = TEST_BACKEND_URL; // 接口地址

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
      success: function(res) {
        if (options.loading) {
          wx.hideLoading()
        }
        console.log(res);
        if(res.statusCode != 200) {
          wx.showToast({
            title: '网络错误：' + res.errMsg,
          })
          return;
        }
        if (res.data.status != 1) {
          wx.showToast({
            title: '数据错误：' + res.data.msg,
          })
          return;
        }
        resolve(res.data); //把请求到的数据发到引用请求的地方
      },
      fail: function(err) {
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
  var option = {
    url: url,
    data: params,
    method: 'POST',
    loading
  }
  return fetch(option);
}

/**
 * GET请求
 */
export function get(urls, header, params, loading = true) {
  console.log(params, loading);
  var option = {
    url: urls,
    header: header,
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
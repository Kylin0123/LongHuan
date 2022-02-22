package com.longhuan.wechatapp.result;

import lombok.Data;

@Data
public class WechatResult<T> implements JsonResult<T> {
    //状态码
    private int status;
    //提示信息
    private String msg;
    //推送的数据
    private T data;

    /**
     * 若请求数据时缺失参数，设置状态码为 0，提示信息为“请求参数缺失！”
     */
    public WechatResult() {
        this.status = 0;
        this.msg = "请求参数缺失！";
    }

    /**
     * 若没有数据返回，可以人为指定状态码和提示信息
     * @param status
     * @param msg
     */
    public WechatResult(int status, String msg) {
        this.status = status;
        this.msg = msg;
    }

    /**
     * 有数据返回时，状态码为 1，默认提示信息为“获取数据成功！”
     * @param data
     */
    public WechatResult(T data) {
        this.data = data;
        this.status = 1;
        this.msg = "获取数据成功！";
    }


    /**
     * 有数据返回，状态码为 1，人为指定提示信息
     * @param data
     * @param msg
     */
    public WechatResult(T data, String msg) {
        this.status = 1;
        this.msg = msg;
        this.data=data;
    }

}

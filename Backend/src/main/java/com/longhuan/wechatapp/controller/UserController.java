package com.longhuan.wechatapp.controller;

import com.longhuan.wechatapp.result.AdminResult;
import com.longhuan.wechatapp.result.WechatResult;
import com.longhuan.wechatapp.entity.User;
import com.longhuan.wechatapp.service.UserService;
import org.apache.http.HttpEntity;
import org.apache.http.client.config.RequestConfig;
import org.apache.http.client.methods.CloseableHttpResponse;
import org.apache.http.client.methods.HttpGet;
import org.apache.http.impl.client.CloseableHttpClient;
import org.apache.http.impl.client.HttpClientBuilder;
import org.apache.http.util.EntityUtils;
import com.alibaba.fastjson.JSON;
import com.alibaba.fastjson.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;

@RestController
public class UserController {

    @RequestMapping(path = "/hello", method = RequestMethod.GET)
    public String hello() {
        return "hello";
    }

    @Autowired
    private UserService userService;

    @Value("${wechat.appid}")
    public String appid;

    @Value("${wechat.secret}")
    public String secret;

    @RequestMapping(path = "login", method = RequestMethod.POST, consumes = "multipart/form-data")
    public WechatResult login(@RequestParam String code) {
        try {
            String[] res = getOpenid(code);
            String openid = res[0];
            String session_key = res[1];
            int _3rd_session = (openid + session_key).hashCode();

            // 检查数据库中是否有该openid的用户
            HashMap<String, Object> map = new HashMap<>();
            map.put("openid", openid);
            List<User> userList = userService.listByMap(map);

            if(userList.size() == 0) {
                User user = new User();
                user.setOpenid(openid);
                userService.save(user);
            }

            JSONObject jsonObject = new JSONObject();
            jsonObject.put("openid", openid);
            jsonObject.put("session", _3rd_session);
            return new WechatResult(jsonObject);
        } catch (Exception e) {
            e.printStackTrace();
        }
        return new WechatResult();
    }

    private String[] getOpenid(String code) throws Exception {
        System.out.println("code:" + code);
        String url = "https://api.weixin.qq.com/sns/jscode2session";
        url += "?appid=" + appid;//自己的appid
        url += "&secret=" + secret;//自己的appSecret
        url += "&js_code=" + code;
        url += "&grant_type=authorization_code";
        url += "&connect_redirect=1";
        CloseableHttpClient httpClient = HttpClientBuilder.create().build();
        // DefaultHttpClient();
        HttpGet httpget = new HttpGet(url);    //GET方式
        CloseableHttpResponse response = null;
        String res = null;
        // 配置信息
        RequestConfig requestConfig = RequestConfig.custom()          // 设置连接超时时间(单位毫秒)
                .setConnectTimeout(5000)                    // 设置请求超时时间(单位毫秒)
                .setConnectionRequestTimeout(5000)             // socket读写超时时间(单位毫秒)
                .setSocketTimeout(5000)                    // 设置是否允许重定向(默认为true)
                .setRedirectsEnabled(false).build();           // 将上面的配置信息 运用到这个Get请求里
        httpget.setConfig(requestConfig);                         // 由客户端执行(发送)Get请求
        response = httpClient.execute(httpget);                   // 从响应模型中获取响应实体
        HttpEntity responseEntity = response.getEntity();
        System.out.println("响应状态为:" + response.getStatusLine());
        if (responseEntity != null) {
            res = EntityUtils.toString(responseEntity);
            System.out.println("响应内容长度为:" + responseEntity.getContentLength());
            System.out.println("响应内容为:" + res);
        }
        // 释放资源
        if (httpClient != null) {
            httpClient.close();
        }
        if (response != null) {
            response.close();
        }
        JSONObject jo = JSON.parseObject(res);
        String openid = jo.getString("openid");
        String session_key = jo.getString("session_key");
        String[] result = new String[2];
        result[0] = openid;
        result[1] = session_key;
        return result;
    }

    @RequestMapping(path = "user", method = RequestMethod.GET)
    public WechatResult user(@RequestParam String openid) {
        User user = userService.getById(openid);

        JSONObject jsonObject = new JSONObject();
        jsonObject.put("user", user);
        return new WechatResult(jsonObject);
    }

    @RequestMapping(path = "/user", method = RequestMethod.POST, consumes = "multipart/form-data")
    public WechatResult addUser(User user) {
        userService.saveOrUpdate(user);
        WechatResult result = new WechatResult(1, "用户信息更新成功！");
        return result;
    }

}

package com.longhuan.wechatapp.entity;

import com.baomidou.mybatisplus.annotation.TableId;
import lombok.Data;

@Data
public class User {
    @TableId
    private String openid;

    private String username;

    private Integer age;

    private Boolean gender;

    private String phone;

    private String wxId;

    private String email;

    private String personalInfo;
}

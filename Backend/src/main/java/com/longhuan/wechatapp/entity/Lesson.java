package com.longhuan.wechatapp.entity;

import lombok.Data;

@Data
public class Lesson {
    private Integer id;
    private String name;
    private Integer residualNum;
    private Integer totalNum;
    private String price;
    private String descInfo;
    private String title;
    private String image;
}

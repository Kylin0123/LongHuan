package com.longhuan.wechatapp.entity;

import com.baomidou.mybatisplus.annotation.TableId;
import lombok.Data;

@Data
public class UserJoinLesson {
    @TableId
    private String userOpenid;
    private Integer lessonId;
}

package com.longhuan.wechatapp.controller.admin;

import com.alibaba.fastjson.JSONObject;
import com.longhuan.wechatapp.entity.Lesson;
import com.longhuan.wechatapp.result.AdminResult;
import com.longhuan.wechatapp.service.LessonService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.autoconfigure.kafka.KafkaProperties;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping(path = "/admin")
public class AdminLessonController {
    @Autowired
    private LessonService lessonService;

    @RequestMapping("/getLessonAll")
    public AdminResult adminLessons() {
        List<Lesson> lessons = lessonService.list();
        JSONObject jsonObject = new JSONObject();
        jsonObject.put("lessons", lessons);
        AdminResult adminResult = new AdminResult(jsonObject);
        adminResult.setCode(20000);
        return adminResult;
    }

    @RequestMapping(path = "/saveOrUpdateLesson", method = RequestMethod.POST, consumes = "application/json")
    public AdminResult addLesson(@RequestBody Lesson lesson) {
        lessonService.saveOrUpdate(lesson);
        AdminResult adminResult = new AdminResult(20000, "数据修改成功！");
        return adminResult;
    }

    @RequestMapping(path = "/deleteLesson")
    public AdminResult deleteLesson(@RequestParam int id) {
        Lesson lesson = new Lesson();
        lesson.setId(id);
        lessonService.removeById(lesson);
        AdminResult adminResult = new AdminResult(20000, "数据删除成功！");
        return adminResult;
    }

}

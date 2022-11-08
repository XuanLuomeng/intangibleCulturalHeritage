package com.intangibleCulturalHeritage.controller;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.intangibleCulturalHeritage.pojo.IntangibleRecords;
import com.intangibleCulturalHeritage.service.IntangibleRecordsService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;

import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.util.List;

@Controller
public class IntangibleRecordsController {
    @Autowired
    private IntangibleRecordsService intangibleRecordsService;

    @RequestMapping("/IntangibleRecords")
    public void getIntangibleRecords(HttpServletResponse response) throws IOException {
        List<IntangibleRecords> intangibleRecords = intangibleRecordsService.getAllRecords();
        /**
         * 将IntangibleRecords序列化为json返回给客户端
         */
        ObjectMapper mapper = new ObjectMapper();
        String json = mapper.writeValueAsString(intangibleRecords);
        //设置content-type防止乱码问题
        response.setContentType("application/json;charset=utf-8");
        response.getWriter().write(json);
    }
}

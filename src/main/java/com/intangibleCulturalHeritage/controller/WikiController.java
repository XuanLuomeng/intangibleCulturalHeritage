package com.intangibleCulturalHeritage.controller;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.intangibleCulturalHeritage.pojo.Page;
import com.intangibleCulturalHeritage.pojo.WikiPedia;
import com.intangibleCulturalHeritage.service.WikiService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import javax.servlet.http.HttpServletResponse;
import java.io.IOException;

@Controller
public class WikiController {
    @Autowired
    private WikiService wikiService;

    /**
     * 通过查询获取wiki内容
     */
    @ResponseBody
    @RequestMapping("/wikiInfo")
    public void GetWikiPageInfo(String title,String currentPageStr, HttpServletResponse response) throws IOException {
        /**
         * 处理参数
         */
        int currentPage = 0;
        if (currentPageStr != null && currentPageStr.length() > 0) {
            currentPage = Integer.parseInt(currentPageStr);
        } else {
            currentPage = 1;
        }
        if (title == null || title.length() < 0) {
            title = "";
        }

        /**
         * 查询Page对象
         */
        Page<WikiPedia> page = null;
        page = wikiService.getWikiPageInfo(currentPage, title);

        /**
         * 将page序列化为json返回给客户端
         */
        ObjectMapper mapper = new ObjectMapper();
        String json = mapper.writeValueAsString(page);
        //设置content-type防止乱码问题
        response.setContentType("application/json;charset=utf-8");
        response.getWriter().write(json);
    }
}

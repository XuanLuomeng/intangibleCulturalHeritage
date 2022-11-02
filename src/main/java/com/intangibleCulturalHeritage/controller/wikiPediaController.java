package com.intangibleCulturalHeritage.controller;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.intangibleCulturalHeritage.pojo.Page;
import com.intangibleCulturalHeritage.pojo.WikiPedia;
import com.intangibleCulturalHeritage.service.WikiPediaService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;

import javax.servlet.http.HttpServletResponse;
import java.io.IOException;

@Controller
public class wikiPediaController {
    @Autowired
    private WikiPediaService wikiPediaService;

    /**
     * 获取wiki的分页内容
     */
    @RequestMapping("/wikiInfo")
    public void GetWikiPageInfo(String currentPageStr,String title,HttpServletResponse response) throws IOException {
        /**
         * 获取请求参数
         */
        System.out.println(title);

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
        page = wikiPediaService.getWikePediaPageInfo(currentPage, title);

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

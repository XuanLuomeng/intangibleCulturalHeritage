package com.intangibleCulturalHeritage.controller;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.intangibleCulturalHeritage.pojo.WikiPedia;
import com.intangibleCulturalHeritage.service.WikiPediaService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import javax.servlet.http.HttpServletResponse;
import java.io.IOException;

@Controller
public class WikiPediaController {
    @Autowired
    private WikiPediaService wikiPediaService;

    /**
     * 通过查询获取wiki内容
     */
    @ResponseBody
    @RequestMapping("/wikiPediaInfo")
    public void GetWikiPageInfo(String title, HttpServletResponse response) throws IOException {
        if (title != null) {
            WikiPedia wikiPedia = wikiPediaService.getWikePediaInfo(title);

            /**
             * 将wikiPedia序列化为json返回给客户端
             */
            ObjectMapper mapper = new ObjectMapper();
            String json = mapper.writeValueAsString(wikiPedia);
            //设置content-type防止乱码问题
            response.setContentType("application/json;charset=utf-8");
            response.getWriter().write(json);
        }
    }
}

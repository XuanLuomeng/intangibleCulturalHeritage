package com.intangibleCulturalHeritage.controller;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.intangibleCulturalHeritage.service.LiveService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

import javax.servlet.http.HttpServletResponse;
import java.io.IOException;

@Controller
public class LiveController {
    @Autowired
    private LiveService liveService;

    /**
     * 获取直播间推流地址
     *
     * @param tid
     * @param response
     * @throws IOException
     */
    @ResponseBody
    @RequestMapping("/getLiveUrl")
    public void liveUrl(@RequestParam("tid") Integer tid, HttpServletResponse response) throws IOException {
        String liveUrl = liveService.getLiveUrlByTid(tid);
        /**
         * 将liveUrl序列化为json返回给客户端
         */
        ObjectMapper mapper = new ObjectMapper();
        String json = mapper.writeValueAsString(liveUrl);
        //设置content-type防止乱码问题
        response.setContentType("application/json;charset=utf-8");
        response.getWriter().write(json);
    }

    @ResponseBody
    @RequestMapping("/getLiveState")
    public void liveState(@RequestParam("tid") Integer tid, HttpServletResponse response) throws IOException {
        boolean state = liveService.getLiveStateByTid(tid);
        /**
         * 将直播间状态序列化为json返回给客户端
         */
        ObjectMapper mapper = new ObjectMapper();
        String json = mapper.writeValueAsString(state);
        //设置content-type防止乱码问题
        response.setContentType("application/json;charset=utf-8");
        response.getWriter().write(json);
    }

    @ResponseBody
    @RequestMapping("/live/publish/{tid}/{state}")
    public void updateLiveState(@PathVariable("tid") Integer tid, @PathVariable("state") Integer state) {
        liveService.updateLiveStateByTid(tid, state);
    }
}

package com.intangibleCulturalHeritage.controller;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.intangibleCulturalHeritage.service.CheckPointService;
import com.intangibleCulturalHeritage.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;
import java.io.IOException;

@Controller
public class CheckPointController {
    @Autowired
    private CheckPointService checkPointService;

    @Autowired
    private UserService userService;

    /**
     * 获取到用户相关岛的任务点
     */
    @RequestMapping("/getCheckPointInfo")
    public void GetCheckPoint(Integer islandId, HttpSession session, HttpServletResponse response) throws IOException {
        /**
         * 定位到用户的id编号
         */
        String userId = (String) session.getAttribute("userId");
        int uid = userService.getUidByUserId(userId);

        /**
         * 通过uid获取到闯关相关的字符串，再通过字符串分割获取到相应分支的岛的任务点信息
         */
        String checkPointInfo = checkPointService.getCheckPointInfoByUid(uid);
        String[] cpNums = checkPointInfo.split(",");
        String cpNum = cpNums[islandId - 1];

        /**
         * 将cpNum序列化为json返回给客户端
         */
        ObjectMapper mapper = new ObjectMapper();
        String json = mapper.writeValueAsString(Integer.parseInt(cpNum));
        //设置content-type防止乱码问题
        response.setContentType("application/json;charset=utf-8");
        response.getWriter().write(json);
    }

    /**
     * 获取游客闯关信息
     */
    @RequestMapping("/getVisitorsCheckPoint")
    public void GetVisitorsCheckPoint(Integer islandId, HttpServletResponse response, HttpSession session) throws IOException {
        /**
         * 获取相关信息
         */
        String cpNumInfo = (String) session.getAttribute("cpNumInfo");
        if (cpNumInfo == null) {
            cpNumInfo = "0,0,0,0,0";
        }
        String[] cpNums = cpNumInfo.split(",");
        String cpNum = cpNums[islandId - 1];

        /**
         * 将cpNum序列化为json返回给客户端
         */
        ObjectMapper mapper = new ObjectMapper();
        String json = mapper.writeValueAsString(Integer.parseInt(cpNum));
        //设置content-type防止乱码问题
        response.setContentType("application/json;charset=utf-8");
        response.getWriter().write(json);
    }

    /**
     * 用户数据保存
     */
    @ResponseBody
    @RequestMapping("/updateCheckPointInfo")
    public void UpdateCheckPoint(Integer islandId, String cpNum, HttpSession session) {
        /**
         * 获取用户个人参数
         */
        String userId = (String) session.getAttribute("userId");
        int uid = userService.getUidByUserId(userId);

        /**
         * 获取数据库储存中的闯关信息再通过从前端获取到的相关参数进行数据修改再重新存储到数据库中
         */
        String checkPointInfo = checkPointService.getCheckPointInfoByUid(uid);
        String[] cpNums = checkPointInfo.split(",");
        /**
         * 当闯关数大于记录数才进行保存
         */
        if (Integer.parseInt(cpNum) > Integer.parseInt(cpNums[islandId - 1])) {
            cpNums[islandId - 1] = cpNum;
            checkPointInfo = cpNums[0] + ",";
            int len = cpNums.length - 1;
            for (int i = 1; i < len; i++) {
                checkPointInfo += cpNums[i] + ",";
            }
            if (len != 0) {
                checkPointInfo += cpNums[cpNums.length - 1];
            }
            checkPointService.updateCheckPointInfoByUid(uid, checkPointInfo);
        }
    }

    /**
     * 游客保存
     */
    @ResponseBody
    @RequestMapping("/visitorsSave")
    public void VisitorsSave(Integer islandId, String cpNum, HttpSession session) {
        /**
         * 获取相关信息
         */
        String cpNumInfo = (String) session.getAttribute("cpNumInfo");

        /**
         * 通过字符串分割和拼接修改闯关信息
         */
        if (cpNumInfo == null) {
            cpNumInfo = "0,0,0,0,0";
        }
        String[] cpNums = cpNumInfo.split(",");
        /**
         * 当闯关数大于记录数才进行保存
         */
        if (Integer.parseInt(cpNum) > Integer.parseInt(cpNums[islandId - 1])) {
            cpNums[islandId - 1] = cpNum;
            cpNumInfo = cpNums[0] + ",";
            int len = cpNums.length - 1;
            for (int i = 1; i < len; i++) {
                cpNumInfo += cpNums[i] + ",";
            }
            if (len != 0) {
                cpNumInfo += cpNums[len];
            }

            /**
             * 重新修改session中闯关信息
             */
            session.setAttribute("cpNumInfo", cpNumInfo);
        }
    }
}

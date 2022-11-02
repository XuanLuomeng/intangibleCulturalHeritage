package com.intangibleCulturalHeritage.controller;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.intangibleCulturalHeritage.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;

import javax.servlet.ServletContext;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;
import java.io.IOException;

@Controller
public class ChatRoomController {
    @Autowired
    private UserService userService;

    /**
     * 获取到所有的聊天内容
     */
    @RequestMapping("/receiveChat")
    public void ReceiveChat(String chatRoomNumber, HttpServletResponse response, HttpSession session) throws IOException {
        ServletContext context = session.getServletContext();
        String says = String.valueOf(context.getAttribute(chatRoomNumber + "says"));
        if (says == null) {
            says = "";
        }

        /**
         * 将says序列化为json返回给客户端
         */
        ObjectMapper mapper = new ObjectMapper();
        String json = mapper.writeValueAsString(says);
        //设置content-type防止乱码问题
        response.setContentType("application/json;charset=utf-8");
        response.getWriter().write(json);
    }

    /**
     * 获取到用户发送的信息
     */
    @RequestMapping("/sendChat")
    public void SendChat(String text, String chatRoomNumber, HttpSession session) {
        /**
         * 获取到存在cookie中的userid
         */
        String userId = String.valueOf(session.getAttribute("userId"));

        /**
         * 前端传输的内容不为空的时候聊天内容才有效
         * 因聊天内容有效，则通过userid获取发送者名称
         * 通过字符串拼接将发送者名称和发送内容拼接起来
         * 再将内容保存到服务器端
         */
        if (text.length() > 0) {
            String userName = userService.getUserNameByUserId(userId);

            String say = userName + ":" + text;

            ServletContext context = session.getServletContext();
            String says = "";
            if (context.getAttribute(chatRoomNumber + "says") != null) {
                says = context.getAttribute(chatRoomNumber + "says") + "<br>" + say;
            } else {
                says = say;
            }
            context.setAttribute(chatRoomNumber + "says", says);
        }
    }
}

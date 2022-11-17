package com.intangibleCulturalHeritage.controller;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.intangibleCulturalHeritage.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import javax.servlet.ServletContext;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;
import java.io.IOException;

@Controller
public class ChatController {
    @Autowired
    private UserService userService;

    /**
     * 获取到所有的聊天内容(聊天室)
     */
    @ResponseBody
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
     * 获取到用户发送的信息(聊天室)
     */
    @ResponseBody
    @RequestMapping("/sendChat")
    public void SendChat(HttpServletRequest request, String chatRoomNumber, HttpSession session) {
        /**
         * 获取到存在cookie中的userid
         */
        String text = request.getParameter("text");
        String userId = String.valueOf(session.getAttribute("userId"));

        /**
         * 前端传输的内容不为空的时候聊天内容才有效
         * 因聊天内容有效，则通过userid获取发送者名称
         * 通过字符串拼接将发送者名称和发送内容拼接起来
         * 再将内容保存到服务器端
         */
        if (text.length() > 0) {
            String userName = userService.getUserNameByUserId(userId);

            String say = userId + "%-%" + userName + "%-%" + text;

            ServletContext context = session.getServletContext();
            String says = "";
            if (context.getAttribute(chatRoomNumber + "says") != null) {
                says = context.getAttribute(chatRoomNumber + "says") + "%;%" + say;
            } else {
                says = say;
            }
            context.setAttribute(chatRoomNumber + "says", says);
        }
    }

    /**
     * 获取到所有的聊天内容(直播间)
     */
    @ResponseBody
    @RequestMapping("/receiveLiveChat")
    public void ReceiveLiveChat(String tid, HttpServletResponse response, HttpSession session) throws IOException {
        ServletContext context = session.getServletContext();
        String says = String.valueOf(context.getAttribute("live" + tid + "says"));
        if (says == null) {
            says = "";
        } else {
            String[] chatArray = says.split("%;%");
            int length = chatArray.length;
            for (int i = 0; i < length; i++) {
                String userId = (String) session.getAttribute("userId");
                String[] split = chatArray[i].split("%-%");
                if (split[0].equals(userId)) {
                    chatArray[i] = "" + split[1] + "";
                } else {
                    chatArray[i] = "" + split[1] + "";
                }
            }
            for (int i = 0; i < length; i++) {
                says += chatArray[i];
            }
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
     * 获取到用户发送的信息(直播间)
     */
    @ResponseBody
    @RequestMapping("/sendLiveChat")
    public void SendLiveChat(HttpServletRequest request, String tid, HttpSession session) {
        /**
         * 获取到存在cookie中的userid
         */
        String text = request.getParameter("text");
        String userId = String.valueOf(session.getAttribute("userId"));

        /**
         * 前端传输的内容不为空的时候聊天内容才有效
         * 因聊天内容有效，则通过userid获取发送者名称
         * 通过字符串拼接将发送者名称和发送内容拼接起来
         * 再将内容保存到服务器端
         */
        if (text.length() > 0) {
            String userName = userService.getUserNameByUserId(userId);

            String say = userId + "%-%" + userName + ":" + text;

            ServletContext context = session.getServletContext();
            String says = "";
            if (context.getAttribute(tid + "says") != null) {
                says = context.getAttribute("live" + tid + "says") + "%;%" + say;
            } else {
                says = say;
            }
            context.setAttribute("live" + tid + "says", says);
        }
    }
}

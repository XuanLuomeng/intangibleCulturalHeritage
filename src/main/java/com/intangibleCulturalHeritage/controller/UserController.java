package com.intangibleCulturalHeritage.controller;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.intangibleCulturalHeritage.pojo.User;
import com.intangibleCulturalHeritage.service.CheckPointService;
import com.intangibleCulturalHeritage.service.LikeArticleService;
import com.intangibleCulturalHeritage.service.UserService;
import com.intangibleCulturalHeritage.utils.InfoResponse;
import com.intangibleCulturalHeritage.utils.RandomName;
import com.intangibleCulturalHeritage.utils.RandomPhoto;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

import javax.servlet.ServletContext;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;
import java.io.IOException;

@Controller
public class UserController {
    @Autowired
    private UserService userService;

    @Autowired
    private LikeArticleService likeArticleService;

    @Autowired
    private CheckPointService checkPointService;

    /**
     * 登陆页面(保存referer,方便登陆完后返回某个页面)
     */
    @RequestMapping("/loginOrRegister")
    public String loginOrRegister(@RequestHeader(value = "referer", required = false, defaultValue = "/") String referer
            , HttpSession httpSession) {
        httpSession.setAttribute("referer", referer);
        return "island/loginOrRegister";
    }

    /**
     * 退出登录，即删除客户端浏览器上的session
     */
    @ResponseBody
    @RequestMapping("/exitServlet")
    public void Exit(HttpSession session) {
        session.invalidate();
    }

    /**
     * 通过账号查询用户信息（不包含密码，盐和uid）
     */
    @ResponseBody
    @RequestMapping("/getUserInfo")
    public void GetUserInfo(HttpSession session, HttpServletResponse response) throws IOException {
        /**
         * 参数获取
         */
        String userId = String.valueOf(session.getAttribute("userId"));

        User user = userService.getUserAllInfoByUserId(userId);

        //将info对象序列化为json并将数据写回客户端
        ObjectMapper mapper = new ObjectMapper();
        String json = mapper.writeValueAsString(user);
        //设置content-type防止乱码问题
        response.setContentType("application/json;charset=utf-8");
        response.getWriter().write(json);
    }

    /**
     * 从session里获取userId，如果没有则返回0，有则返回用户名称.用作检测是否已登录供许多功能使用
     */
    @ResponseBody
    @RequestMapping("/isLogin")
    public void isLogin(HttpSession session, HttpServletResponse response) throws IOException {
        String userId = (String) session.getAttribute("userId");
        /**
         * 将user序列化为json返回给客户端
         */
        ObjectMapper mapper = new ObjectMapper();
        //检测是否为null，如果是null则处于未登录状态，返回个us,其中userid值为0
        String json;
        User user = new User();
        if (userId == null) {
            json = mapper.writeValueAsString(user);
        } else {
            user = userService.getUserAllInfoByUserId(userId);
            json = mapper.writeValueAsString(user);
        }
        //设置content-type防止乱码问题
        response.setContentType("application/json;charset=utf-8");
        response.getWriter().write(json);
    }

    /**
     * 登录
     */
    @ResponseBody
    @RequestMapping("/loginServlet")
    public void Login(@RequestParam("login_userid") String userid, @RequestParam("login_password") String password,
                      HttpSession session, HttpServletResponse response) throws IOException {
        User user = new User();
        user.setUserId(userid);
        user.setPassword(password);
        boolean checkResult = userService.checkPassword(user.getUserId(), user.getPassword());
        if (checkResult) {
            //利用会话技术存储个人信息，以便用户访问其个人信息
            session.setAttribute("userId", user.getUserId());
            String referer = (String) session.getAttribute("referer");
            String url = "";
            if (!referer.equals("http://localhost:8080/intangibleCulturalHeritage/")) {
                url = referer.split("/")[referer.split("/").length - 1];
                session.removeAttribute("referer");
            }
            new InfoResponse(response, true, url);
        } else {
            new InfoResponse(response, false, "账号或密码有误！");
        }
    }

    /**
     * 注册
     */
    @ResponseBody
    @RequestMapping("/registUserServlet")
    public void RegistUser(@RequestParam("register_userid") String userid, @RequestParam("register_password") String password,
                           String usernameMsg, HttpSession session, HttpServletResponse response) throws IOException {
        /**
         * 获取注册信息
         * userName后续用于检测名称是否为空
         * 若userName为空，则由后端随机命名
         * 随机头像给用户
         */
        User user = new User();
        user.setUserId(userid);
        user.setPassword(password);
        user.setUserName(usernameMsg);
        ServletContext servletContext = session.getServletContext();
        if (usernameMsg == null || usernameMsg.equals("")) {
            RandomName randomName = new RandomName(servletContext.getRealPath("/file/surname"), servletContext.getRealPath("/file/name"));
            user.setUserName(randomName.getName());
        }
        RandomPhoto randomPhoto = new RandomPhoto(servletContext.getRealPath("/file/randomAvatar"));
        user.setPhoto(randomPhoto.getPhoto());

        /**
         * 首先检测用户账号是否已经存在
         * 若存在返回false给前端表示注册失败
         * 若不存在则注册用户并返回true给前端表示注册成功,同时给闯关表,点赞列表进行初始化
         */
        boolean exitUser = userService.isExistUser(user.getUserId());
        if (exitUser) {
            new InfoResponse(response, false, "用户已存在！");
        } else {
            userService.insertUser(user);
            int uid = userService.getUidByUserId(user.getUserId());
            checkPointService.insertCheckPointInfoByUid(uid);
            likeArticleService.insertLikeArray(uid, "");
            new InfoResponse(response, true, "注册成功！");
        }
    }

    /**
     * 修改密码
     */
    @ResponseBody
    @RequestMapping("/updatePassword")
    public void UpdatePassword(String oldPassword, String newPassword, HttpSession session, HttpServletResponse response) throws IOException {
        /**
         * 获取参数
         */
        String userId = String.valueOf(session.getAttribute("userId"));

        boolean isSuccessful = userService.checkPasswordAndUpdate(userId, oldPassword, newPassword);

        if (isSuccessful) {
            new InfoResponse(response, isSuccessful, "修改成功");
        } else {
            new InfoResponse(response, isSuccessful, "修改失败，旧密码不正确");
        }
    }

    /**
     * 修改个人信息
     */
    @ResponseBody
    @RequestMapping("/updateUserInfos")
    public void UpdateUserInfo(String userName, String telephone, String sex, String email, String birthday,
                               HttpSession session) {
        /**
         * 获取参数
         */
        String userId = String.valueOf(session.getAttribute("userId"));
        User user = new User();
        user.setUserName(userName);
        user.setTelephone(telephone);
        user.setSex(sex);
        user.setEmail(email);
        user.setBirthday(birthday);
        user.setUserId(userId);

        userService.updateUserInfoByUser(user);
    }
}

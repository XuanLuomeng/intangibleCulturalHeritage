package com.intangibleCulturalHeritage.controller;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.intangibleCulturalHeritage.pojo.Article;
import com.intangibleCulturalHeritage.pojo.Comment;
import com.intangibleCulturalHeritage.pojo.Page;
import com.intangibleCulturalHeritage.service.ArticleService;
import com.intangibleCulturalHeritage.service.CommentService;
import com.intangibleCulturalHeritage.service.LikeArticleService;
import com.intangibleCulturalHeritage.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.multipart.MultipartFile;

import javax.servlet.ServletContext;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;
import java.io.File;
import java.io.IOException;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import java.util.UUID;

@Controller
public class ArticleController {
    @Autowired
    private ArticleService articleService;

    @Autowired
    private LikeArticleService likeArticleService;

    @Autowired
    private UserService userService;

    @Autowired
    private CommentService commentService;

    /**
     * 分享页面
     */
    @RequestMapping("/share/{aid}")
    public String share(@PathVariable("aid") Integer aid, HttpSession session) {
        session.setAttribute("aid", aid);
        return "forum/share";
    }

    /**
     * 通过aid删除文章,以及删除点赞列表中有该aid的数据
     */
    @ResponseBody
    @RequestMapping("/deleteArticle")
    public void DeleteArticle(String aid) {
        if (aid != null) {
            if (aid != "") {
                articleService.deleteArticleByAid(Integer.parseInt(aid));
                likeArticleService.updateLikeArrays(aid);
            }
        }
    }

    /**
     * 分页获取文章(初始化)
     */
    @ResponseBody
    @RequestMapping("/Article")
    public void GetArticle(String currentPageStr, HttpSession session, HttpServletResponse response) throws IOException {
        Object userId = session.getAttribute("userId");
        int uid = 0;
        if (userId != null) {
            uid = userService.getUidByUserId((String) userId);
        }

        /**
         * 处理参数(防止空指针异常)
         */
        int currentPage = 0;
        if (currentPageStr != null && currentPageStr.length() > 0) {
            currentPage = Integer.parseInt(currentPageStr);
        } else {
            currentPage = 1;
        }

        /**
         * 查询文章Page对象
         */
        Page<Article> page = new Page<>();
        try {
            page = articleService.getArticlePageInfo(currentPage, uid);
        } catch (ParseException e) {
            e.printStackTrace();
        }

        /**
         * 查询评论
         */
        List<Comment> comments = new ArrayList<>();
        for (int i = 0; i < page.getSize(); i++) {
            int aid = page.getList().get(i).getAid();
            comments = commentService.getComments(aid);
            page.getList().get(i).setComments(comments);
        }

        /**
         * 将page序列化为json返回给客户端
         */
        ObjectMapper mapper = new ObjectMapper();
        String json = mapper.writeValueAsString(page);
        //设置content-type防止乱码问题
        response.setContentType("application/json;charset=utf-8");
        response.getWriter().write(json);
    }

    /**
     * 获取用户文章
     */
    @ResponseBody
    @RequestMapping("/UserArticle")
    public void GetUserArticle(String currentPageStr, HttpSession session, HttpServletResponse response) throws IOException {
        /**
         * 获取请求参数
         */
        Object userId = session.getAttribute("userId");
        int uid = userService.getUidByUserId((String) userId);

        /**
         * 处理参数(防止空指针异常)
         */
        int currentPage = 0;
        if (currentPageStr != null && currentPageStr.length() > 0) {
            currentPage = Integer.parseInt(currentPageStr);
        } else {
            currentPage = 1;
        }

        /**
         * 查询Page对象
         */
        Page<Article> page = null;
        try {
            page = articleService.getUserArticlePageInfo(currentPage, uid);
        } catch (ParseException e) {
            e.printStackTrace();
        }

        /**
         * 将page序列化为json返回给客户端
         */
        ObjectMapper mapper = new ObjectMapper();
        String json = mapper.writeValueAsString(page);
        //设置content-type防止乱码问题
        response.setContentType("application/json;charset=utf-8");
        response.getWriter().write(json);
    }

    /**
     * 发布文章
     */
    @ResponseBody
    @RequestMapping("/InsertArticle")
    public void InsertArticle(@RequestParam("issuetitle") String title, @RequestParam("issuetext") String content,
                              MultipartFile photo, HttpSession session) throws IOException {
        /**
         * 处理图片上传
         */
        //获取上传的文件的文件名
        String filename = photo.getOriginalFilename();
        //获取上传的文件名的后缀
        String hzName = filename.substring(filename.lastIndexOf("."));
        //获取uuid
        String uuid = UUID.randomUUID().toString();
        //拼接一个新的文件名
        filename = uuid + hzName;
        //获取ServletContext对象
        ServletContext servletContext = session.getServletContext();
        //获取当前工程的真实路径
        String photoPath = servletContext.getRealPath("images/forumImg/photo");
        //创建photoPath所对应的File对象
        File file = new File(photoPath);
        //判断file所对应目录是否存在
        if (!file.exists()) {
            file.mkdir();
        }
        String finalPath = photoPath + File.separator + filename;
        //上传文件
        photo.transferTo(new File(finalPath));
        /**
         * 获取参数，并获取当前时间
         */
        Date pushdate = new Date();
        SimpleDateFormat simpleDateFormat = new SimpleDateFormat("yyyy-MM-dd HH:mm");
        /**
         * 获取当前用户uid信息,并用该uid去上传文章
         */
        Object user = session.getAttribute("userId");
        String userId = (String) user;
        int uid = userService.getUidByUserId(userId);

        /**
         * 设置文章相关信息
         */
        Article articlePush = new Article();
        articlePush.setUid(uid);
        articlePush.setTitle(title);
        articlePush.setContent(content);
        articlePush.setDate(simpleDateFormat.format(pushdate));
        articlePush.setPhoto("/intangibleCulturalHeritage/images/forumImg/photo/" + filename);

        /**
         * 保存至数据库
         */
        articleService.insertArticle(articlePush);
    }

    /**
     * 修改文章内容
     */
    @ResponseBody
    @RequestMapping("/UpdateArticle")
    public void UpdateArticle(String aid, String title, String content) {
        /**
         * 获取修改内容
         */
        Article article = new Article();
        article.setAid(Integer.parseInt(aid));
        article.setTitle(title);
        article.setContent(content);

        /**
         * 执行修改操作
         */
        articleService.updateArticle(article);
    }

    /**
     * 通过aid获取用户文章（用于分享时单独查看某个文章）
     */
    @ResponseBody
    @RequestMapping("/share/article")
    public void ShareArticle(HttpSession session, HttpServletResponse response) throws IOException, ParseException {
        Integer aid = (Integer) session.getAttribute("aid");
        session.removeAttribute("aid");
        Article article = articleService.getUserArticleByAid(aid);
        article.setComments(commentService.getComments(aid));
        /**
         * 将article序列化为json返回给客户端
         */
        ObjectMapper mapper = new ObjectMapper();
        String json = mapper.writeValueAsString(article);
        //设置content-type防止乱码问题
        response.setContentType("application/json;charset=utf-8");
        response.getWriter().write(json);
    }
}

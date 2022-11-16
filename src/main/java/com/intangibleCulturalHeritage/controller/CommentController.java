package com.intangibleCulturalHeritage.controller;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.intangibleCulturalHeritage.pojo.Article;
import com.intangibleCulturalHeritage.pojo.Comment;
import com.intangibleCulturalHeritage.pojo.Page;
import com.intangibleCulturalHeritage.service.ArticleService;
import com.intangibleCulturalHeritage.service.CommentService;
import com.intangibleCulturalHeritage.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;
import java.io.IOException;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;

@Controller
public class CommentController {
    @Autowired
    private CommentService commentService;

    @Autowired
    private UserService userService;

    @Autowired
    private ArticleService articleService;

    /**
     * 通过cid删除评论
     */
    @ResponseBody
    @RequestMapping("/deleteComment")
    public void DeleteComment(Integer cid) {
        commentService.deleteCommentByCid(cid);
    }

    /**
     * 发表评论
     */
    @ResponseBody
    @RequestMapping("/insertComment")
    public void InsertComment(String content, Integer aid, HttpSession session, HttpServletResponse response) throws IOException {
        /**
         * 获取当前时间
         */
        Date pushdate = new Date();
        SimpleDateFormat simpleDateFormat = new SimpleDateFormat("yyyy-MM-dd");
        /**
         * 获取当前用户uid信息,并用该uid去上传文章
         */
        Object user = session.getAttribute("userId");
        String userId = (String) user;
        int uid = userService.getUidByUserId(userId);

        /**
         * 设置评论内容
         */
        Comment comment = new Comment();
        comment.setContent(content);
        comment.setAid(aid);
        comment.setDate(simpleDateFormat.format(pushdate));
        comment.setUid(uid);

        /**
         * 保存入数据库并获取评论的主键cid
         */
        comment = commentService.insertCommentByUidAndAid(comment);

        /**
         * 将comment序列化为json返回给客户端，方便实现实时发布
         */
        ObjectMapper mapper = new ObjectMapper();
        String json = mapper.writeValueAsString(comment);
        //设置content-type防止乱码问题
        response.setContentType("application/json;charset=utf-8");
        response.getWriter().write(json);
    }

    /**
     * 获取用户评论过的文章
     */
    @ResponseBody
    @RequestMapping("/userCommentArticle")
    public void UserCommentArticle(String currentPageStr, HttpSession session, HttpServletResponse response) throws IOException {
        /**
         * 获取相关内容，判断分页页码，是否模糊查询……
         */
        String userId = (String) session.getAttribute("userId");

        int uid = userService.getUidByUserId(userId);

        /**
         * 处理参数(防止空指针异常)
         */
        int currentPage = 0;
        if (currentPageStr != null && currentPageStr.length() > 0) {
            currentPage = Integer.parseInt(currentPageStr);
        } else {
            currentPage = 1;
        }

        List<Integer> aidList = commentService.getUserCommentedArticleByUid(uid);

        /**
         * 处理文章分页内容
         */
        Page<Article> page = new Page<>();
        int len = aidList.size();
        page.setTotalCount(len);
        if (len != 0) {
            List<Article> articleList = new ArrayList<>();
            page.setTotalPage(aidList.size() % 5 == 0 ? aidList.size() / 5 : aidList.size() / 5 + 1);
            page.setSize(currentPage == page.getTotalPage() ? aidList.size() % 5 : 5);
            page.setPageSize(5);
            int limitStart = 0;
            int limitEnd = 0;
            if (currentPage == page.getTotalPage()) {
                limitStart = (currentPage - 1) * 5;
                limitEnd = limitStart + page.getSize();
            } else {
                limitStart = (currentPage - 1) * 5;
                limitEnd = limitStart + 5;
            }
            for (int i = limitStart; i < limitEnd; i++) {
                Article article = new Article();
                try {
                    article = articleService.getUserArticleByAid(aidList.get(i));
                } catch (ParseException e) {
                    e.printStackTrace();
                }
                article.setComments(commentService.getComments(aidList.get(i)));
                articleList.add(article);
            }
            page.setList(articleList);
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
}

package com.intangibleCulturalHeritage.service.impl;

import com.github.pagehelper.PageHelper;
import com.github.pagehelper.PageInfo;
import com.intangibleCulturalHeritage.mapper.CommentMapper;
import com.intangibleCulturalHeritage.pojo.Comment;
import com.intangibleCulturalHeritage.pojo.Page;
import com.intangibleCulturalHeritage.service.CommentService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@Transactional
public class CommentServiceImpl implements CommentService {
    @Autowired
    private CommentMapper commentMapper;
    @Override
    public List<Comment> getComments( int aid) {
        return commentMapper.getCommentByAid(aid);
    }

    @Override
    public Comment insertCommentByUidAndAid(Comment comment) {
        commentMapper.insertCommentByUidAndAid(comment);
        return comment;
    }

    @Override
    public void deleteCommentByCid(int cid) {
        commentMapper.deleteCommentByCid(cid);
    }

    @Override
    public List<Integer> getUserCommentedArticleByUid(int uid) {
        List<Integer> commentedAidByUid = commentMapper.getCommentedAidByUid(uid);
        return commentedAidByUid;
    }
}

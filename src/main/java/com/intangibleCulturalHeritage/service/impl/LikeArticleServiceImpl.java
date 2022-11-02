package com.intangibleCulturalHeritage.service.impl;

import com.intangibleCulturalHeritage.mapper.LikeArticleMapper;
import com.intangibleCulturalHeritage.pojo.LikeArticle;
import com.intangibleCulturalHeritage.service.LikeArticleService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@Transactional
public class LikeArticleServiceImpl implements LikeArticleService {
    @Autowired
    private LikeArticleMapper likeArticleMapper;

    @Override
    public String isLike(int uid, String aid) {
        String likeByUidAndAid = likeArticleMapper.getLikeArrayOrIsLikeByUidAndAid(uid, aid);
        if (likeByUidAndAid == null) {
            return "0";
        } else {
            return "1";
        }
    }

    @Override
    public String getLikeArray(int uid) {
        String likeByUidAndAid = likeArticleMapper.getLikeArrayOrIsLikeByUidAndAid(uid, null);
        return likeByUidAndAid;
    }

    @Override
    public void updateLikeArray(int uid, String likeArray) {
        likeArticleMapper.updateLikeArticleByUpdateLikeArray(uid, likeArray);
    }

    @Override
    public void updateLikeArrays(String aid) {
        List<LikeArticle> list = likeArticleMapper.getUidAndListByLike(aid);
        for (int i = 0; i < list.size(); i++) {
            String[] strings = list.get(i).getLAidArray().split(aid + ",");
            String newStr = "";
            /**
             * 分割字符串时，分割的是内部与边缘时情况不同，以下操作用于防止数组越界
             * 1、当字符串只有一个(*,)时，长度为0
             * 2、当字符串有多个(*,)时，split边缘内容后长度为1
             * 3、当字符串有多个(*,)时，split中间内容后长度为2
             */
            if (strings.length == 2) {
                newStr += strings[0] + strings[1];
            } else if (strings.length == 1) {
                newStr += strings[0];
            }
            likeArticleMapper.updateLikeArticleByUpdateLikeArray(list.get(i).getLUid(), newStr);
        }
    }

    @Override
    public void insertLikeArray(int uid, String likeArray) {
        likeArticleMapper.insertUidAndLikeArray(uid, likeArray);
    }
}

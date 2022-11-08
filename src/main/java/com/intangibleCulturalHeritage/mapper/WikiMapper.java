package com.intangibleCulturalHeritage.mapper;

import com.intangibleCulturalHeritage.pojo.Wiki;
import org.apache.ibatis.annotations.Param;

import java.util.List;

public interface WikiMapper {
    /**
     * 获取所有百科(包括模糊查询)
     *
     * @return
     */
    List<Wiki> getAllWiki(@Param("str") String str);

    /**
     * 百科发布
     *
     * @param wiki
     */
    void insertWiki(Wiki wiki);

    /**
     * 通过wid删除百科
     *
     * @param wid
     */
    void deleteWikiByWid(@Param("wid") int wid);

    /**
     * 百科修改
     *
     * @param wiki
     */
    void updateWiki(Wiki wiki);
}

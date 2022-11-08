package com.intangibleCulturalHeritage.service;

import com.intangibleCulturalHeritage.pojo.Page;
import com.intangibleCulturalHeritage.pojo.Wiki;

public interface WikiService {
    /**
     * 通过百科页码获取分页信息(包括搜索功能)
     *
     * @param pageNum
     * @return
     */
    Page getWikiPageInfo(int pageNum, String str);

    /**
     * 发布百科
     * @param wiki
     */
    void insertWiki(Wiki wiki);

    /**
     * 通过百科wid删除百科
     * @param wid
     */
    void deleteWikiByWid(int wid);

    /**
     * 修改百科标题，内容
     * @param wiki
     */
    void updateWiki(Wiki wiki);
}

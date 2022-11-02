package com.intangibleCulturalHeritage.service.impl;

import com.github.pagehelper.PageHelper;
import com.github.pagehelper.PageInfo;
import com.intangibleCulturalHeritage.mapper.WikiPediaMapper;
import com.intangibleCulturalHeritage.pojo.Page;
import com.intangibleCulturalHeritage.pojo.WikiPedia;
import com.intangibleCulturalHeritage.service.WikiPediaService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@Transactional
public class WikiPediaServiceImpl implements WikiPediaService {
    @Autowired
    private WikiPediaMapper wikiPediaMapper;

    @Override
    public Page getWikePediaPageInfo(int pageNum, String str) {
        com.github.pagehelper.Page<Object> pageUtil = PageHelper.startPage(pageNum, 5);
        List<WikiPedia> allWikiPedia = wikiPediaMapper.getAllWikiPedia(str);
        PageInfo<WikiPedia> pageInfo = new PageInfo<>(allWikiPedia, 8);
        Page<WikiPedia> page = new Page<>();
        page.setTotalCount((int) pageInfo.getTotal());
        page.setTotalPage(pageInfo.getPages());
        page.setCurrentPage(pageNum);
        page.setPageSize(5);
        page.setSize(pageInfo.getSize());
        page.setHasNextPage(pageInfo.isHasNextPage());
        page.setHasPreviousPage(pageInfo.isHasPreviousPage());
        page.setNavigatePages(pageInfo.getNavigatePages());
        page.setNavigatePageNums(pageInfo.getNavigatepageNums());
        page.setList(allWikiPedia);
        return page;
    }

    @Override
    public void insertWikePedia(WikiPedia wikiPedia) {
        wikiPediaMapper.insertWikiPedia(wikiPedia);
    }

    @Override
    public void deleteWikePediaByWid(int wid) {
        wikiPediaMapper.deleteWikiPediaByWid(wid);
    }

    @Override
    public void updateWikePedia(WikiPedia wikiPedia) {
        wikiPediaMapper.updateWikiPedia(wikiPedia);
    }
}

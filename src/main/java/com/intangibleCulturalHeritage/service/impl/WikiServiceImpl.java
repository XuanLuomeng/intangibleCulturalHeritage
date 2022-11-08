package com.intangibleCulturalHeritage.service.impl;

import com.github.pagehelper.PageHelper;
import com.github.pagehelper.PageInfo;
import com.intangibleCulturalHeritage.mapper.WikiMapper;
import com.intangibleCulturalHeritage.pojo.Page;
import com.intangibleCulturalHeritage.pojo.Wiki;
import com.intangibleCulturalHeritage.service.WikiService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@Transactional
public class WikiServiceImpl implements WikiService {
    @Autowired
    private WikiMapper wikiMapper;

    @Override
    public Page getWikiPageInfo(int pageNum, String str) {
        com.github.pagehelper.Page<Object> pageUtil = PageHelper.startPage(pageNum, 5);
        List<Wiki> allWikiPedia = wikiMapper.getAllWiki(str);
        PageInfo<Wiki> pageInfo = new PageInfo<>(allWikiPedia, 8);
        Page<Wiki> page = new Page<>();
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
    public void insertWiki(Wiki wiki) {
        wikiMapper.insertWiki(wiki);
    }

    @Override
    public void deleteWikiByWid(int wid) {
        wikiMapper.deleteWikiByWid(wid);
    }

    @Override
    public void updateWiki(Wiki wiki) {
        wikiMapper.updateWiki(wiki);
    }
}

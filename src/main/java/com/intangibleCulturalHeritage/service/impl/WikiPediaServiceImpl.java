package com.intangibleCulturalHeritage.service.impl;

import com.intangibleCulturalHeritage.mapper.WikiPediaMapper;
import com.intangibleCulturalHeritage.pojo.WikiPedia;
import com.intangibleCulturalHeritage.service.WikiPediaService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@Transactional
public class WikiPediaServiceImpl implements WikiPediaService {
    @Autowired
    private WikiPediaMapper wikiPediaMapper;

    @Override
    public WikiPedia getWikePediaInfo( String str) {
        WikiPedia wikiPedia = wikiPediaMapper.getWikiPediaByTitle(str);
        return wikiPedia;
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

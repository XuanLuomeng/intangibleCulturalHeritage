package com.intangibleCulturalHeritage.pojo;

import lombok.Data;

@Data
public class WikiPedia {
    /**
     * wid:百科编号
     * wikiTitle:百科标题
     * wiki:百科内容
     * photo:百科图片
     */
    private int wid;
    private String wikiTitle;
    private String wiki;
    private String photo;
}

package com.intangibleCulturalHeritage.pojo;

import lombok.Data;

@Data
public class Wiki {
    /**
     * wid:百科编号
     * wikiTitle:百科标题
     * wiki:百科内容
     */
    private int wid;
    private String wikiTitle;
    private String wiki;
}

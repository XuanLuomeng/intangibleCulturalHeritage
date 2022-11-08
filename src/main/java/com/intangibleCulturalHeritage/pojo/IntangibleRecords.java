package com.intangibleCulturalHeritage.pojo;

import lombok.Data;

@Data
public class IntangibleRecords {
    /**
     * id:省份id
     * name:省名
     * value:省份拥有非遗数量记录
     */
    private int id;
    private String name;
    private int value;
}

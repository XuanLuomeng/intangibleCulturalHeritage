package com.intangibleCulturalHeritage.pojo;

import lombok.Data;

@Data
public class CheckPoint {
    /**
     * cpId:关卡编号
     * cpNum:岛号/任务点
     * cpUid:用户id编号
     */
    private int cpId;
    private int cpNum;
    private int cpUid;
}

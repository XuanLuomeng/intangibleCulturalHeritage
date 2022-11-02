package com.intangibleCulturalHeritage.pojo;

import lombok.Data;

import java.util.List;

@Data
public class Page<T> {
    /**
     * totalCount:总文章/评论数
     * totalPage:总页码
     * currentPage:当前页码(需从前端获取)
     * pageSize:每页显示条数(固定)
     * size:当前页显示的真实条数
     * HasPreviousPage/HasNextPage:是否有上/下一页
     * navigatePages:导航分页的页码数
     * navigatepageNums:导航分页的页码
     * list:文章列表
     */
    private int totalCount;
    private int totalPage;
    private int currentPage;
    private int pageSize;
    private int size;
    private boolean isHasPreviousPage;
    private boolean isHasNextPage;
    private int navigatePages;
    private int[] navigatePageNums;
    private List<T> list;
}
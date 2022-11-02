package com.intangibleCulturalHeritage.pojo;

import lombok.Data;

import java.io.Serializable;

/**
 * Encapsulate the result object
 */
@Data
public class InfoResult implements Serializable {
    /**
     * data:Result object
     * flag:Is the result correct
     * errorMsg:Prompt message
     */
    private Object data;
    private boolean flag;
    private String errorMsg;
}

package com.intangibleCulturalHeritage.utils;

import java.io.BufferedReader;
import java.io.FileReader;
import java.io.IOException;
import java.util.ArrayList;
import java.util.List;
import java.util.Random;

/**
 * 随机头像工具（可用于注册时随机，以及更换头像（此功能暂未实现）时随机）
 */
public class RandomPhoto {
    private String photo;
    public RandomPhoto(String realPath) throws IOException {
        Random random = new Random();
        List<String> list = new ArrayList<>();
        BufferedReader br = new BufferedReader(new FileReader(realPath));
        String line = null;
        while ((line = br.readLine()) != null) {
            list.add(line);
        }
        br.close();
        this.photo = list.get(random.nextInt(6));
    }

    public String getPhoto() {
        return photo;
    }
}

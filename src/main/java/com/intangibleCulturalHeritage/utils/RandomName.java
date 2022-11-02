package com.intangibleCulturalHeritage.utils;

import java.io.FileInputStream;
import java.io.IOException;
import java.io.InputStream;
import java.util.Random;

/**
 * 随机名称工具（当用户注册未输入名称时启用）
 * 读取姓和名的文件内容并通过split分割获取文件内所有的姓和名，再通过随机数获取姓和名其中一个组成一个姓名
 */
public class RandomName {
    private String name;

    public RandomName(String realPath, String realPath1) throws IOException {
        Random random = new Random();
        String[] strArray;
        String[] array;
        String temp;
        String str = "";
        InputStream in = new FileInputStream(realPath);
        byte[] bys = new byte[1024];
        int len;
        while ((len = in.read(bys)) != -1) {
            temp = new String(bys, 0, len, "utf-8");
            str += temp;
        }
        strArray = str.split(",");
        String surname = strArray[random.nextInt(508)];
        str = "";
        in.close();
        InputStream is = new FileInputStream(realPath1);
        byte[] by = new byte[1024];
        int le;
        while ((le = is.read(by)) != -1) {
            temp = new String(by, 0, le, "utf-8");
            str += temp;
        }
        array = str.split(",");
        is.close();
        this.name = surname + array[random.nextInt(35)];
    }

    public String getName() {
        return name;
    }
}

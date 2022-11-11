package com.intangibleCulturalHeritage.filter;

import javax.servlet.*;
import javax.servlet.annotation.WebFilter;
import java.io.FileInputStream;
import java.io.IOException;
import java.io.InputStream;
import java.lang.reflect.InvocationHandler;
import java.lang.reflect.Method;
import java.lang.reflect.Proxy;
import java.util.ArrayList;
import java.util.List;

public class SensitiveWordsFliter implements Filter {
    private List<String> list = new ArrayList<String>();

    @Override
    public void doFilter(ServletRequest servletRequest, ServletResponse servletResponse, FilterChain filterChain) throws IOException, ServletException {
        /**
         * 创建代理对象，增强getParameter方法
         */
        ServletRequest proxy_req = (ServletRequest) Proxy.newProxyInstance(servletRequest.getClass().getClassLoader(), servletRequest.getClass().getInterfaces(), new InvocationHandler() {
            @Override
            public Object invoke(Object proxy, Method method, Object[] args) throws Throwable {
                /**
                 * 增强getParameter方法
                 * 怕判断是否是getParameter方法
                 */
                if (method.getName().equals("getParameter")) {
                    /**
                     * 增强返回值并获取返回值
                     */
                    String value = (String) method.invoke(servletRequest, args);
                    if (value != null) {
                        for (String str : list) {
                            if (value.contains(str)) {
                                value = value.replaceAll(str, "**");
                            }
                        }
                    }
                    return value;
                }
                return method.invoke(servletRequest, args);
            }
        });
        /**
         * 放行
         */
        filterChain.doFilter(proxy_req, servletResponse);
    }

    @Override
    public void init(FilterConfig filterConfig) throws ServletException {
        /**
         * 加载文件->读取文件->将文件的每一行数据添加到list中
         */
        try {
            ServletContext servletContext = filterConfig.getServletContext();
            String realPath = servletContext.getRealPath("/file/sensitiveWords");
            InputStream in = new FileInputStream(realPath);
            String strs = new String();
            byte[] bys = new byte[2048];
            int len;
            while ((len = in.read(bys)) != -1) {
                strs += new String(bys, 0, len, "utf-8");
            }
            for (String str : strs.split(" ")) {
                list.add(str);
            }
            in.close();
        } catch (Exception e) {
            e.printStackTrace();
        }
    }

    @Override
    public void destroy() {
    }
}

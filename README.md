# GitBook Qrcode List

[![Build Status](https://travis-ci.org/pushmetop/gitbook-plugin-qrcode-list.svg?branch=master)](https://travis-ci.org/pushmetop/gitbook-plugin-qrcode-list)
[![codecov](https://codecov.io/gh/pushmetop/gitbook-plugin-qrcode-list/branch/master/graph/badge.svg)](https://codecov.io/gh/pushmetop/gitbook-plugin-qrcode-list)

## 简介

* 一款 gitbook 插件。
* 用于在文章底部添加二维码列表。
* 效果如 `打赏&联系` 部分所示。


## 安装

在 `book.json` 文件中的 `plugins` 添加 `qrcode-list`：

```
{
  "plugins": [ "qrcode-list" ],
}
```

## 使用

在 `book.json` 文件中的 `pluginsConfig` 添加 `qrcode-list` 并进行配置：

```
{
  "pluginsConfig": {
    "qrcode-list": {
      // 列表标题
      "title": "打赏&联系",
      "description": "如果您感觉有收获，欢迎给我打赏，以激励我输出更多的优质内容。",
      "except": [ "自述" ],
      "lists": [
        {
          "src": "https://raw.githubusercontent.com/pushmetop/resource/master/donate/alipay.png",
          "content": "支付宝",
          "alt": "支付宝"
        },
        {
          "text": "pushmetop",
          "content": "pushmetop",
          "alt": "pushmetop"
        }
      ]
    }
  }
}
```

## 参数说明

* title - 作为二维码列表的标题，类型为字符串。
* description - 作为二维码列表的描述，类型为字符串。
* only  - 当页面名在 only 数组中时显示二维码列表，不能与 except 同时配置，类型为数组（参数 Summary.md 中所设置的页面名）。
* except - 当页面名在 except 数组中时不显示二维码列表，不能与 only 同时配置，类型为数组（参数 Summary.md 中所设置的页面名）。
* lists - 二维码列表的数据集合，类型为数组。
* lists.src - 二维码图片地址，当 src 不存在时或者为空字符串时，会根据 lists.text 中的文字来生成二维码，类型为字符串。
* lists.alt - 二维码图片无法加载时的代替内容，类型为字符串。
* lists.content - 二维码图片描述，类型为字符串。
* lists.text - 需要转化为二维码图片的内容，当 src 不存在时或者为空字符串时，会生成二维码，类型为字符串。
* lists.margin - 二维码图片的边框大小，类型为数字。

## 打赏&联系

如果您感觉有收获，欢迎给我打赏，以激励我输出更多的优质内容。

![打赏&联系](https://raw.githubusercontent.com/pushmetop/resource/master/donate/donate.png)

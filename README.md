# GitBook Qrcode List

## 简介

* 一款 gitbook 插件。
* 用于在文章底部添加二维码列表。


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


<link rel="stylesheet" href="https://github.com/pushmetop/gitbook-plugin-qrcode-list/blob/master/assets/index.css">
<footer class="gitbook-plugin-qrcode-lists"><h2 id="打赏联系">打赏&amp;联系</h2><p>如果您感觉有收获，欢迎给我打赏，以激励我输出更多的优质内容。</p><div class="gitbook-plugin-qrcode-list"><img src="https://raw.githubusercontent.com/pushmetop/resource/master/donate/alipay.png" alt="支付宝"><p>支付宝</p></div><div class="gitbook-plugin-qrcode-list"><img src="https://raw.githubusercontent.com/pushmetop/resource/master/donate/wxpay.png" alt="微信支付"><p>微信支付</p></div><div class="gitbook-plugin-qrcode-list"><img src="https://raw.githubusercontent.com/pushmetop/resource/master/donate/wechat.png" alt="微信"><p>微信</p></div><div class="gitbook-plugin-qrcode-list"><img src="https://raw.githubusercontent.com/pushmetop/resource/master/donate/group.png" alt="QQ群"><p>QQ群</p></div></footer>

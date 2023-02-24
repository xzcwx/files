<h1 align="center">⭐针对于网页文件处理⭐</h1>
<h3 align="center">🚀🚅简单便捷 MIME类型 直接使用🙌</h3>

[toc]

---

## 特色亮点🔥
- 💎 采用 TypeScript 编写，提供完整类型定义
- 🚀 通过 API 一键操作，摆脱繁琐的实现流程
- 🚀 CDN 支持
- ⚡ 源码编译压缩，单文件打包体积小

---

## 安装

使用npm：

```text
npm i @xzcwx/files
```

使用cdn：
```
<script src="https://www.unpkg.com/@xzcwx/files@0.0.0-alpha.2/dist/files.min.js"></script>
```

---

## 主要功能

### 文件操作

1. 下载文件
```javascript
async function foo() {
  const data = `
  # Markdown
  - Markdown是一种轻量级标记语言，创始人为约翰·格鲁伯。它允许人们使用易读易写的纯文本格式编写文档，然后转换成有效的XHTML（或者HTML）文档。[4]这种语言吸收了很多在电子邮件中已有的纯文本标记的特性
  - 由于Markdown的轻量化、易读易写特性，并且对于图片，图表、数学式都有支持，目前许多网站都广泛使用Markdown来撰写帮助文档或是用于论坛上发表消息。如GitHub、Reddit、Discord、Diaspora、Stack Exchange、OpenStreetMap 、SourceForge、简书等，甚至还能被用来撰写电子书。
  `
  const file = loadsBytes(data, {
    filename: `Markdown介绍.md`,
    type: MIME.MARKDOWN
  })
  await downloadFile(file)
}
```

2. 打开文件对话框
```javascript
import {MIME, openFileDialog} from "files";

const [file] = await openFileDialog({
  accept: MIME.IMAGE
});
console.group("图片文件获取");
console.log(file)
console.groupEnd();
```

### 网络请求


---

## 说明📖

目前此项目还在开发阶段，并不是最终稳定成品，请拭目以待，感谢大家支持。

---

## 更新日志

- 0.0.0-alpha.2 | 2023/2/20
    - 最初开发测试版本2

---

## 关于作者

- 作者：贤哲XianZhe
- GitHub：https://github.com/XianZheCwx
- CSDN：https://blog.csdn.net/XianZhe_

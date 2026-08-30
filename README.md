# @vvi/type-react

[![version](<https://img.shields.io/npm/v/@vvi/type-react.svg?logo=npm&logoColor=rgb(0,0,0)&label=版本号&labelColor=rgb(73,73,228)&color=rgb(0,0,0)>)](https://www.npmjs.com/package/@vvi/type-react) [![issues 提交](<https://img.shields.io/badge/issues-提交-rgb(255,0,63)?logo=github>)](https://github.com/gleanings/type-react/issues)

用于 [React](https://zh-hans.react.dev) 的简单类型。

## 安装

```bash
npm install --save-dev  @vvi/type-react

# pnpm
pnpm add --save-dev @vvi/type-react

# yarn
yarn add --save-dev @vvi/type-react
```

## 可用的类型

- `SimpleObject` - 简单对象
- `HTMLTagName` - 基础 HTML 元素标签名（含 `SVG` ）
- `ElementTypeFromTagName` - 从元素标签获取元素的类型
- `TagNameToProps` - 从元素标签名获取该元素的 `Props` （不含 `ref` ）
- `WithRefForTagName` - 从元素标签名获取该元素的 `Props` （含 `ref` ）
- `MayWithRef` - 可能携带 `ref` 属性
- `JSXOtherAttribute` - 其他可配置的属性
- `AsProp` - 作为元素使用（ `style-component` 构建的 JSX 携带该属性 ）
- _**`PropsWithTagName`**_ - 简单的属性包装器
- _**`PropsWithTagNameCustomRef`**_ - 含自定义 ref 的属性（元素标签）
- _**`JSXComponent`**_ - 构建带类型声明的组件 （元素标签）
- _**`JSXComponentNoProps`**_ - 无自定义属性类型（元素标签），等同于 `JSXComponent<{}, TagName>`
- _**`MergeProps`**_ - 合并属性
- _**`PolymorphicComponent`**_ - 多态组件

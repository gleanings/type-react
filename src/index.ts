/**
 * @packageDocumentation
 * @module @vv/type-react/index
 * @file index.ts
 * @description _
 * @author Mr.MudBean <Mr.MudBean@outlook.com>
 * @license MIT
 * @copyright 2026 ©️ Mr.MudBean
 * @since 2026-08-29 21:56
 * @version 1.0.0
 * @lastModified 2026-08-30 17:15
 */

import type {
  JSX,
  ComponentPropsWithoutRef,
  ElementType,
  ComponentPropsWithRef,
  Ref,
} from 'react';

/**
 * ## 简单对象类型
 */
export type SimpleObject = Record<string, unknown>;

/**
 * ## 基础 HTML 原属标签名（含 SVG ）
 */
export type HTMLTagName =
  keyof HTMLElementTagNameMap | keyof SVGElementTagNameMap;

/**
 * ## 从元素标签获取元素类型
 */
export type ElementTypeFromTagname<T extends HTMLTagName> =
  T extends keyof HTMLElementTagNameMap
    ? HTMLElementTagNameMap[T]
    : T extends keyof SVGElementTagNameMap
      ? SVGElementTagNameMap[T]
      : never;

/**
 * ## 从元素标签名获取该元素的 Props（不含 ref）
 */
export type TagNameToProps<T extends HTMLTagName> = ComponentPropsWithoutRef<T>;

/**
 * ## 从元素标签名获取该元素的 Props（含 ref ）
 */
export type WithRefForTagName<T extends HTMLTagName = 'div'> =
  ComponentPropsWithRef<T>;

/**
 * ## 可能携带 `ref` 属性
 */
export type MayWithRef<T extends HTMLElement | SVGElement> = {
  ref?: Ref<T>;
};

/**
 * ## 其他可配置的属性
 */
export type JSXOtherAttribute = {
  /** 展示名 */
  displayName?: string;
  /** 默认属性 */
  defaultProps?: any;
  /** Prop 类型校验（JS 项目） */
  propTypes?: any;
};

/**
 *  ## 简单的属性包装器
 *
 *  如果不使用自定义参数，直接使用 **`WithRefForTagName<tagname>`** 即可
 *
 * @example
 *
 * ```ts
 * import { PropsWithTagName } from '@vvi/type-react';
 *
 * // 常规使用
 * export const Box = (
 *  props: PropsWithTagName
 * ) => <div {...props} />
 *
 * // 携带自定义参数的用法
 * export const Box = (
 *  {
 *    age,
 *    ...props
 *  }: PropsWithTagName<{
 *    age: number;
 *  }>
 * ) =>  <div {...props}>{ age < 18 ? '少儿不宜' : 'www.yandex.com' }</div>
 *
 * // 携带自定义参数并指定特定的元素的用法
 * export const Box = (
 *  {
 *    age,
 *    ...props
 *  }: PropsWithTagName<{
 *    age: number;
 *  } , 'span'>
 * ) =>  <span {...props}>{ age < 18 ? '少儿不宜' : 'www.yandex.com' }</span>
 * ```
 *
 */
export type PropsWithTagName<
  CustomProps = SimpleObject,
  TagName extends HTMLTagName = 'div',
> = WithRefForTagName<TagName> & CustomProps;

/***
 * ## 含自定义 ref 的属性（元素标签）
 */
export type PropsWithTagNameCustomRef<
  CustomProps = SimpleObject,
  TagName extends HTMLTagName = 'div',
  RefType = SimpleObject,
> = CustomProps &
  TagNameToProps<TagName> & {
    ref?: Ref<RefType>;
  };

/**
 * ## 构建带类型声明的组件（元素标签版）
 *
 * @example
 *
 * ```ts
 * import { styled , css } from 'styled-components';
 * import type { JSXComponent } from '@vvi/type-react';
 *
 * // 常规使用（ 默认无参数 ，div 元素）
 * export const Box: JSXComponent = styled.div`
 *     display: inline-block;
 *     padding: 4px 12px;
 * `;
 *
 * // 带参数使用 （div 元素）
 * export const OtherBox: JSXComponent<{
 *    $type: boolean
 * }> = styled.div`
 *     display: inline-block;
 *     padding: 4px 12px;
 *     cursor: ${({$type}) =>
 *        ($type ?
 *         css`
 *           left: 15%;
 *           background-color: rgba(120, 120, 120, 0.6);
 *         `
 *         : css`
 *           left: 45%;
 *           background-color: rgba(35, 70, 247, 1);
 *         `
 *        )
 *     }
 * `;
 *
 * // 带参数且需要指定元素类型
 * export const LastExampleBox: JSXComponent<{
 *   $type: boolean
 * }, 'input'>
 *  = styled.input`
 *     display: inline-block;
 *     padding: 4px 12px;
 *     cursor: ${({$type}) =>
 *        ($type ?
 *         css`
 *           left: 15%;
 *           background-color: rgba(120, 120, 120, 0.6);
 *         `
 *         : css`
 *           left: 45%;
 *           background-color: rgba(35, 70, 247, 1);
 *         `
 *        )
 *     }
 * `;
 * ```
 *
 * 由于 V5+ 版本移除了 `StyledComponent` 范性，导致在当前库中出现了：
 *
 * ```bash
 * The inferred type of 'Xxxxx' cannot be named without a reference
 * to '../../../../../node_modules/styled-components/dist/types'.
 * This is likely not portable. A type annotation is necessary.
 * ```
 *
 * 所以需要显式的声明 styled-components 构建的组件的类型
 *
 * 可以通过第一参数限定
 */
export type JSXComponent<
  CustomProps extends SimpleObject = SimpleObject,
  TagName extends HTMLTagName = 'div',
> = {
  (props: WithRefForTagName<TagName> & CustomProps): JSX.Element;
} & JSXOtherAttribute;

/**
 * ## 无自定义属性类型（元素标签版）
 * 等同于 `JSXComponent<{}, TagName>`
 * @example
 *
 * ```ts
 * import { styled } from 'styled-components';
 * import type { JSXComponentNoProps } from '@vvi/type-react';
 *
 * // 常规使用（ div 元素）
 * export const Box: JSXComponentNoProps = styled.div`
 *     display: inline-block;
 *     padding: 4px 12px;
 * `;
 *
 * // 指定元素类型使用
 * export const OtherBox: JSXComponentNoProps<'input'>
 *    = styled.input`
 *     display: inline-block;
 *     padding: 4px 12px;
 *     cursor: ${({$type}) =>
 *        ($type ?
 *         css`
 *           left: 15%;
 *           background-color: rgba(120, 120, 120, 0.6);
 *         `
 *         : css`
 *           left: 45%;
 *           background-color: rgba(35, 70, 247, 1);
 *         `
 *        )
 *     }
 * `;
 *
 * ```
 */
export type JSXComponentNoProps<TagName extends HTMLTagName = 'div'> = {
  (props: WithRefForTagName<TagName>): JSX.Element;
} & JSXOtherAttribute;

/**
 * ## 作为元素使用
 */
type AsProp<As extends ElementType = 'div'> = {
  as?: As;
};

/**
 * ## 合并属性
 */
type MergeProps<As extends ElementType> = AsProp<As> &
  Omit<ComponentPropsWithoutRef<As>, keyof AsProp>;

/**
 * ## 多态组件
 *
 * 支持多种元素类型的组件，常用于构建框架 UI
 *
 * TODO : React 不推荐使用 <Component /> 尽然类式组件当前已久被支持
 * @example
 * ```ts
 * import type { PolymorphicComponent } from '@vvi/type-react';
 *
 * export const Input: PolymorphicComponent<'input'> = ({
 *  as: Component = 'input',
 *  ref,
 *  ...props,
 * }) => <Component ref={ref} {...props} />
 * ```
 */
export type PolymorphicComponent<
  T = {},
  DefaultElement extends ElementType = ElementType,
> = (<As extends ElementType = DefaultElement>({
  as,
  ...props
}: MergeProps<As> & { ref?: Ref<Element> } & T) => JSX.Element) &
  JSXOtherAttribute;

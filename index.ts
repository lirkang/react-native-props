/**
 * @Author likan
 * @Date 2022-06-09 11:24:40
 * @FilePath E:\WorkSpace\txzeveryapp\src\common\config\util.ts
 */

import {
  Button,
  ButtonProps,
  Image,
  ImageProps,
  ScrollView,
  ScrollViewProps,
  Switch,
  SwitchProps,
  Text,
  TextInput,
  TextInputProps,
  TextProps,
  TouchableOpacity,
  TouchableOpacityProps,
  View,
  ViewProps
} from 'react-native'

/** props类型 */
export interface ComponentsProps {
  readonly View: ViewProps
  readonly Text: TextProps
  readonly ScrollView: ScrollViewProps
  readonly TextInput: TextInputProps
  readonly TouchableOpacity: TouchableOpacityProps
  readonly Image: ImageProps
  readonly Button: ButtonProps
  readonly Switch: SwitchProps
}

/** 函数类型 */
export interface SetCustomPropsDTO {
  <C extends keyof ComponentsProps, P extends Partial<ComponentsProps[C]>>(
    name: C,
    props: P
  ): SetCustomPropsDTO
  next: SetCustomPropsDTO
}
/** 可以修改的组件 */
export const components: Record<keyof ComponentsProps, any> = {
  View,
  Text,
  ScrollView,
  TextInput,
  TouchableOpacity,
  Image,
  Button,
  Switch
}

/** 自定义组件属性*/
export const setCustomProps: SetCustomPropsDTO = function (name, props) {
  if (name && props) {
    const component = components[name]

    const { render, defaultProps } = component

    component.defaultProps = { ...defaultProps }
    component.render = function (originProps: typeof props, ref: unknown) {
      const preProps = originProps

      Object.keys(props).forEach(key => {
        // @ts-ignore
        if (Array.isArray(props[key])) {
          // @ts-ignore
          originProps = {
            ...originProps,
            [key]: [props[key], originProps[key]]
          }
        } else {
          // @ts-ignore
          originProps = {
            ...originProps,
            [key]: originProps[key] ?? props[key]
          }
        }
      })

      try {
        return render.apply(this, [originProps], ref)
      } finally {
        originProps = preProps
      }
    }
  }

  return setCustomProps
}

setCustomProps.next = setCustomProps

export default setCustomProps

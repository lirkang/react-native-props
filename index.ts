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
interface ComponentsPropsDTO {
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
interface SetCustomPropsDTO {
  <
    C extends keyof ComponentsPropsDTO,
    P extends Partial<ComponentsPropsDTO[C]>
  >(
    name: C,
    props: P
  ): SetCustomPropsDTO
  next: SetCustomPropsDTO
}

/** 可以修改的组件 */
const components: Record<keyof ComponentsPropsDTO, unknown> = {
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
const setCustomProps: SetCustomPropsDTO = function (name, props) {
  if (name && props) {
    const component = components[name]

    const { render, defaultProps } = component

    // @ts-ignore
    component.defaultProps = { ...defaultProps }
    // @ts-ignore
    component.render = function (originProps: typeof props, ref: unknown) {
      const preProps = originProps

      Object.keys(props).forEach(key => {
        if (Array.isArray(props[key])) {
          originProps = {
            ...originProps,
            [key]: [props[key], originProps[key]]
          }
        } else {
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

/**
 * @Author likan
 * @Date 2022-06-10 10:00:38
 * @FilePath E:\TestSpace\index.d.ts
 */

import {
  ButtonProps,
  ImageProps,
  ScrollViewProps,
  SwitchProps,
  TextInputProps,
  TextProps,
  TouchableOpacityProps,
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

/** 支持修改的组件列表 */
type ComponentsDTO = Record<keyof ComponentsPropsDTO, unknown>

declare module 'react-native-props' {
  export type { ComponentsPropsDTO, SetCustomPropsDTO, ComponentsDTO }
}

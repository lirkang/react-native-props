/**
 * @Author likan
 * @Date 2022-06-09 11:24:40
 * @FilePath E:\WorkSpace\txzeveryapp\src\common\config\util.ts
 */

import {
  ActivityIndicator,
  ActivityIndicatorProps,
  Button,
  ButtonProps,
  FlatList,
  FlatListProps,
  Image,
  ImageBackground,
  ImageBackgroundProps,
  ImageProps,
  KeyboardAvoidingView,
  KeyboardAvoidingViewProps,
  Modal,
  ModalProps,
  RefreshControl,
  RefreshControlProps,
  ScrollView,
  ScrollViewProps,
  SectionList,
  SectionListProps,
  StatusBar,
  StatusBarProps,
  Switch,
  SwitchProps,
  Text,
  TextInput,
  TextInputProps,
  TextProps,
  TouchableHighlight,
  TouchableHighlightProps,
  TouchableOpacity,
  TouchableOpacityProps,
  TouchableWithoutFeedback,
  TouchableWithoutFeedbackProps,
  View,
  ViewProps,
  VirtualizedList,
  VirtualizedListProps
} from 'react-native'

/** props类型 */
interface ComponentsPropsDTO {
  View: ViewProps
  Text: TextProps
  ScrollView: ScrollViewProps
  TextInput: TextInputProps
  TouchableOpacity: TouchableOpacityProps
  Image: ImageProps
  Button: ButtonProps
  Switch: SwitchProps
  VirtualizedList: VirtualizedListProps<unknown>
  Modal: ModalProps
  TouchableWithoutFeedback: TouchableWithoutFeedbackProps
  TouchableHighlight: TouchableHighlightProps
  RefreshControl: RefreshControlProps
  ImageBackground: ImageBackgroundProps
  ActivityIndicator: ActivityIndicatorProps
  KeyboardAvoidingView: KeyboardAvoidingViewProps
  SectionList: SectionListProps<unknown>
  StatusBar: StatusBarProps
  FlatList: FlatListProps<unknown>
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
  Switch,
  VirtualizedList,
  Modal,
  TouchableWithoutFeedback,
  TouchableHighlight,
  RefreshControl,
  ImageBackground,
  ActivityIndicator,
  KeyboardAvoidingView,
  SectionList,
  StatusBar,
  FlatList
}

/** 自定义组件属性*/
const setCustomProps: SetCustomPropsDTO = function (name, props) {
  if (name && props) {
    const component = components[name]

    // @ts-ignore
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

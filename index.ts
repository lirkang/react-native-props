// @ts-nocheck

/**
 * @Author likan
 * @Date 2022-06-09 11:24:40
 * @FilePath E:\WorkSpace\txzeveryapp\src\common\config\util.ts
 */

import {
  Button,
  Image,
  ScrollView,
  Switch,
  Text,
  TextInput,
  TouchableOpacity,
  View
} from 'react-native'
import { ComponentsDTO, SetCustomPropsDTO } from './index.d'

/** 可以修改的组件 */
export const components: ComponentsDTO = {
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

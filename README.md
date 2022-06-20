# react-native-props

自定义组件 react-native 全局属性, 支持所有的原生组件(除 Pressable 外).

Customize global component properties for react-native, all native components are Available(Excluded Pressable).

## 注意/Attention

如果你需要修改的 property 可以使用数组传递, 请尽量使用数组, 否则可能导致一些问题.

If you need to modify the property can be passed with arrays, please try to use arrays, otherwise it may cause some problems.

## 示例/Example

- 基本使用/Basic Usage

```typescript
setGlobalProps('Image', {
  resizeMode: 'cover'
})
```

- 支持链式调用/Other Usages

```typescript
setGlobalProps('Text', {
  allowFontScaling: false,
  numberOfLines: 1
}).next('TextInput', {
  style: [{ paddingVertical: 0 }]
})
```

```typescript
setGlobalProps('ScrollView', {
  showsVerticalScrollIndicator: false,
  showsHorizontalScrollIndicator: false
})('TouchableOpacity', {
  activeOpacity: 0.6
})
```

---

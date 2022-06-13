# react-native-props

自定义组件 react-native 全局属性, 支持所有的原生组件.

Customize global component properties for react-native, all native components are Available.

## 注意/Attention

如果你需要修改的 prop 可以使用数组传递, 请尽量使用数组, 否则可能导致一些问题.

If you need to modify the prop can be passed with arrays, please try to use arrays, otherwise it may cause some problems.

## 示例/Example

- 基本使用/Basic Usage

```typescript
setCustomProps('Image', {
  resizeMode: 'cover'
})
```

- 支持链式调用/Other usages

```typescript
setCustomProps('Text', {
  allowFontScaling: false,
  numberOfLines: 1
}).next('TextInput', {
  style: [{ paddingVertical: 0 }]
})
```

- 支持连续调用/Other usages

```typescript
setCustomProps('ScrollView', {
  showsVerticalScrollIndicator: false,
  showsHorizontalScrollIndicator: false
})('TouchableOpacity', {
  activeOpacity: 0.6
})
```

---

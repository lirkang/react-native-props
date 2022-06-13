# react-native-props

react-native 自定义全局组件属性

Customize global component properties for react-native

## 支持的组件/Supported components

- View
- Text
- ScrollView
- TextInput
- TouchableOpacity
- Image
- Button
- Switch

---

### 示例/Simple usage

- 基本使用/Base Usage

```typescript
setCustomProps('Image', {
  resizeMode: 'cover'
})
```

- 支持链式调用

```typescript
setCustomProps('Text', {
  allowFontScaling: false,
  numberOfLines: 1
}).next('TextInput', {
  style: [{ paddingVertical: 0 }]
})
```

- 支持连续调用

```typescript
setCustomProps('ScrollView', {
  showsVerticalScrollIndicator: false,
  showsHorizontalScrollIndicator: false
})('TouchableOpacity', {
  activeOpacity: 0.6
})
```

---

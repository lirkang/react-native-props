# react-native-props

支持 react-native 自定义全局组件属性

---

## 支持的组件

- View
- Text
- ScrollView
- TextInput
- TouchableOpacity
- Image
- Button
- Switch

---

### 示例

- 基本使用

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

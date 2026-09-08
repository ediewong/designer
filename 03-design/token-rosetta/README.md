# token-rosetta

**Figma variable names → CSS custom properties**

一个 Claude Skill：把 Figma 变量名机械地转换成 CSS 变量名，并校验转换后不撞名。

## 为什么

Figma 变量只存在于设计文件内部，CSS 变量是运行时真实存在的东西——中间没有任何编译器负责翻译。所以 `semantic/color/bg/component` 对模型来说只是一个字符串标签。没有明确规则时它只有两条路，两条都是错的：

- 直译成 `--semantic-color-bg-component`，引用一个不存在的变量
- 退回字面值 `#f1f0ee`，页面看起来正确但**不报错**，而这个像素已经脱离体系

## 规则

唯一的硬要求：**映射必须可机械执行、无歧义、双向唯一。** 给定一个 Figma 名只能推出一个 CSS 名，反过来也只能倒推回一个。其余细节都能按项目改。

| Figma | CSS |
|---|---|
| `core/color/gray/9` | `--color-gray-9` |
| `core/spacing/4` | `--spacing-4` |
| `semantic/color/bg/canvas` | `--bg-canvas` |
| `semantic/color/action/solid-hover` | `--action-solid-hover` |
| `semantic/radius/card` | `--radius-card` |
| `semantic/type/ui/body/size` | `--type-ui-body-size` |

## 用法

```bash
node scripts/check-names.mjs tokens.json     # Tokens Studio 导出的 JSON
node scripts/check-names.mjs names.txt       # 每行一个 Figma 变量名
```

撞名时打印冲突并以退出码 1 结束，可以直接挂进构建流程。脚本顶部的配置常量按项目调整。

```
✗ 发现 1 处撞名：

  --text-primary
    ← semantic/ui/text/primary
    ← semantic/read/text/primary
```

为什么必须自动校验：撞名的两个变量都能正常解析，页面不报错，只是其中一个的值悄悄变成了另一个。

## 内容

```
token-rosetta/
├── SKILL.md                    转换算法、唯一性校验、硬规则
└── scripts/
    └── check-names.mjs         参考实现，可直接用于构建校验
```

## License

MIT

---
name: token-rosetta
description: 把 Figma 变量名机械地转换成 CSS 变量名，并校验转换后不撞名。当用户提到 Figma 变量、design token 命名、token 转 CSS 变量、变量名映射、Figma MCP 返回的变量名对不上代码、CSS 自定义属性命名、变量名撞名、设计稿还原时写死了数值时使用。只要涉及把设计侧的 token 名落到代码里，就使用本技能——不要凭直觉直译变量名，也不要因为找不到对应变量就退回字面值。
---

# Token Rosetta

Figma 变量名 → CSS 变量名。

Figma 变量只存在于设计文件内部，CSS 变量是运行时的东西，中间没有编译器负责翻译。所以 `semantic/color/bg/component` 只是一个字符串标签——**不要假设它对应代码里的某一行**。按下面的算法转换，然后校验。

## 转换算法

对每个 Figma 变量名依次执行四步。

### 1. 按 `/` 拆段

```
semantic/color/bg/canvas  →  [semantic, color, bg, canvas]
```

### 2. 丢弃没有区分作用的段

```
层级名（semantic / sem）？
├── 是 → 丢弃
└── 否
    ├── 原始层标识（core）？
    │   └── 是 → 丢弃标识本身，其后的类别名全部保留
    ├── 是 color，且不在原始层？
    │   └── 是 → 丢弃
    └── 其他 → 保留
```

**原始层的类别名必须保留**：`--gray-9` 看不出是颜色、间距还是别的。

**语义层里可以丢弃的类别名只有 `color`**：`bg`、`text`、`border`、`action` 本身就只可能是颜色。`radius`、`spacing`、`type` 没有这样的隐含词——`semantic/radius/card` 丢掉类别名会变成 `--card`，无法还原。

原则不是「越短越好」，是「短到不撞为止」。

### 3. 拼接

剩余段用 `-` 连接，前面加 `--`，全部小写。段内原有的连字符保留。

### 4. 校验唯一性

对全部 token 跑一遍，**任意两个 Figma 名不得映射到同一个 CSS 名**。

撞名时的修复：**把能区分它们的那一段加回去**，不要给其中一个临时改名——临时改名破坏第 5 节的双向唯一。

```
semantic/ui/text/primary    ─┐
                             ├→ 都是 --text-primary
semantic/read/text/primary  ─┘

修复：--ui-text-primary / --read-text-primary
```

用 `scripts/check-names.mjs` 执行这一步。它撞名时退出码为 1，**始终把它挂进构建**：撞名的两个变量都能正常解析，页面不报错，只是其中一个的值悄悄变成另一个——人工检查发现不了。

## 对照

| Figma | CSS |
|---|---|
| `core/color/gray/9` | `--color-gray-9` |
| `core/spacing/4` | `--spacing-4` |
| `semantic/color/bg/canvas` | `--bg-canvas` |
| `semantic/color/text/primary` | `--text-primary` |
| `semantic/color/action/solid-hover` | `--action-solid-hover` |
| `semantic/radius/card` | `--radius-card` |
| `semantic/type/ui/body/size` | `--type-ui-body-size` |

## 命名约定

**状态与变体写成后缀**：`--action-solid-hover`，不是 `--hover-action-solid`。按名字排序时同一语义的所有状态自然聚在一起，撞名和缺档一眼可见。

**不缩写**：除 `bg` 外一律写全，不用 `pri`、`sec`、`btn`。变量匹配靠字符串，缩写会迫使模型猜测，而猜测在不同轮次之间不一致。

## 硬规则

- **绝不**因为找不到对应 CSS 变量而写字面值。找不到说明 token 体系缺档——停下补 token，再回来转换。写死的值不报错，页面看起来正确，但它已经脱离体系，改色阶时不会跟着动，且无从得知漏了哪几处。
- **绝不**跳过第 4 步。
- **绝不**直译全路径（`--semantic-color-bg-canvas`）。它引用一个不存在的变量。
- **始终**保证映射双向唯一：给定一个 Figma 名只能推出一个 CSS 名，给定一个 CSS 名只能倒推回一个 Figma 名。这是规则可以被脚本执行的前提。第 2、3 步的细节都可以按项目改，改完只需重新满足这一条。

## 改这个 skill 时

修改第 2 步的丢弃规则后，**始终重跑 `scripts/check-names.mjs` 对照上表**。规则很容易写得过于激进——初版写的是「语义层类别名一律丢弃」，`semantic/radius/card` 因此被削成 `--card`，只有跑一遍才会发现。

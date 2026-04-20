# Design Skills Collection

一个聚焦产品设计、设计系统、信息架构与复杂界面分析的 skill 合集仓库。

目前仓库收录两个方向：

- **Systems Design Advisor**：用系统思考分析产品问题，适合诊断增长、留存、流程和体验中的结构性原因。
- **Object Modeling for Design**：用 Narrative Object Model 分析设计稿、后台系统和平台型产品，把界面问题还原到对象、关系、动作与属性层。

## Skills

### 1. Systems Design Advisor

一个融合系统思考（Donella Meadows *Thinking in Systems*）的产品设计顾问 skill。它不只是给 UI 建议，而是帮你看到产品背后的系统结构，包含反馈回路、存量流量、延迟、杠杆点，然后在最有效的地方干预。

源码位于 `systems-design-advisor/`，打包文件为 `systems-design-advisor.skill`。

### 2. Object Modeling for Design

一个面向 B 端、平台型产品与复杂工作流界面的设计分析 skill。它通过 Narrative Object Model 帮你从结构视角梳理系统中的对象、关系、动作与属性，并据此给出信息架构、组件抽象与界面改进建议。

源码位于 `object-modeling-for-design/`，打包文件为 `object-modeling-for-design.skill`。

## 安装

### 方式 A：安装打包文件

```bash
claude skill install systems-design-advisor.skill
claude skill install object-modeling-for-design.skill
```

### 方式 B：直接使用源码

将任一 skill 目录复制到 Claude skills 目录下，例如：

```text
~/.claude/skills/
├── systems-design-advisor/
│   ├── SKILL.md
│   ├── evals/
│   │   └── evals.json
│   ├── LICENSE
│   └── README.md
└── object-modeling-for-design/
    ├── SKILL.md
    ├── references/
    ├── assets/
    ├── LICENSE
    └── README.md
```

## 仓库结构

```text
.
├── LICENSE
├── README.md
├── systems-design-advisor/
│   ├── SKILL.md
│   ├── evals/
│   │   └── evals.json
│   ├── LICENSE
│   └── README.md
├── systems-design-advisor.skill
├── object-modeling-for-design/
│   ├── SKILL.md
│   ├── references/
│   ├── assets/
│   ├── LICENSE
│   └── README.md
└── object-modeling-for-design.skill
```

## 收录标准

这个仓库优先收录以下类型的 design skill：

- 帮助分析复杂产品界面，而不是只给通用 UI 建议
- 能形成稳定方法论，而不是一次性 prompt
- 对 B 端、平台型产品、设计系统、信息架构或产品策略有明确价值
- 包含可复用的参考资料、模板或评估材料

## 贡献约定

新增 skill 时，建议遵循以下结构：

1. 一个独立目录，目录名与 skill 名保持一致
2. 必须包含 `SKILL.md`
3. 如有必要，可附带 `references/`、`assets/`、`evals/`
4. 补充该 skill 自己的 `README.md`
5. 生成对应的 `.skill` 打包文件
6. 更新仓库根 `README.md` 的技能列表

# Object Modeling for Design

一个把 Narrative Object Model 用到设计评审、后台系统分析和设计系统决策中的 Claude Skill。

它适合这些场景：

- 用户发来后台、平台型产品、工作流系统、Figma 截图或设计稿，希望你“看看这个页面/模块/功能”
- 你需要判断界面的根因到底在组件层，还是对象层
- 你想梳理一个产品的对象、关系、动作与属性，再决定信息架构、组件抽象和交互改进
- 你正在做 B 端系统、多角色平台、多租户产品，感觉功能散、词汇乱、结构不稳

## 这个 skill 会做什么

它会优先从结构视角而不是任务视角分析界面：

- 识别对象（Objects）
- 标记核心对象（Core / Signature Objects）
- 梳理对象关系（Association / Aggregation / Component / Inheritance）
- 为对象补全动作与属性
- 基于对象模型导出设计系统、导航与界面优化建议

这类分析尤其适合 B 端与平台型产品，因为很多“界面问题”本质上是对象建模问题。

## 包含内容

```text
object-modeling-for-design/
├── SKILL.md
├── references/
│   ├── enterprise-patterns.md
│   └── relationships.md
├── assets/
│   ├── analysis-template.md
│   └── mermaid-template.md
├── LICENSE
└── README.md
```

## 安装

### 方式 A：安装 `.skill` 文件

```bash
claude skill install object-modeling-for-design.skill
```

### 方式 B：直接使用源码

将该目录放入 Claude skills 目录，并命名为 `object-modeling-for-design`：

```text
~/.claude/skills/object-modeling-for-design/
├── SKILL.md
├── references/
├── assets/
├── LICENSE
└── README.md
```

## 适用边界

- 优先用于复杂业务系统、平台型产品、管理后台、多角色工作流
- C 端产品也能用，但当问题只是简单 UI 排版时，不需要强行对象建模
- 它是设计分析工具，不是 UML 教材；目标是帮助做更好的设计决策

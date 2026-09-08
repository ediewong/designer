# Design Skills Repository

一个产品设计师的 AI 技能仓库，按完整的产品项目工作流组织。每个 skill 都对应一个清晰的设计阶段，并尽量绑定到稳定的方法论来源。

## 仓库目标

- 按设计工作流组织 skill，而不是按零散主题堆叠
- 让每个 skill 都有明确定位、边界和方法论支撑
- 保持“已实现”和“计划中”状态清晰，避免目录看起来完整、实际内容空心
- 保留可直接安装的 `.skill` 发布包，同时让源码结构长期可维护

## 当前结构

```text
.
├── README.md
├── LICENSE
├── 00-meta/
├── 01-discover/
├── 02-define/
├── 03-design/
├── 04-validate/
├── 05-deliver/
├── 06-measure/
├── 07-career/
├── docs/
│   ├── SKILL-SPEC.md
│   └── skill-map.md
└── packages/
    ├── thinking-coach.skill
    ├── systems-design-advisor.skill
    ├── grill-with-docs.skill
    ├── to-prd.skill
    ├── product-iteration-workflow.skill
    └── object-modeling-for-design.skill
```

## 工作流阶段

| 阶段 | 目录 | 说明 |
|------|------|------|
| 元能力 | `00-meta/` | 贯穿所有环节的思维方式与评审能力 |
| 发现 | `01-discover/` | 用户研究、竞品、问题定义、对齐 |
| 定义 | `02-define/` | 信息架构、对象模型、策略与流程 |
| 设计 | `03-design/` | 交互、UI、设计系统、原型 |
| 验证 | `04-validate/` | 可用性、启发式评估、无障碍 |
| 交付 | `05-deliver/` | 设计交付、走查、文档 |
| 度量 | `06-measure/` | 埋点、实验、复盘 |
| 职业 | `07-career/` | 作品集、面试准备 |

## 已实现 Skills

目前已经落位到工作流结构中的 skill：

- `00-meta/thinking-coach/`
- `00-meta/systems-design-advisor/`
- `00-meta/grill-with-docs/`
- `00-meta/product-iteration-workflow/`
- `01-discover/to-prd/`
- `02-define/object-modeling-for-design/`
- `02-define/design-decision-framework/`
- `03-design/token-rosetta/`

已打包的 skill 保留各自独立的发布包：

- `packages/thinking-coach.skill`
- `packages/systems-design-advisor.skill`
- `packages/grill-with-docs.skill`
- `packages/to-prd.skill`
- `packages/product-iteration-workflow.skill`
- `packages/object-modeling-for-design.skill`
- `packages/token-rosetta.skill`

## 仓库级文件

- `docs/SKILL-SPEC.md`：skill 目录结构、frontmatter、命名和打包约定
- `docs/skill-map.md`：工作流阶段、skill 规划、方法论来源和当前状态

## 使用方式

### 安装打包文件

```bash
claude skill install packages/thinking-coach.skill
claude skill install packages/systems-design-advisor.skill
claude skill install packages/grill-with-docs.skill
claude skill install packages/to-prd.skill
claude skill install packages/product-iteration-workflow.skill
claude skill install packages/object-modeling-for-design.skill
claude skill install packages/token-rosetta.skill
```

### 直接使用源码

把对应 skill 目录复制到 Claude skills 目录即可，例如：

```text
~/.claude/skills/
├── thinking-coach/
├── systems-design-advisor/
├── grill-with-docs/
├── product-iteration-workflow/
├── to-prd/
├── object-modeling-for-design/
├── design-decision-framework/
└── token-rosetta/
```

## 维护原则

- 阶段目录负责表达“这个 skill 在工作流中的位置”
- 具体 skill 目录负责表达“这个 skill 的实际方法和资源”
- `docs/` 负责存放仓库级规范与规划文档
- `packages/` 负责存放可直接安装的发布产物
- 未实现的能力先写进阶段索引和 `docs/skill-map.md`，避免提前制造空壳 skill
- 已发布 skill 的 slug 和 `.skill` 文件名尽量保持稳定，避免影响已有安装者

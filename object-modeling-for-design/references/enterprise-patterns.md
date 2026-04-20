# B 端与平台型产品的常见对象原型

这份清单用于分析设计稿时的交叉检查：有没有哪个本该出现的对象被遗漏，或被设计稿隐式处理了。

## 主体 / 身份类对象

- **Tenant / Organization**：顶级隔离单位
- **Workspace / Project**：Tenant 内的次级隔离单位
- **User / Member**：系统用户或租户内身份
- **Role**：角色定义，承载权限
- **Permission**：具体权限点
- **Team / Group**：用户集合
- **Guest / ExternalUser**：外部协作者

## 业务实体类对象

- **Record**：Order、Invoice、Ticket、Lead、Contact、Case
- **Document**：Contract、Proposal、Report、Note
- **Asset**：File、Image、Video、Attachment
- **Task**：Task、Issue、TodoItem
- **Event**：Meeting、Booking、Appointment

## 流程 / 工作流类对象

- **Workflow / Process**：工作流定义
- **WorkflowInstance**：工作流运行实例
- **Stage / Step**：工作流阶段
- **Transition**：阶段跳转规则
- **Approval**：审批动作
- **Assignment**：分派动作及其状态

## 资产 / 配置类对象

- **Template**：项目模板、工单模板、文档模板
- **Policy / Rule**：自动化规则、定价策略、审批策略
- **Configuration / Setting**：配置项
- **Integration**：第三方集成配置
- **Webhook / API Key**：开发者侧对象

## 日志 / 派生类对象

- **AuditLog**：操作审计
- **Activity / Timeline**：业务对象上的事件流
- **Notification**：通知
- **Report**：派生报表
- **Dashboard**：聚合展示单元

## 平台型产品常见跨层对象

- **Plan / Subscription**：订阅计划
- **Billing / Invoice**：账单
- **FeatureFlag**：功能开关
- **Quota / Usage**：配额和使用量

## 分析时的交叉检查

1. 这是单租户还是多租户？
2. 有多少种 Role？不同角色看到的对象和动作有何不同？
3. 每个业务 Record 归属于谁？
4. 业务对象是否存在状态机或工作流层？
5. 这些对象是从模板创建，还是从空白创建？
6. 是否区分 Tenant 级配置、Workspace 级配置和 User 级偏好？
7. 是否需要审计、活动流、计费或配额层？

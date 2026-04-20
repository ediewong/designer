# 对象关系的四种类型：判别与示例

在建模时遇到“这俩对象算什么关系”的犹豫，就查这份。

## Association（关联）

定义：A 和 B 有关联，但互相独立存在。两个对象的生命周期互不牵制。

判别：

- 抽掉 A，B 还在吗？抽掉 B，A 还在吗？都在就是关联
- 关系通常由一个动作体现

示例：

- Account 发送 Direct Message
- User 订阅 Project
- Customer 下 Order

在界面上的体现：通常由动作按钮承载，例如 “Send”“Subscribe”“Assign to...”。

## Aggregation（聚合）

定义：A 是 B 的集合或容器。A 由 B 组成，但 B 独立于 A 存在。

判别：

- B 的实例能独立存在吗？能就是聚合；不能就是组件
- 典型信号词包括“列表”“集合”“分组”“目录”“看板”“相册”

示例：

- Moment 聚合 Tweets
- Playlist 聚合 Songs
- Team 聚合 Members

设计决策含义：

- aggregation 容器页面通常应共用列表或网格视图模式
- 区分“从集合移除”和“删除对象”两个动作

## Component（组件 / 依赖）

定义：B 依存于 A。A 没了，B 失去存在意义。

判别：

- B 能独立于 A 存在吗？不能就是组件关系
- B 的实例是否总是绑定某个 A 的实例而创建？是的话通常也是组件

示例：

- Hashtag 依存于 Tweet
- Comment 依存于 Post
- LineItem 依存于 Order
- Attachment 依存于 Message / Ticket

设计决策含义：

- component 对象不应当出现在顶级导航
- component 对象通常以内嵌板块形式出现在宿主详情页

## Inheritance（继承）

定义：父子关系。子对象共享父对象特征，同时拥有自己的特征。

判别：

- “X 是一种 Y”这句话是否成立？成立就是继承

示例：

- AdminAccount / UserAccount 继承 Account
- InternalTicket / CustomerTicket 继承 Ticket
- RecurringTask / OneTimeTask 继承 Task

设计决策含义：

- 共享骨架，差异化血肉
- 父级动作在各子类型中应保持一致
- 避免隐性继承导致重复设计

## 快速决策树

```text
问：B 是一种 A 吗？
├─ 是 → Inheritance
└─ 否

问：B 能独立于 A 存在吗？
├─ 否 → Component
└─ 是

问：A 是 B 的集合/容器吗？
├─ 是 → Aggregation
└─ 否 → Association
```

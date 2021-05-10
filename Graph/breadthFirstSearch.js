/**
 * 实现一个基础队列
 * @constructor
 */
const Queue = function () {
	//使用数组初始化队列
	let items = [];
	//向队列插入元素
	this.enqueue = function (elem) {
		items.push(elem)
	}
	//从队头删除元素
	this.dequeue = function () {
		return items.shift()
	}
	//查看队头元素
	this.front = function () {
		return items[0]
	}
	//判断队列是否为空
	this.isEmpty = function () {
		return items.length === 0
	}
	//查看队列长度
	this.size = function () {
		return items.length
	}
	//查看队列中的元素
	this.print = function () {
		return items.toString()
	}
}

/**
 * 广度优先搜索
 * @param tree 需要查找的树形图
 * @param target 要查找的节点
 * @returns {number} 返回目标节点在树中的深度
 */
const breadthFirstSearch = function (tree, target) {
	//实例化一个队列
	let queue = new Queue()
	//从根节点到目标节点的深度
	let step = 0
	//入队
	queue.enqueue(tree)
	//遍历队列直至队列为空或找到目标节点
	while (!queue.isEmpty()) {
		step += 1
		let len = queue.size()
		for (let i = 0; i < len; i++) {
			//获取队首元素
			let teamLeader = queue.front()
			//如果是目标元素则返回当前深度
			if (target === teamLeader.value) {
				console.log(step)
				return step
			}
			//如果不是，将下一层节点添加进队列
			if (teamLeader.children && teamLeader.children.length) {
				teamLeader.children.map(item => {
					queue.enqueue(item)
				})
			}
			//删除遍历过的节点
			queue.dequeue()
		}
	}
}

//声明树形数据
const dataTree = {
	name: '国家',
	value: '中国',
	children: [
		{
			name: '省份',
			value: '河北',
			children: [
				{
					name: '城市',
					value: '唐山',
					children: [
						{
							name: '行政区',
							value: '开平区'
						},
						{
							name: '行政区',
							value: '路北区'
						},
						{
							name: '行政区',
							value: '路南区'
						}
					]
				}
			]
		}
	]
}

let step = breadthFirstSearch(dataTree, "开平区");
console.log(`目标结点在图中的第 ${step} 层`);
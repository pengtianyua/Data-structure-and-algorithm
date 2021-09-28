/**
 * 队列是一种特殊的线性表，特殊之处在于它只允许在表的前端（front）进行删除操作，而在表的后端（rear）进行插入操作
 */
function Queue() {
	this.items = []

	//将元素加入到队列中
	Queue.prototype.enqueue = function (elem) {
		this.items.push(elem)
	}
	//删除队列前端元素
	Queue.prototype.dequeue = function () {
		return this.items.shift()
	}
	//查看队列前端元素
	Queue.prototype.front = function () {
		return this.items[0]
	}
	//查看队列是否为空
	Queue.prototype.isEmpty = function () {
		return this.items.length === 0
	}
	//查看队列中的个数
	Queue.prototype.size = function () {
		return this.items.length
	}
	//toString
	Queue.prototype.toString = function () {
		return this.items.toString()
	}
	//清空队列
	Queue.prototype.clear = function () {
		this.items = []
	}
}

/**
 * 击鼓传花
 * @param nameList 参与人员列表
 * @param num 多少次为一轮
 * @returns {{winner: *, losers: *[]}}
 */
function passGame(nameList, num) {
	//实例化队列
	let queue = new Queue()
	//淘汰人员
	let losers = []
	//将参与人员添加到游戏中
	for (let i = 0; i < nameList.length; i++) {
		queue.enqueue(nameList[i])
	}
	//游戏中玩家数量大于1就继续游戏
	while (queue.size() > 1) {
		//根据给定的num值规定 索引为num的人就被淘汰
		for (let i = 0; i < num; i++) {
			//将队首元素添加至队尾
			queue.enqueue(queue.dequeue())
		}
		//取出淘汰的人添加到淘汰人员数组中
		losers.push(queue.dequeue())
	}
	//游戏结束 返回淘汰者列表和胜利者
	return {
		losers,
		winner: queue.dequeue()
	}
}

/**
 * 优先级队列
 */
function PriorityQueue() {

	class QueueElement {
		constructor(elem, priority) {
			this.elem = elem
			this.priority = priority
		}
	}

	this.items = []

	//插入方法
	PriorityQueue.prototype.enqueue = function (elem, priority) {
		let queueElement = new QueueElement(elem, priority)

		//队列为空
		if (this.items.length === 0) {
			this.items.push(queueElement)
		} else {
			let flag = false
			for (let i = 0; i < this.items.length; i++) {
				if (queueElement.priority < this.items[i].priority) {
					this.items.splice(i, 0, queueElement)
					flag = true
					break
				}
			}
			if (!flag) {
				this.items.push(queueElement)
			}
		}
	}
	//删除队列前端元素
	PriorityQueue.prototype.dequeue = function () {
		return this.items.shift()
	}
	//查看队列前端元素
	PriorityQueue.prototype.front = function () {
		return this.items[0]
	}
	//查看队列是否为空
	PriorityQueue.prototype.isEmpty = function () {
		return this.items.length === 0
	}
	//查看队列中的个数
	PriorityQueue.prototype.size = function () {
		return this.items.length
	}
	//toString
	PriorityQueue.prototype.toString = function () {
		const arr = this.items.map(item => item.elem)
		return arr.toString()
	}
	//清空队列
	PriorityQueue.prototype.clear = function () {
		this.items = []
	}
}

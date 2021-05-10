/**
 * 图结构
 */
function Graph() {
	this.vertexes = [] //顶点
	this.edges = new Dictionary() //边

	//添加顶点
	Graph.prototype.addVertex = function (v) {
		//添加顶点
		this.vertexes.push(v)
		//顶点对应空数组添加到字典中
		this.edges.set(v, [])
	}
	//添加边
	Graph.prototype.addEdge = function (v1, v2) {
		//获取顶点1的数组添加顶点2
		this.edges.get(v1).push(v2)
		//获取顶点2的数组添加顶点1
		this.edges.get(v2).push(v1)
	}
	//转为字符串输出
	Graph.prototype.toString = function () {
		let string = ''
		//遍历顶点
		for (let i = 0; i < this.vertexes.length; i++) {
			string += this.vertexes[i] + "->"
			//获取当前节点对应的节点
			let vEdges = this.edges.get(this.vertexes[i])
			//遍历边的另一个顶点
			for (let j = 0; j < vEdges.length; j++) {
				string += vEdges[j] + ''
			}
			string += '\n'
		}
		return string
	}
	//初始化顶点颜色
	Graph.prototype.initializeColor = function () {
		let colors = []
		for (let i = 0; i < this.vertexes.length; i++) {
			colors[this.vertexes[i]] = 'white'
		}
		return colors
	}
	//广度优先搜索
	Graph.prototype.breadthFirstSearch = function (initV, handle) {
		let colors = this.initializeColor()
		let queue = new Queue()
		queue.enqueue(initV)
		while (!queue.isEmpty()) {
			let v = queue.dequeue()
			//获取和顶点相连的顶点
			let vList = this.edges.get(v)

			colors[v] = 'gray'
			//遍历顶点，加入到队列
			for (let i = 0; i < vList.length; i++) {
				let e = vList[i]
				if (colors[e] === 'white') {
					colors[e] = 'gray'
					queue.enqueue(e)
				}
			}

			handle(v)

			colors[v] = 'black'
		}
	}
	//深度优先搜索
	Graph.prototype.depthFirstSearch = function (initV, handle) {
		let colors = this.initializeColor()
		//从某个顶点开始依次递归访问
		this.dfsVisit(initV, colors, handle)
	}
	Graph.prototype.dfsVisit = function (v, colors, handle) {
		colors[v] = 'gray'

		handle(v)

		let vList = this.edges.get(v)
		for (let i = 0; i < vList; i++) {
			let e = vList[i]
			if(colors[e] === 'white') {
				this.dfsVisit(e, colors, handle)
			}
		}

		colors[v] = 'black'
	}
}

let graph = new Graph()
let arr = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I']
for (let i = 0; i < arr.length; i++) {
	graph.addVertex(arr[i])
}
graph.addEdge('A', 'B')
graph.addEdge('A', 'C')
graph.addEdge('A', 'D')
graph.addEdge('C', 'D')
graph.addEdge('C', 'G')
graph.addEdge('D', 'G')
graph.addEdge('D', 'H')
graph.addEdge('B', 'E')
graph.addEdge('B', 'F')
graph.addEdge('E', 'I')
console.log(graph.toString())


function Dictionary() {
	this.items = {}

	Dictionary.prototype.set = function (key, value) {
		this.items[key] = value
	}
	Dictionary.prototype.has = function (key) {
		return this.items.hasOwnProperty(key)
	}
	Dictionary.prototype.remove = function (key) {
		if (!this.has(key)) return false
		delete this.items[key]
		return true
	}
	Dictionary.prototype.get = function (key) {
		return this.has(key) ? this.items[key] : undefined
	}
	Dictionary.prototype.keys = function () {
		return Object.keys(this.items)
	}
	Dictionary.prototype.values = function () {
		return Object.values(this.items)
	}
	Dictionary.prototype.size = function () {
		return Object.keys(this.items).length
	}
	Dictionary.prototype.clear = function () {
		this.items = {}
	}
}

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
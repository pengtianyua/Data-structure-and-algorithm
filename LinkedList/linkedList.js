/**
 * 链表
 */
function LinkedList() {
	this.head = null
	this.length = 0

	//生成节点类
	function Node(data) {
		this.data = data
		this.next = null
	}

	//追加方法
	LinkedList.prototype.append = function (data) {
		//创建新节点
		let newNode = new Node(data)

		//判断是否是第一个节点
		if (this.length === 0) {
			this.head = newNode
		} else {
			let current = this.head
			//找到最后一个节点
			while (current.next) {
				current = current.next
			}
			//最后一个节点的next指向新创建的节点
			current.next = newNode
		}
		this.length += 1
	}
	//toString
	LinkedList.prototype.toString = function () {
		let current = this.head
		let listString = ''
		while (current) {
			listString += current.data + ' '
			current = current.next
		}
		return listString
	}
	//insert
	LinkedList.prototype.insert = function (position, data) {
		//限制传入的position
		if (position < 0 || position > this.length) return false
		//创建新节点
		let newNode = new Node(data)
		//插入的位置
		if (position === 0) {
			newNode.next = this.head
			this.head = newNode
		} else {
			let index = 0
			let current = this.head
			let previous = null
			//从第一个节点索引开始与position对比 如果索引小于position对上一个节点和当前节点进行赋值
			while (index++ < position) {
				previous = current
				current = current.next
			}
			newNode.next = current
			previous.next = newNode
		}
		this.length += 1
		return true
	}
	//get
	LinkedList.prototype.get = function (position) {
		if (position < 0 || position >= this.length) return null
		let current = this.head
		let index = 0
		while(index++ < position) {
			current = current.next
		}
		return current.data
	}
	//indexOf
	LinkedList.prototype.indexOf = function(data) {
		let current = this.head
		let index = 0
		while (current) {
			if(current.data === data) {
				return index
			}
			current = current.next
			index += 1
		}
		return -1
	}
	//update
	LinkedList.prototype.update = function(position, data) {
		if(position < 0 || position >= this.length) return false
		let current = this.head
		let index = 0
		while(index++ < position) {
			current = current.next
		}
		current.data = data
	}
	//removeAt
	LinkedList.prototype.removeAt = function(position) {
		if(position < 0 || position >= this.length) return null
		let current = this.head
		if(position === 0) {
			this.head = this.head.next
		} else {
			let index = 0
			let previous = null
			while (index++ < position) {
				previous = current
				current = current.next
			}
			previous.next = current.next
		}
		this.length -= 1
		return current
	}
	//remove
	LinkedList.prototype.remove = function(data) {
		this.removeAt(this.indexOf(data))
	}
	//isEmpty
	LinkedList.prototype.isEmpty = function() {
		return this.length === 0
	}
	//size
	LinkedList.prototype.size = function() {
		return this.length
	}
}

/**
 * 双向链表
 */
function DoublyLinkedList() {
	this.head = null
	this.tail = null
	this.length = 0

	function Node(data) {
		this.data = data
		this.prev = null
		this.next = null
	}
	//append
	DoublyLinkedList.prototype.append = function (data) {
		let node = new Node(data)
		if(this.length === 0) {
			this.head = node
			this.tail = node
		} else {
			node.prev = this.tail
			this.tail.next = node
			this.tail = node
		}
		this.length += 1
	}
	//toString
	DoublyLinkedList.prototype.toString = function() {
		return this.backwardString()
	}
	//forwardString
	DoublyLinkedList.prototype.forwardString = function() {
		let current = this.tail
		let string = ''
		while (current) {
			string += current.data + ' '
			current = current.prev
		}
		return string
	}
	//backwardString
	DoublyLinkedList.prototype.backwardString = function() {
		let string = ''
		let current = this.head
		while(current) {
			string += current.data + ' '
			current = current.next
		}
		return string
	}
	//insert
	DoublyLinkedList.prototype.insert = function(position, data) {
		if(position < 0 || position > this.length) return false
		let node = new Node(data)
		if(this.length === 0) {
			this.head = node
			this.tail = node
		} else {
			if(position === 0) {
				node.next = this.head
				this.head.prev = node
				this.head = node
			} else if(position === this.length){
				this.tail.next = node
				node.prev = this.tail
				this.tail = node
			} else {
				let index = 0
				let current = this.head
				while (index++ < position) {
					current = current.next
				}
				current.prev.next = node
				node.prev = current.prev
				node.next = current
				current.prev = node
			}
		}
		this.length += 1
		return true
	}
	//get
	DoublyLinkedList.prototype.get = function(position) {
		if(position < 0 || position >= this.length) return false
		if(this.length / 2 >= position) {
			let index = 0
			let current = this.head
			while (index++ < position) {
				current = current.next
			}
			return current.data
		} else {
			let index = this.length - 1
			let current = this.tail
			while (index-- > position) {
				current = current.prev
			}
			return current.data
		}
	}
	//indexOf
	DoublyLinkedList.prototype.indexOf = function(data) {
		let current = this.head
		let index = 0
		while (current){
			if(current.data === data) {
				return index
			}
			current = current.next
			index += 1
		}
		return -1
	}
	//update
	DoublyLinkedList.prototype.update = function(position, data) {
		if(position < 0 || position >= this.length) return false
		if(this.length / 2 > position) {
			let index = 0
			let current = this.head
			while (index++ < position) {
				current = current.next
			}
			current.data = data
			return true
		} else {
			let index = this.length - 1
			let current = this.tail
			while (index-- > position) {
				current = current.prev
			}
			current.data = data
			return true
		}
	}
	//removeAt
	DoublyLinkedList.prototype.removeAt = function(position) {
		if(position < 0 || position >=this.length) return false
		let current = this.head
		if(this.length === 1) {
			this.head = null
			this.tail = null
		} else {
			if(position === 0) {
				this.head.next.prev = null
				this.head = this.head.next
			} else if(position === this.length - 1) {
				current = this.tail
				this.tail.prev.next = null
				this.tail = this.tail.prev
			} else {
				if (this.length / 2 > position) {
					let index = 0
					while (index++ < position) {
						current = current.next
					}
					current.prev.next = current.next
					current.next.prev = current.prev
				} else {
					let index = this.length - 1
					current = this.tail
					while (index-- > position) {
						current = current.prev
					}
					current.prev.next = current.next
					current.next.prev = current.prev
				}
			}
		}
		this.length -= 1
		return current.data
	}
	//remove
	DoublyLinkedList.prototype.remove = function(data) {
		return this.removeAt(this.indexOf(data))
	}
	//isEmpty
	DoublyLinkedList.prototype.isEmpty = function() {
		return this.length === 0
	}
	//size
	DoublyLinkedList.prototype.size = function() {
		return this.length
	}
}

let a = new DoublyLinkedList()
a.append('swt')
a.append('mff')
console.log(a.forwardString())
console.log(a.backwardString())
a.insert(0,'cyw')
console.log(a.toString())
console.log(a.get(0))
console.log(a.get(2))
console.log(a.indexOf('mff'))
console.log(a.update(2, '巢怡雯'))
console.log(a.toString())
console.log(a.removeAt(2))
console.log(a.remove('swt'))
console.log(a.isEmpty())
console.log(a.size())
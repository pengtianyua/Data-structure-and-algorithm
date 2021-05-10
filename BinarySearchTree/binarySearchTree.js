/**
 * 二叉搜索树
 */
function BinarySearchTree() {
	function Node(key) {
		this.key = key
		this.left = null
		this.right = null
	}

	//根节点
	this.root = null

	//插入
	BinarySearchTree.prototype.insert = function (key) {
		let newNode = new Node(key)
		if (this.root === null) {
			this.root = newNode
		} else {
			this.insertNode(this.root, newNode)
		}
	}
	BinarySearchTree.prototype.insertNode = function (node, newNode) {
		if(newNode.key < node.key) {
			if(node.left === null) {
				node.left = newNode
			} else {
				this.insertNode(node.left, newNode)
			}
		} else {
			if(node.right === null) {
				node.right = newNode
			} else {
				this.insertNode((node.right, newNode))
			}
		}
	}
	//最大值
	BinarySearchTree.prototype.max = function () {
		let node = this.root
		while (node != null && node.right != null) {
			node = node.right
		}
		return node
	}
	//最小值
	BinarySearchTree.prototype.min = function () {
		let node = this.root
		while (node != null && node.left != null) {
			node = node.left
		}
		return node
	}
	//获取特点节点
	BinarySearchTree.prototype.search = function (key) {
		return this.searchNode(this.root, key)
	}
	BinarySearchTree.prototype.searchNode = function (node, key) {
		if(node === null) {
			return false
		}
		if(key < node.key) {
			this.searchNode(node.left, key)
		} else if(key > node.key) {
			this.searchNode(node.right, key)
		} else {
			return true
		}
	}
	//删除节点
	BinarySearchTree.prototype.remove = function (key) {
		let parent = null
		let current = this.root
		let isLeftChild = true
		while(current != null) {
			parent = current
			if(key < current.key) {
				isLeftChild = true
				current = current.left
			} else {
				isLeftChild = false
				current = current.right
			}
		}
		//没找到
		if(current === null) return false
		//删除节点为叶子节点
		if(current.left === null && current.right === null) {
			if(current === this.root) {
				this.root = null
			} else if(isLeftChild) {
				parent.left = null
			} else {
				parent.right = null
			}
		}
		//删除节点没有右节点
		else if(current.right === null) {
			if(current === this.root) {
				this.root = current.left
			} else if(isLeftChild) {
				parent.left = current.left
			} else if(isLeftChild) {
				parent.right = current.left
			}
		}
		//删除节点没有左节点
		else if(current.left === null) {
			if(current === this.root) {
				this.root = current.right
			} else if(isLeftChild) {
				parent.left = current.right
			} else {
				parent.right = current.right
			}
		}
		//删除节点有两个子节点
		else {
			let successor = this.getSuccessor(current)
			if(current === this.root) {
				this.root = successor
			} else if(isLeftChild) {
				parent.left = successor
			} else {
				parent.right = successor
			}
			successor.left = current.left

			// let precursor = this.getPrecursor(current)
			// if(current === this.root) {
			// 	this.root = precursor
			// } else if(isLeftChild) {
			// 	parent.left = precursor
			// } else {
			// 	parent.right = precursor
			// }
			// precursor.right = current.right
		}
	}
	//后继 右子节点最小的值
	BinarySearchTree.prototype.getSuccessor = function (delNode) {
		let successor = delNode
		let current = delNode.right
		let successorParent = delNode
		while(current != null) {
			successorParent = successor
			successor = current.left
			current = current.left
		}
		if(successor !== delNode.right) {
			successorParent.left = successor.right
			successor.right = delNode.right
		}
		return successor
	}
	//前驱 左子节点最小的值
	BinarySearchTree.prototype.getPrecursor = function (delNode) {
		let precursor = delNode
		let current = delNode.left
		let precursorParent = delNode
		while (current != null) {
			precursorParent = precursor
			precursor = current
			current = current.right
		}
		if(precursor !== delNode.left) {
			precursorParent.right = precursor.left
			precursor.left = delNode.left
		}
		return precursor
	}

	//先序遍历
	BinarySearchTree.prototype.preorderTraversal = function (handle) {
		this.preorderTraversalNode(this.root, handle)
	}
	BinarySearchTree.prototype.preorderTraversalNode = function (node, handle) {
		if (node != null) {
			handle(node.key)
			//遍历所有左子树
			this.preorderTraversalNode(node.left, handle)
			//遍历所有右子树
			this.preorderTraversalNode(node.right, handle)
		}
	}
	//中序遍历
	BinarySearchTree.prototype.middleorderTraversal = function (handle) {
		this.middleorderTraversalNode(this.root, handle)
	}
	BinarySearchTree.prototype.middleorderTraversalNode = function (node, handle) {
		if (node != null) {
			//遍历所有左子树
			this.middleorderTraversalNode(node.left, handle)
			//处理节点
			handle(node.key)
			//遍历所有右子树
			this.middleorderTraversalNode(node.right, handle)
		}
	}
	//后序遍历
	BinarySearchTree.prototype.postorderTraversal = function (handle) {
		this.postorderTraversalNode(this.root, handle)
	}
	BinarySearchTree.prototype.postorderTraversalNode = function (node, handle) {
		if (node != null) {
			this.postorderTraversalNode(node.left, handle)
			this.postorderTraversalNode(node.right, handle)
			handle(node.key)
		}
	}
}

let bst = new BinarySearchTree()
bst.insert(11)
bst.insert(7)
bst.insert(15)
bst.insert(5)
bst.insert(3)
bst.insert(9)
bst.insert(8)
bst.insert(10)
bst.insert(13)
bst.insert(12)
bst.insert(14)
bst.insert(20)
bst.insert(18)
bst.insert(25)
console.log(bst)

let string = ''

bst.preorderTraversal(key => {
	string += key + " "
})
console.log(string)

string = ''
bst.middleorderTraversal(key => {
	string += key + " "
})
console.log(string)

string = ''
bst.postorderTraversal(key => {
	string += key + " "
})
console.log(string)

console.log(bst.max())
console.log(bst.min())

console.log(bst.search(1))
console.log(bst.search(25))
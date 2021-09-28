/**
 * 栈（stack）又名堆栈，它是一种运算受限的线性表，限定仅在表尾进行插入和删除操作的线性表
 */
function Stack() {
	//数组模拟栈
	this.items = []

	//1.压栈
	Stack.prototype.push = function (elem) {
		this.items.push(elem)
	}
	//2.出栈
	Stack.prototype.pop = function () {
		return this.items.pop()
	}
	//3.获取栈顶元素
	Stack.prototype.peek = function () {
		return this.items[this.items.length - 1]
	}
	//4.栈是否为空
	Stack.prototype.isEmpty = function () {
		return this.items.length === 0
	}
	//5.输出栈内数据
	Stack.prototype.toString = function () {
		return this.items.toString()
	}
	//6.清空栈
	Stack.prototype.clear = function () {
		this.items = []
	}
	//7.获取栈大小
	Stack.prototype.size = function () {
		return this.items.length
	}
}

/**
 * 将十进制转成二进制
 * @param decNumber 十进制数字
 * @returns {string} 二进制数字
 */
function dec2bin(decNumber) {
	let stack = new Stack()
	while (decNumber > 0) {
		stack.push(decNumber % 2)
		decNumber = Math.floor(decNumber / 2)
	}
	let binString = ''
	while (!stack.isEmpty()) {
		binString += stack.pop()
	}
	return binString
}

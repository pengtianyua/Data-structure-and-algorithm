function ArrayList() {
	this.arr = []

	ArrayList.prototype.insert = function (item) {
		this.arr.push(item)
	}
	ArrayList.prototype.toString = function () {
		return this.arr.join('-')
	}
	//交换两个位置的数据
	ArrayList.prototype.swap = function (m, n) {
		let temp = this.arr[m]
		this.arr[m] = this.arr[n]
		this.arr[n] = temp
	}
	//冒泡排序
	ArrayList.prototype.bubbleSort = function () {
		for (let i = this.arr.length - 1; i >= 0; i--) {
			for (let j = 0; j < i; j++) {
				if (this.arr[j] > this.arr[j + 1]) {
					this.swap(j, j + 1)
				}
			}
		}
	}
	//选择排序
	ArrayList.prototype.selectionSort = function () {
		for (let i = 0; i < this.arr.length - 1; i++) {
			let min = i
			for (let j = min + 1; j < this.arr.length; j++) {
				if (this.arr[min] > this.arr[j]) {
					min = j
				}
			}
			this.swap(min, i)
		}
	}
	//插入排序
	ArrayList.prototype.insertionSort = function () {
		for (let i = 1; i < this.arr.length; i++) {
			let temp = this.arr[i]
			let j = i
			while (this.arr[j - 1] > temp && j > 0) {
				this.arr[j] = this.arr[j - 1]
				j--
			}
			this.arr[j] = temp
		}
	}
	//希尔排序

	//快速排序
}

let arrList = new ArrayList()
arrList.insert(3)
arrList.insert(6)
arrList.insert(4)
arrList.insert(2)
arrList.insert(11)
arrList.insert(10)
arrList.insert(5)
// arrList.bubbleSort()
arrList.selectionSort()
console.log(arrList.toString())
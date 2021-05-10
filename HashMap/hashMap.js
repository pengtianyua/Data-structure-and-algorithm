/**
 * 哈希函数
 */
function hashFunc(str, size) {
	let hashCode = 0

	for (let i = 0; i < str.length; i++) {
		hashCode = 37 * hashCode + str.charCodeAt(i)
	}

	let index = hashCode % size
	return index
}

/**
 * 哈希表
 */
function HashTable() {
	this.storage = []
	this.count = 0
	this.limit = 7 //容量

	HashTable.prototype.hashFunc = hashFunc

	//插入和修改
	HashTable.prototype.put = function (key, value) {
		//获取key对应的索引
		let index = this.hashFunc(key, this.limit)
		//索引对应的bucket
		let bucket = this.storage[index]
		//不存在
		if (bucket === undefined) {
			bucket = []
			this.storage[index] = bucket
		}
		//修改数据
		for (let i = 0; i < bucket.length; i++) {
			let tuple = bucket[i]
			if (tuple[0] === key) {
				tuple[1] = value
				return
			}
		}
		//添加数据
		bucket.push([key, value])
		this.count += 1
		//判断是否需要扩容
		if (this.count > this.limit * 0.75) {
			let newSize = this.limit * 2
			let newLimit = this.getPrime(newSize)
			this.resize(newLimit)
		}
	}
	//获取
	HashTable.prototype.get = function (key) {
		let index = this.hashFunc(key, this.limit)
		let bucket = this.storage[index]
		if (bucket === undefined) {
			return null
		}
		for (let i = 0; i < bucket.length; i++) {
			let tuple = bucket[i]
			if (tuple[0] === key) {
				return tuple[1]
			}
		}
		return null
	}
	//删除
	HashTable.prototype.remove = function (key) {
		let index = this.hashFunc(key, this.limit)
		let bucket = this.storage[index]
		if (bucket === undefined) {
			return null
		}
		for (let i = 0; i < bucket.length; i++) {
			let tuple = bucket[i]
			if (tuple[0] === key) {
				bucket.splice(i, 1)
				this.count -= 1
				if (this.limit > 7 && this.count < this.limit * 0.25) {
					let newSize = Math.floor(this.limit / 2)
					let newLimit = this.getPrime(newSize)
					this.resize(newLimit)
				}
				return tuple[1]
			}
		}
		return null
	}
	//是否为空
	HashTable.prototype.isEmpty = function () {
		return this.count === 0
	}
	//哈希表长度
	HashTable.prototype.size = function () {
		return this.count
	}
	//扩容
	HashTable.prototype.resize = function (newLimit) {
		let oldStorage = this.storage
		this.storage = []
		this.count = 0
		this.limit = newLimit
		for (let i = 0; i < oldStorage.length; i++) {
			let bucket = oldStorage[i]
			if (bucket === undefined) {
				continue
			}
			for (let j = 0; j < bucket.length; j++) {
				let tuple = bucket[j]
				this.put(tuple[0], tuple[1])
			}
		}
	}
	//判断是否是质数
	HashTable.prototype.isPrime = function (num) {
		//获取平方根
		let temp = parseInt(Math.sqrt(num))
		for (let i = 0; i <= temp; i++) {
			if (num % i === 0) {
				return false
			}
		}
		return true
	}
	//获取质数
	HashTable.prototype.getPrime = function(num) {
		while(!this.isPrime(num)) {
			num++
		}
		return num
	}
}

let hashTable = new HashTable()
hashTable.put('name', 'swt')
hashTable.put('age', 20)
hashTable.put('sex', '男')
console.log(hashTable)
// hashTable.put('sex', '女')
console.log(hashTable)
/**
 * 判断质数
 */
function isPrime(num) {
	for (let i = 2; i < num; i++) {
		if(num % i === 0) {
			return false
		}
	}
	return true
}

console.log(isPrime(31))
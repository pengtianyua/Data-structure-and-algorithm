/**
 * 集合结构
 */
function Set() {
	this.items = {}

	Set.prototype.add = function (value) {
		if(this.has()) {
			return false
		}
		this.items[value] = value
		return true
	}

	Set.prototype.has = function (value) {
		return this.items.hasOwnProperty(value)
	}

	Set.prototype.remove = function (value) {
		if(!this.has(value)) {
			return false
		}
		delete this.items[value]
		return true
	}

	Set.prototype.clear = function () {
		this.items = {}
	}

	Set.prototype.size = function () {
		return Object.keys(this.items).length
	}

	Set.prototype.values = function() {
		return Object.keys(this.items)
	}

	//并集
	Set.prototype.union = function(otherSet) {
		let unionSet = new Set()
		let values = this.values()
		for(let i = 0; i < values.length; i++) {
			unionSet.add(values[i])
		}
		values = otherSet.values()
		for(let i = 0; i < values.length; i++) {
			unionSet.add(values[i])
		}
		return unionSet
	}
	//交集
	Set.prototype.intersection = function (otherSet) {
		let intersection = new Set()
		let values = this.values()
		for(let i = 0; i < values.length; i++) {
			let item = values[i]
			if(otherSet.has(item)) {
				intersection.add(item)
			}
		}
		return intersection
	}
	//差集
	Set.prototype.difference = function (otherSet) {
		let difference = new Set()
		let values = this.values()
		for(let i = 0; i<values.length; i++) {
			let item = values[i]
			if(!otherSet.has(item)) {
				difference.add(item)
			}
		}
		return difference
	}
	//子集
	Set.prototype.isSubsetOf = function(otherSet) {
		if(this.size() > otherSet.size()) return false
		let values = this.values()
		for(let i = 0; i < values.length; i++) {
			if(!otherSet.has(values[i])) {
				return false
			}
		}
		return true
	}
}

let set = new Set()
set.add('swt')
set.add('mff')
// console.log(set.has('swt'))
// set.remove('swt')
// console.log(set.values())
// console.log(set.size())
// set.clear()
// console.log(set.values())
let other = new Set()
other.add('cyw')
other.add('swt')
other.add('mff')
console.log(set.union(other))
console.log(set.intersection(other))
console.log(set.difference(other))
console.log(set.isSubsetOf(other))

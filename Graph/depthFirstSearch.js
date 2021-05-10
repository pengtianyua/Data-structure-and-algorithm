/**
 * 深度优先搜索
 * @param tree 需要查找的树
 * @param target 需要查找的节点
 * @returns {{children}|*|undefined|boolean}
*/

function depthFirstSearch(tree, target) {
	//数组模拟栈，将树放进栈中
	let stack = [tree]
	while (stack.length !== 0) {
		//取出数组的最后一个元素(栈顶)
		const stackTop = stack.pop()
		//判断当前栈是否有子节点
		if (stackTop.children && stackTop.children.length) {
			/**
			 * 将子节点入栈：
			 * 1.使用扩展运算符取出参数对象，使用reverse方法将数组中的元素进行颠倒
			 * 2.使用扩展运算符取出颠倒后数组中的对象
			 * 3.将取出的对象放入栈中
			 */
			stack.push(...[...stackTop.children].reverse())
		}
		//判断当前栈顶的元素是否为目标值
		if (stackTop.value === target) {
			return stackTop
		}
	}
	return false
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

//测试深度搜索
const targetVal = depthFirstSearch(dataTree, "开平区");
if (targetVal !== false) {
	console.log(`目标结点的数据:`);
	console.log(targetVal);
} else {
	console.log(`目标结点不存在`);
}
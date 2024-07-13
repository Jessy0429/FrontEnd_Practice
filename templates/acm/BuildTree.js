var a = [
    {
        name: '1',
        parent: null,
        id: 1
    },
    {
        name: '2',
        parent: 2,
        id: 3
    },
    {
        name: '3',
        parent: 1,
        id: 2
    },
    {
        name: '4',
        parent: null,
        id: 4
    },
    {
        name: '5',
        parent: 4,
        id: 5
    }
]
function makeMap(arr){
    const map = new Map()
    for(let node of arr){
        map.set(node.id, {id: node.id, name: node.name, children: []})
    }
    return map
}
function getTree(node, arr, map){
    for (let item of arr){
        if(item.parent === node.id){
            map.get(node.id).children.push(getTree(item, arr, map))
        }
    }
    if (!map.get(node.id).children.length) return {"id": node.id, "name": node.name}
    else return map.get(node.id)
}
function printTree(arr){
    const map = makeMap(arr)
    let res = []
    for(let node of arr){
        if(node.parent === null) res.push(getTree(node, arr, map))
    }
    return res
}
let t = printTree(a)
console.log(JSON.stringify(t))
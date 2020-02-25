
let list1 = [
    { areaId: 123, todoname: "1 apple", parts: 3, parttime: 30 },
    { areaId: 123, todoname: "2 banana", parts: 2, parttime: 20 },
    { areaId: 123, todoname: "3 kiwi", parts: 6, parttime: 10 }
]

let list2 = [
    { areaId: 55, todoname: "1 book", parts: 10, parttime: 40 },
    { areaId: 55, todoname: "2 dvd", parts: 2, parttime: 15 }
    // { areaId: 55, todoname: "3 paper", parts: 6, parttime: 30 },
    // { areaId: 55, todoname: "4 note", parts: 4, parttime: 10 },
    // { areaId: 55, todoname: "5 sketchbook", parts: 8, parttime: 20 }
]

let list3 = [
    { areaId: 777, todoname: "1 bird", parts: 3, parttime: 10 },
    { areaId: 777, todoname: "2 dog", parts: 2, parttime: 15 },
    { areaId: 777, todoname: "3 cat", parts: 2, parttime: 15 },
    { areaId: 777, todoname: "4 salamader", parts: 8, parttime: 10 },
    { areaId: 777, todoname: "5 horse", parts: 8, parttime: 10 },
    { areaId: 777, todoname: "6 butterfy", parts: 2, parttime: 10 },
    { areaId: 777, todoname: "7 pikachu", parts: 6, parttime: 10 }
]

let list4 = [
    { areaId: 6, todoname: "xxx rd", parts: 3, parttime: 10 },
    { areaId: 6, todoname: "xxx g", parts: 2, parttime: 15 },
    { areaId: 6, todoname: "xxx t", parts: 2, parttime: 15 },
    { areaId: 6, todoname: "xxx lamader", parts: 8, parttime: 10 },
    { areaId: 6, todoname: "xxx rse", parts: 8, parttime: 10 },
    { areaId: 6, todoname: "xxx tterfy", parts: 2, parttime: 10 },
    { areaId: 6, todoname: "xxx kachu", parts: 6, parttime: 10 }
]

let areaIds = [123, 55, 777, 6]

let fullList = [];
fullList = list1.concat(list2.concat(list3.concat(list4)))

// Shuffle function for an Array
function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
}

const generateListMaxNumber = (todoArray, areaIds, maxNumber) => {
    shuffleArray(todoArray)
    shuffleArray(areaIds)
    let tempList = [];
    let todoListList = [];
    let restNumber = maxNumber;
    let internCounter = areaIds.length;
    areaIds.forEach(areaId => {
        let list = todoArray.filter(todos => todos.areaId === areaId);
        todoListList.push({ areaId: areaId, list: list, length: list.length, divider: internCounter })
        internCounter--
    });

    todoListList.forEach(list => {
        console.log("Restnumber is", restNumber, "Diver:", list.divider)
        let tasksForThisArea = parseInt(restNumber / list.divider)
        console.log(tasksForThisArea)
        if (list.length < tasksForThisArea) {
            list.list.forEach(todo => {
                tempList.push(todo)
            });
            restNumber = restNumber - list.length
        } else {
            for (i = 0; i < tasksForThisArea; i++) {
                tempList.push(list.list[i])
            }
            restNumber = restNumber - tasksForThisArea;
        }
    });
    shuffleArray(tempList)
    // console.log("tempList")
    // console.log(tempList)
    // console.log("Max was", maxNumber, "Todos now: ", tempList.length)
    // console.log("---------")
    return(tempList)
    // console.log(todoArray, todoArray.length)
    // console.log("tempList", tempList)
}

module.exports = {generateListMaxNumber}
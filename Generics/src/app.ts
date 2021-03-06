
// Generics basics:
// Generic is a type which allows the flexible use of other types within its scope

// Built-in generics:
// Array is a built in generics type
// using the generics syntax:
const names: Array<string> = ['Martin', 'Hans'];    // just the same as using: const names: string[]

// names[0].split(' ');


// Promise is also a built in generics type, built in Javascript:
// Promise is a built-in constructor function in Javascript: it's parameter consist of a function:
// this creates a new promise object which is stored this promise constant
const promise: Promise<string> = new Promise((resolve, reject) => {
    setTimeout(() => {
        resolve('Task is done');
    }, 2000)
})

promise.then(data => {
    data.split(' ');
})



// Custom generics:

// Generic function:
// example: generic function that merges 2 object and returns one new object

// possible solution without using generics
// function merge(objA: object, objB: object) {
//     return Object.assign(objA, objB);
// }

// console.log(merge({ name: 'Martin'}, { age: 35 }));

// problem: if this returned object is stored in a variable, the properties won't be accessible
// const mergedObject = merge({ name: 'Martin'}, { age: 35 });
// mergedObject.name

// using a generic function:
// by using the 2 generic types, this function returns an intersection
// this tells typescript that this function will work different kind of types and just an undifined object
// also important to add type constraints to avoid runtime errors or disfunctions using the "extends" keyword
function merge<T extends object, U extends object>(objA: T, objB: U) {
    return Object.assign(objA, objB);
}

// by using the gerenic function typescript can identify the value types
// the value types are set dynamically
const mergedObject = merge({ name: 'Martin', hobbies: ['Workout', 'Guitar']}, { age: 35 });
// we can define the value types in the function, but it's redundant and unncessary
// const mergedObject3 = merge<{name: string, hobbies: string[]}, {age: number}>({ name: 'Martin', hobbies: ['Workout', 'Guitar']}, { age: 35 });

const mergedObject2 = merge({ name: 'Yuri'}, { age: 20 });
console.log(mergedObject.name);
console.log(mergedObject2.name + ' ' + mergedObject2.age + ' years old');


// Generic function example 2:

//helping interface for the generic function
interface ILength {
    length: number;
}

// regarding the generic type this function has no specifics
// but using a tuple to define the exact return types for the function:
function countAndDescribe<T extends ILength>(element: T): [T, string] {
    let textInfo = 'Got no value';
    if(element.length === 1) {
        textInfo = 'Has 1 element';
    } else if (element.length > 0) {
        textInfo = 'Has ' + element.length + ' elements';
    }
    return [element, textInfo];
}

console.log(countAndDescribe(['Workout', 'Guitar']));


// The "key of" constraint:
// Example:
// the second generic type has to be the key of the property from the first generic type: need to use the "extends keyof" syntax:

function extractAndConvert<T extends object, U extends keyof T>(obj: T, key: U) {

    // javascript syntax that returns the value of the object key
    return 'Property value: ' + obj[key];
}

console.log(extractAndConvert({ name: 'Theodor'}, 'name'));



// Generic class:
// to exclude the possible object related errors, define the generic only to the primitive value types:
class DataStorage<T extends string | number | boolean> {

    private data: T[] = [];

    addItem(item: T) {
        this.data.push(item);
    }

    // fixing the objets' reference type related bug (when the splice removes the last object in the array)
    removeItem(item: T) {
        if (this.data.indexOf(item) === -1) {
            return;
        }
        this.data.splice(this.data.indexOf(item), 1);
    }

    getItems() {
        return [...this.data]
    }
}

// Let's create different storages:
const textStorage = new DataStorage<string>();
textStorage.addItem('Martin');
textStorage.addItem('Günther');
textStorage.addItem('Jack');
textStorage.removeItem('Jack');
console.log(textStorage.getItems());

const numberStorage = new DataStorage<number>();
numberStorage.addItem(10);
numberStorage.addItem(20);
numberStorage.removeItem(20);
console.log(numberStorage.getItems());

// problem with the current generic class:
// main problem is objects are reference type (remove is different than removing value types)
// const objectStorage = new DataStorage<object>();
// const martinObject = { name: 'Martin' };        // allocationg a spefific memory location
// objectStorage.addItem({ name: 'Martin' });
// objectStorage.addItem( { name: 'Nana' });
// objectStorage.addItem({ name: 'Lulu' });
// objectStorage.removeItem(martinObject);         // only works because it deletes the object at the exact location
// objectStorage.removeItem( { name: 'Lulu'});
// console.log(objectStorage.getItems());


// Generic utility types: only exist in typescript until compilation, ensures extra type safety:
// helper interface for the example function:
interface ICourseGoal {
    title: string;
    description: string;
    completeUntil: Date;
}

function createCourseGoal(title: string, description: string, date: Date): ICourseGoal {

    // the Partial utility generic type makes all the properties optional
    let courseGoal: Partial<ICourseGoal> = {};
    courseGoal.title = title;
    courseGoal.description = description;
    courseGoal.completeUntil = date;
    return courseGoal as ICourseGoal;
}

// By using the Readonly typescript utility type makes this array locked for further operations
const nameArray: Readonly<string[]> = ['Martin', 'Nana', 'Lulu'];
// nameArray.push('Nunu');
// nameArray.pop()






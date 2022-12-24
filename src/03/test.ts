
export default class Test {
    static init<T extends string>(name: T) {
        console.log("test:" + name)
    }
}
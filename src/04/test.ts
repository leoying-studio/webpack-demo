
export default class Test {
    static init<T extends string, U extends string>(firstName: T, lastName: U): Promise<[T, U]> {
        return new Promise((resolve) => {
            resolve([firstName, lastName])
        })
    }
}
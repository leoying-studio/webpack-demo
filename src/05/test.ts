

function Foo<T extends object, U extends object>(o: T, b: U): Promise<T & U> {
    return new Promise((resolve, reject) => {
        resolve(Object.assign(o, b));
    })
}

export {Foo}
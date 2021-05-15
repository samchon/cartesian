export namespace ArrayUtil
{
    export function repeat<T>(count: number, closure: (index: number) => T): T[]
    {
        const ret: T[] = [];
        for (let i: number = 0; i < count; ++i)
            ret.push(closure(i));
        return ret;
    }
}
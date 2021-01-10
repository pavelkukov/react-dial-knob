export default function composeTwo<T>(
    handler: (...args: T[]) => void,
    callback?: (...args: T[]) => void,
): (...args: T[]) => void {
    return function (...args): void {
        handler(...args)
        if (callback) {
            callback(...args)
        }
    }
}

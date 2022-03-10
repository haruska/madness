// https://gregjs.com/javascript/2016/writing-a-fibonacci-implementation-in-javascript/

const fibLoop = (n, a, b) => (n === 0 ? b : fibLoop(n - 1, a + b, a))
export const fibonacci = (n: number) => fibLoop(n, 1, 0)

const equal = (v1: string | number, v2: string | number, block: { fn: () => string; inverse: () => string }) => {
    if (v1 === v2) {
        return block.fn()
    }
    return block.inverse()
}

export default equal

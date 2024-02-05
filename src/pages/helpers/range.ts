const range = (n: number, block: { fn: (arg: { i: number }) => string }) => {
    let accum = ''
    for (let i = 0; i < n; i += 1) accum += block.fn({ i })
    return accum
}

export default range

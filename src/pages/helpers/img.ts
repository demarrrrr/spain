/* eslint-disable @typescript-eslint/no-var-requires */
import { parse } from 'path'

interface FileFormat {
    base?: string
    webp?: string
    avif?: string
}

const img = (
    src: string,
    unlazy: boolean,
    block: {
        fn: (arg: {
            base: string
            webp: string | undefined
            avif: string | undefined
            unlazy: boolean | undefined
        }) => () => void
    },
) => {
    const srcName = src
    const { name, ext, dir } = parse(srcName)

    const file: FileFormat = {}

    // this is so idiotic
    switch (ext) {
        case '.jpg':
            file.base = require(`../../assets/img/${dir ? `${dir}/${name}` : `${name}`}.jpg`) as string
            file.webp = require(`../../assets/img/${dir ? `${dir}/${name}` : `${name}`}.jpg?as=webp`) as string
            file.avif = require(`../../assets/img/${dir ? `${dir}/${name}` : `${name}`}.jpg?as=avif`) as string
            break
        case '.png':
            file.base = require(`../../assets/img/${dir ? `${dir}/${name}` : `${name}`}.png`) as string
            file.webp = require(`../../assets/img/${dir ? `${dir}/${name}` : `${name}`}.png?as=webp`) as string
            file.avif = require(`../../assets/img/${dir ? `${dir}/${name}` : `${name}`}.png?as=avif`) as string
            break
        case '.svg':
            file.base = require(`../../assets/img/${dir ? `${dir}/${name}` : `${name}`}.svg`) as string
            break
        default:
            file.base = src
            break
    }

    const { base, webp, avif } = file

    return block.fn({ base, webp, avif, unlazy })
}

export default img

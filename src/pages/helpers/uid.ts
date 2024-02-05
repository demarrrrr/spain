import { nanoid } from 'nanoid/non-secure'

const uid = (
    label: string,
    placeholder: string,
    name: string | undefined,
    text: string | undefined,
    type: string | undefined,
    block: {
        fn: (arg: {
            id: string
            label: string
            placeholder: string
            name: string | undefined
            text: string | undefined,
            type: string
        }) => void
    }
) => {
    const id = nanoid(8)


    return block.fn({ id, label, placeholder, name, text, type: type || 'text' })
}

export default uid

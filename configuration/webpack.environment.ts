import { resolve } from 'path'

const config = {
    paths: {
        /* Path to source files directory */
        source: resolve(__dirname, '../src/'),
        /* Path to built files directory */
        output: resolve(__dirname, '../dist/'),
        root: resolve(__dirname),
    },
    server: {
        host: '0.0.0.0',
        port: 8000,
    },
    limits: {
        /* Image files size in bytes. Below this value the image file will be served as DataURL (inline base64). */
        images: 2 * 1024,

        /* Font files size in bytes. Below this value the font file will be served as DataURL (inline base64). */
        fonts: 2 * 1024,
    },
}

export default config
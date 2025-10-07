import { defineConfig } from 'orval'
import * as dotenv from 'dotenv'

dotenv.config()

export default defineConfig({
    client: {
        input: `${process.env.NEXT_PUBLIC_API_BASE_URL}/openapi.json`,
        output: {
            schemas: './src/api/types'
        }
    }
})


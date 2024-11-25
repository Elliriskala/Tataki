import {z} from 'zod';

const envSchema = z.object({
    VITE_DT_KEY: z.string(),
});

export const env = envSchema.parse(process.env);
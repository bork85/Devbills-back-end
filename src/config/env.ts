import dotenv from 'dotenv';
import { z } from 'zod'

dotenv.config();

const envSchema = z.object({
    PORT: z.string().transform(Number).default(3001),
    DATABASE_URL: z.string().min(5, "Campo DATABASE_URL é obrigatório"),
    NODE_ENV: z.enum(['dev', 'qas', 'prd'], {message: 'NODE_ENV inválido!'}),
    FIREBASE_TYPE: z.string().optional(),
    FIREBASE_PROJECT_ID: z.string().optional(),
    FIREBASE_PRIVATE_KEY_ID: z.string().optional(),
    FIREBASE_PRIVATE_KEY: z.string().optional(),
    FIREBASE_CLIENT_EMAIL: z.string().optional(),
    FIREBASE_CLIENT_ID: z.string().optional(),
    FIREBASE_AUTH_URI: z.string().optional(),
    FIREBASE_TOKEN_URI: z.string().optional(),
    FIREBASE_AUTH_PROVIDER_X509_CERT_URL: z.string().optional(),
    FIREBASE_CLIENT_X509_CERT_URL: z.string().optional(),
    FIREBASE_UNIVERSE_DOMAIN: z.string().optional(),
});

const _env = envSchema.safeParse(process.env);

if(!_env.success){
    console.error("🚨 Variaveis de ambiente inválidas!");
    process.exit(1);
}

export const env = _env.data;
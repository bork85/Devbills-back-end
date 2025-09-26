import admin from "firebase-admin";
import { env } from "./env";

const initialyzeFirebaseAdmin = ():void => {
    if(admin.apps.length > 0) return;

    const {FIREBASE_CLIENT_EMAIL, FIREBASE_PRIVATE_KEY, FIREBASE_PROJECT_ID} = env;

    if(!FIREBASE_CLIENT_EMAIL || !FIREBASE_PRIVATE_KEY || !FIREBASE_PROJECT_ID){
        throw new Error("Falha no login, varaveis de ambiente não informadas!");
    }
    try {
        admin.initializeApp({
            credential: admin.credential.cert({
                clientEmail: FIREBASE_CLIENT_EMAIL,
                privateKey: FIREBASE_PRIVATE_KEY,
                projectId: FIREBASE_PROJECT_ID,
            })
    });
    console.log("✅ Conectado ao Firebase Admin SDK com sucesso!");
    } catch (error) {
        console.error("Falha ao conectar ao Firebase", error)
        process.exit(1);
    }
}

export default initialyzeFirebaseAdmin;
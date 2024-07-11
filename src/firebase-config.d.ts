// src/firebase-config.d.ts
declare module '@/firebase-config' {
  import { FirebaseApp } from 'firebase/app'
  import { Auth } from 'firebase/auth'
  import { Firestore } from 'firebase/firestore'

  export const app: FirebaseApp
  export const auth: Auth
  export const db: Firestore
}

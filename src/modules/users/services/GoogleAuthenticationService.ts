import { AppError } from "@shared/errors/AppError";
import { auth } from "@shared/infra/http/firebase";

export class GoogleAuthenticationService {

  public async SignInWithGoogle(): Promise<{
    id: string,
    name: string,
    email: string,
    photoURL: string,
  } | null> {
    return new Promise((resolve, reject) => {
      auth.onAuthStateChanged((user) => {
        if (user) {
          const { uid, displayName, email, photoURL } = user;

          if (!displayName || !email) {
            reject(new AppError("Missing display name or email from google account"));
          }

          resolve({
            id: uid,
            name: displayName,
            email,
            photoURL
          });
        } else {
          resolve(null);
        }
      });
    });
  }
}
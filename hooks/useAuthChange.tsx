import { onAuthStateChanged } from "firebase/auth";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { store } from "../store/store";
import { firebaseAuthService } from "../config/firebase/service";
import { removeUser, setUser } from "../store/auth";

export function useAuthChange() {
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(firebaseAuthService, (user) => {
      console.log('autchange');
      console.log(user);
      
      
      if(user) {
        store.dispatch(setUser(user.toJSON()));
      } else {
        store.dispatch(removeUser());
      }
    });

    return () => unsubscribe();
  }, []);
}

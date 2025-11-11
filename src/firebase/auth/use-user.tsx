import {useFirebase} from '../provider';
import {User as FirebaseUser} from 'firebase/auth';

export const useUser = (): FirebaseUser | null => {
  const {user} = useFirebase();
  return user;
};

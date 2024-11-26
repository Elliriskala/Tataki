import { fetchUsers, fetchUserById, modifyUser, deleteUser, registerUser, checkUsernameOrEmailExists} from "../models/user-models"; 
import { User, ModifiedUser} from "../utils/interfaces";
import { Response } from 'express';
import { AuthenticatedRequest as Request } from '../utils/interfaces';

const getUsers = async (_req: Request, res: Response): Promise<void> => {
    try {
        const users = await fetchUsers();
        res.json(users);
    } catch (e) {
        console.error('getUsers error:', (e as Error).message);
        throw new Error('getUsers error: ' + (e as Error).message);
    }
}

const getUserById = async (req: Request, res: Response): Promise<void> => {
    const user_id = Number(req.params.user_id);
    try {
        const user = await fetchUserById(user_id);
        res.json(user);
    } catch (e) {
        console.error('getUserById error:', (e as Error).message);
        throw new Error('getUserById error: ' + (e as Error).message);
    }
}

const postUser = async (req: Request, res: Response): Promise<void> => {
    const newUser: User = {
        username: req.body.username,
        password_hash: req.body.password_hash,
        email: req.body.email,
        user_level_id: req.body.user_level_id || 2
    }
    if (!newUser.username || !newUser.password_hash || !newUser.email) {
        res.status(400).json({message: 'Missing required information'});
        return;
    }
    try {
        const user_id = await registerUser(newUser);
        if (user_id) {
        res.status(201).json({message: 'User added: ', id: { user_id }});
        } else {
        res.status(500).json({message: 'User not added'});
        }
    } catch (e) {
        console.error('postUser error:', (e as Error).message);
        throw new Error('postUser error: ' + (e as Error).message);
    }
}

const modifyUserById = async (req: Request, res: Response): Promise<void> => {
    const id: number = parseInt(req.params.id);
    const moddedUser: ModifiedUser = {
      username: req.body.username,
      email: req.body.email,
      password_hash: req.body.password_hash,
      user_level_id: req.body.user_level_id
    };
  
    try {
      // Fetch the user to validate ownership
      const item: User | null = await fetchUserById(id);
      if (!item) {
        res.status(404).json({ message: 'User not found' });
      }
  
      // Check if the requesting user is allowed to modify this user
      if (!req.user || item?.user_id !== (req.user as User).user_id && (req.user as User).user_level_id !== 1) {
        res.status(403).json({ message: 'Only admins can modify other users.' });
      }
  
      // Check if the new username or email already exists for another user
      const isConflict: boolean = await checkUsernameOrEmailExists(
        moddedUser.username,
        moddedUser.email,
        id
      );
      if (isConflict) {
        res.status(409).json({ message: 'Username or email is already taken' });
      }
  
      // Update the user
      const result: number = await modifyUser(id, moddedUser);
      if (result > 0) {
        res.status(200).json({ message: 'User modified', id });
      } else {
        res.status(500).json({ message: 'Failed to modify user' });
      }
    } catch (e: any) {
      console.error('modifyUserById', e.message);
      res.status(500).json({ message: 'Error in modifyUserById database query' });
    }
  };


const deleteUserById = async (req: Request, res: Response): Promise<void> => {
    const user_id = Number(req.params.user_id);
    try {
        const result = await deleteUser(user_id);
        if (result) {
            res.json({message: 'User deleted: ', id: user_id});
        } else {
            res.status(404).json({message: 'User not found'});
        }
    } catch (e) {
        console.error('deleteUserById error:', (e as Error).message);
        throw new Error('deleteUserById error: ' + (e as Error).message);
    }
};

export { getUsers, getUserById, postUser, modifyUserById, deleteUserById};
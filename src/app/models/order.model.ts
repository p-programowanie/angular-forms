import { Product } from './product.model';
import { User } from './user.model';

export type Order = Product & User;

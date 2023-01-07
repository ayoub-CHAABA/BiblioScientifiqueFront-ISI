import {Role} from './role';
import {Universite} from "./universite";

export class User {
  public id?: string;
  public username: string;
  public email: string;
  public password: string;
  public  phone: string;
  public accountNonExpired = true;
  public credentialsNonExpired = true;
  public accountNonLocked = true;
  public enabled = true;
  public authorities ?: [];
  public role = new Role();
  public universite= new Universite();

}


import { Users } from "src/app/models/userModel";
//------users-------
import { Profile } from "src/app/models/userModel";
export interface appProfile{
    userdetails:Profile;
}
//------------------

export interface appUsers{
    allusers: Users[];
}

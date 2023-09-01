import {Schema,SchemaFactory} from "@nestjs/mongoose";
import { userentity } from "src/user/entities/user.entity";
import { Document } from "mongoose";
import * as argon2 from "argon2"

@Schema()
export class AdminEntity extends userentity{
 
}
export type AdminDocument = AdminEntity & Document;
export const AdminSchema = SchemaFactory.createForClass(AdminEntity);

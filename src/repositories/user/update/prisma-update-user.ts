import { HttpRequest } from "../../../interfaces/http/request";
import { HttpResponse } from "../../../interfaces/http/response";
import { IDatasAllowedUpdate, IUpdateResponse, IUpdateUserRepository } from "../../../interfaces/user/update/update";
import { User } from "../../../models/user";

export class UpdateUserRepository implements IUpdateUserRepository {
    
    async update(id: string, datas: IDatasAllowedUpdate): Promise<Omit<User, "password">> {
        throw new Error("Method not implemented.");
    }

}
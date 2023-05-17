import { hashSync } from "bcrypt";

import { badRequest, internalError, ok, unprocessableEntity } from "../../../helpers/controllerResponse";
import { validation } from "../../../helpers/validation";
import { HttpRequest } from "../../../interfaces/http/request";
import { HttpResponse } from "../../../interfaces/http/response";
import { IDatasAllowedUpdate, IUpdateResponse, IUpdateUserController, IUpdateUserRepository } from "../../../interfaces/user/update/update";
import { updateUserSchema } from "../../../validators/user/updateUser";

export class UpdateUserController implements IUpdateUserController {
    repository: IUpdateUserRepository
    constructor(repository: IUpdateUserRepository) {
        this.repository = repository
    }

    async handle(httpRequest: HttpRequest<IDatasAllowedUpdate>): Promise<HttpResponse<IUpdateResponse>> {
        try {
            const { id, userId } = httpRequest.params!

            if(id !== userId) return badRequest(['You can only update your user!'])

            if(Object.keys(httpRequest.body!).length === 0) return badRequest(['No data sent!'])

            const validKeys: (keyof IDatasAllowedUpdate)[]=  ['name', 'username', 'bios', 'password']

            const keysErros = Object.keys(httpRequest.body!).some(
                key => !validKeys.includes(key as keyof IDatasAllowedUpdate)
            )

            if(keysErros) return badRequest(['Invalid datas'])

            const valueValidation = await validation({
                schema: updateUserSchema,
                context: httpRequest.body!,
            })

            console.log(valueValidation.errors)

            if(valueValidation.errors) return badRequest(valueValidation.errors)
            
            if(!id) return unprocessableEntity(['Id is required!'])
            
            const newDatasUser: IDatasAllowedUpdate = {
                ...httpRequest.body, 
                password: httpRequest.body?.password ? 
                    hashSync(httpRequest.body?.password, 12) : 
                    httpRequest.body?.password
            }

            const userUpdate = await this.repository.update(id, newDatasUser)
            console.log('userUpdate:', userUpdate)
            return ok<IUpdateResponse>({
                user: userUpdate,
                message: `User updated successfully`
            })

        } catch (error: any) {
            return internalError([error.message])
        }

    }

}

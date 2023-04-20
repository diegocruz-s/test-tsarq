import { Schema, z, ZodError } from 'zod'

type ParamsValidation = {
    schema: Schema,
    context: unknown
}

type ReturnValidation = {
    errors?: string[]
}

export async function validation(params: ParamsValidation): Promise<ReturnValidation> {
    try {
        await params.schema.parse(params.context)
        
        return {}
    } catch (error: any) {
        const errors: string[] = []
        error.issues.forEach((err: any) => {
            console.log('\nerrMessage:', err.message)
            errors.push(err.message)
        })
        
        return {
            errors
        }
    }    

}

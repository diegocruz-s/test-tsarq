export const badRequest = (errors: string[]) => {
    return {
        statusCode: 400,
        body: {
            errors
        }
    }
}

export const ok = <T>(datas: T) => {
    return {
        statusCode: 200,
        body: datas
    }
}

export const created = <T>(datas: T) => {
    return {
        statusCode: 201,
        body: datas
    }
}

export const unprocessableEntity = (errors: string[]) => {
    return {
        statusCode: 422,
        body: {
            errors
        }
    }
}

export const internalError = (errors: string[]) => {
    return {
        statusCode: 500,
        body: {
            errors
        }
    }
}

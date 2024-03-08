import Ajv, { ValidateFunction } from "ajv"
import {SCHEMA} from "@/components/validator/schema";

export class Validator {
    private readonly validate: ValidateFunction

    constructor() {
        const ajv = new Ajv()
        this.validate = ajv.compile(SCHEMA)
    }

    schema() {
        return SCHEMA
    }

    check(input: string): string[] | null {
        try {
            const str = input.trim()
            const obj = JSON.parse(str)
            const isValid = this.validate(obj)

            if (isValid) {
                return null
            }

            return this.validate.errors?.map(
                (err) => `${err.dataPath ? `Путь: ${err.dataPath}; ` : ''}Ошибка: ${err.message};`
            ) || null
        } catch (e: any) {
            return [String(e)]
        }
    }
}

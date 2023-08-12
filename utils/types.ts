export type ApiMethod = "GET" | "HEAD" | "PATCH" | "POST" | "PUT" | "DELETE"

export interface ApiData {
    data?:object
    isMultiPart?: boolean
    path: string,
    method: ApiMethod
    key?: string
}

export type AuthRouteName = "auth-login" | "auth-sign-up" | "auth-forgot"

export interface FormInputBase {
    id: string|number
    inputType: "TEXTFIELD" | "TEXTFIELD-CHIP" | "TEXTAREA" | "SELECT" | "SWITCH" | "FORMTEXT"
    appendIcon?: string
    appendInnerIcon?: string
    appendInnerIconColor?: string
    appendInnerIconFunction?: Function
    prependIcon?: string
    prependInnerIcon?: string
    model?: any
    name?: string
    class?: string
    color?: string
    density?: "default" | "comfortable" | "compact" | undefined
    disabled?: boolean
    errorMessages?: string | string[]
    label?: string
    rules?: any[]
    type?: string
    variant?: "outlined" | "plain" | "filled" | "underlined" | "solo" | "solo-inverted" | "solo-filled" | undefined
}

export interface FormCustomText extends FormInputBase {
    text?: string
}

export interface FormTextField extends FormInputBase {
    counter?: number
}

export interface FormSelectField extends FormInputBase {
    items?: any[]
    title?: string 
    value?: string 
    returnObject?: boolean
}

export interface FormSwitchField extends FormInputBase {
    hideDetails?: boolean
    inset?: boolean
}

export interface FormButton extends FormInputBase {
    show: boolean
    rounded?: string 
    block?: boolean 
    flat?: boolean
}

export interface Slide {
    image: string, 
    is_active: boolean
    pk: string, 
}

export interface Slider {
    images: Slide[] 
    is_active: boolean,
    name: string,
    pk: string | number,
}

export interface UserGender {
    pk: string | number
    gender: string
    is_active: boolean
}
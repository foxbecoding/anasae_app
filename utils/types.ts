export type ApiMethod = "GET" | "HEAD" | "PATCH" | "POST" | "PUT" | "DELETE"

export interface ApiData {
    data?:object
    isMultiPart?: boolean
    path: string,
    method: ApiMethod
    key?: string
}

export type AuthRouteName = "auth-login" | "auth-sign-up" | "auth-forgot"

export interface FormField {
    id: string|number
    inputType: "TEXTFIELD" | "TEXTFIELD-CHIP" | "TEXTAREA" | "SELECT" | "SWITCH"
    model: any
    name: string
    appendIcon?: string
    appendInnerIcon?: string
    color?: string
    counter?: number
    density?: "default" | "comfortable" | "compact" | undefined
    disabled?: boolean
    errorMessages?: string | string[]
    items?: any[]
    itemTitle?: string
    itemValue?: string
    label?: string
    prependIcon?: string
    prependInnerIcon?: string
    rules?: any[]
    type?: string
    variant?: "outlined" | "plain" | "filled" | "underlined" | "solo" | "solo-inverted" | "solo-filled" | undefined
}

export interface FormFieldButton {
    show: boolean
    label: string
    class?: string 
    color?: string
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

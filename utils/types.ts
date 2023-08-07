
export interface ApiData {
    data?:object
    isMultiPart?: boolean
    method: ApiMethod
    path: string
}

export type ApiMethod = "GET" | "HEAD" | "PATCH" | "POST" | "PUT" | "DELETE"

export interface FormField {
    id: string|number
    model: any
    counter?: number
    rules?: any[]
    label?: string
    type?: string
    items?: any[]
    itemTitle?: string
    itemValue?: string
    density?: "default" | "comfortable" | "compact" | undefined
    inputType: "TEXTFIELD" | "TEXTFIELD-CHIP" | "TEXTAREA" | "SELECT" | "SWITCH"
    variant?: "outlined" | "plain" | "filled" | "underlined" | "solo" | "solo-inverted" | "solo-filled" | undefined
    name: string
    disabled?: boolean
    prependIcon?: string
    prependInnerIcon?: string
    appendIcon?: string
    appendInnerIcon?: string
}

export type RouteName = "auth-login" | "auth-sign-up" | "auth-forgot"

export interface Slide {
    pk: string, 
    image: string, 
    is_active: boolean
}

export interface Slider {
    pk: string | number,
    name: string,
    is_active: boolean,
    images: Slide[] 
}

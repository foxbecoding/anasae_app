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
    appendIcon?: string
    appendInnerIcon?: string
    color?: string
    counter?: number
    density?: "default" | "comfortable" | "compact" | undefined
    disabled?: boolean
    id: string|number
    inputType: "TEXTFIELD" | "TEXTFIELD-CHIP" | "TEXTAREA" | "SELECT" | "SWITCH"
    items?: any[]
    itemTitle?: string
    itemValue?: string
    label?: string
    model: any
    name: string
    prependIcon?: string
    prependInnerIcon?: string
    rules?: any[]
    type?: string
    variant?: "outlined" | "plain" | "filled" | "underlined" | "solo" | "solo-inverted" | "solo-filled" | undefined
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

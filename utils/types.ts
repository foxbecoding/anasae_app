export type ApiMethod = "GET" | "HEAD" | "PATCH" | "POST" | "PUT" | "DELETE"

export interface ApiData {
    data?:object
    isMultiPart?: boolean
    key?: string
    method: ApiMethod
    path: string
}

export type AuthRouteName = "auth-login" | "auth-sign-up" | "auth-forgot-password"

export interface Brand {
    bio: string
    followers: number
    logo: {pk: number | string, image: string}
    name: string
    owners: BrandOwner[]
    pk:string | number
    stripe_account_id: string
    uid: string
}

export interface BrandOwner {
    pk: string|number, 
    brand: string|number, 
    user: string|number
}

export interface Category {
    pk: string|number
    uid:  string
    title: string
    description: string
    subcategories: string[] | number[]
}

export interface FormInputBase {
    appendIcon?: string
    appendInnerIcon?: string
    appendInnerIconColor?: string
    appendInnerIconFunction?: Function
    class?: string
    color?: string
    bgColor?: string
    flat?: boolean
    density?: "default" | "comfortable" | "compact" | undefined
    disabled?: boolean
    errorMessages?: string | string[]
    id: string|number
    inputType: "TEXTFIELD" | "TEXTFIELD-CHIP" | "TEXTAREA" | "SELECT" | "SWITCH" | "FORMTEXT"
    label?: string
    model?: any
    name?: string
    prependIcon?: string
    prependInnerIcon?: string
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
    returnObject?: boolean
    title?: string 
    value?: string 
}

export interface FormSwitchField extends FormInputBase {
    hideDetails?: boolean
    inset?: boolean
}

export interface FormButton extends FormInputBase {
    block?: boolean 
    flat?: boolean
    rounded?: string 
    show: boolean
}

export interface Slide {
    is_active: boolean
    image: string, 
    pk: string, 
}

export interface Slider {
    is_active: boolean,
    images: Slide[] 
    name: string,
    pk: string | number,
}


export interface User {
    addresses?: UserAddress[]
    billing_addresses?: {
        pk: string | number, 
        user: string | number, 
        payment_method: string | number, 
        address: string | number
    }[]
    owned_brands: string[] | number[] 
    display_name?: string
    email?: string
    first_name: string
    followed_users?: number
    followers?: number
    image: {pk: string | number, image: string} 
    last_name: string
    logins?: {pk: string | number, created: string}[]
    payment_methods?: {pk: string | number, stripe_pm_id: string}[]
    pk: string | number
    stripe_customer_id?: string
    uid: string
    username: string
}

export interface UserAddress {
    pk: string | number;
    full_name: string;
    phone_number: string;
    street_address: string;
    street_address_ext: string;
    country: string;
    state: string;
    city: string;
    postal_code: string;
    is_default: boolean;
}

export interface UserGender {
    gender: string
    is_active: boolean
    pk: string | number
}

export interface UserMenuItem {
    id: number
    prependIcon: string
    appendIcon?: string
    title: string
    to?: string
    action?: Function 
    custom?: any
}
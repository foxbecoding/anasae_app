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

export type RouteName = 'auth-login'|'auth-sign-up'|'auth-forgot'
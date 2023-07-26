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
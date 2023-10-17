export const numbersOnly = (e: any) => {
    let char = String.fromCharCode(e.keyCode);
    if(/^[0-9]+$/.test(char)) return true; 
    else e.preventDefault();
}

export const getAspectRatio = (src: string): number =>  {
    let image = new Image()
    image.src = src
    return image.width/image.height
}

export const isAuthRoute = (routeName: string) => ['auth-login','auth-sign-up','auth-forgot-password'].includes(routeName)

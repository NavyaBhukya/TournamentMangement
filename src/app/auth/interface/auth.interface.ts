export interface LoginUserData {
    email:string,
    name:string,
    password?:string,
    role:string,
    mobile:string | number,
    profile:string,
    id?:string
}
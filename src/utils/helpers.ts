export const parsePath = (path:string, dep:number):string=>{
    return path.split('/')[dep]
}
export const parseDate = (d = new Date()):string=>{
    return `${d.getDate()}/${d.getMonth()+1}/${d.getFullYear()}`
}
export const parseName = (text:string):string=>{
    return text.split('?')[0].split('/').slice(-1)[0]
}
import { ToastAndroid } from "react-native";

const basicUrl = 'https://api.vk.com/method/'

export const getResource = async (method:string,params:object|undefined = undefined ) => {
    const queryStr = params ? Object.keys(params).map((key) => key + '=' + params[key]).join('&'): null;
    
        return new Promise((resolve, reject)=>{
            fetch(`${basicUrl}${method}?${queryStr}`).then((res)=>{
                if(res.status === 200){
                    resolve(res.json())
                }
                else{
                    ToastAndroid.show(res.status+' code', ToastAndroid.SHORT)
                    reject(`error with ${res.status} code`)
                }
            }).catch((e)=>{
                ToastAndroid.show('network error', ToastAndroid.SHORT)
                reject(e)

            })
        })
  };
export const sendResource = async (method:string,body:object ) => {
        return new Promise((resolve, reject)=>{
            fetch(`${basicUrl}${method}`,{method:'POST',body:JSON.stringify(body)}).then((res)=>{
                if(res.status === 200){
                    resolve(res.json())
                }
                else{
                    ToastAndroid.show(res.status+' code', ToastAndroid.SHORT)
                    reject(`error with ${res.status} code`)
                }
            }).catch((e)=>{
                ToastAndroid.show('network error', ToastAndroid.SHORT)
                reject(e)

            })
        })
  };
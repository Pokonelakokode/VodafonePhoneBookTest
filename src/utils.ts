import  users from './users.json';
import { User } from './types.js';

export function saveToStorage(data:User[] = []) {
    window.localStorage.setItem("users",JSON.stringify(data));
    return data
}

export function validateEmail(email:string):boolean {
    var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
}

export function loadFromStorage():User[] {
    let data = window.localStorage.getItem("users");
    if(data){
        try {
            return JSON.parse(data);
        }
        catch (e) {
            saveToStorage(users);
            return users
        }
    }
    else {
        saveToStorage(users);
        return users
    }
}

export function getHash() {
    let hash = window.location.hash.substr(1);
    return hash.split('&').reduce((acc:{[key:string]:any},el) => {
        const data = el.split('=');
        if(data.length === 2) acc[data[0]] = data[1];
        return acc
    },{})
}

export function setHash(data: { [key: string]: any } = {},push=true) {
    data = isObject(data) ? data : {};
    const hash = Object.keys(data).reduce((acc:string,el:any) => {
        acc += `${el}=${data[el]}&`;
        return acc;
    },"/#").slice(0,-1);
    push ? history.pushState({user:data.user || null},"",hash) : history.replaceState({user: data.user},"",hash)
}

export function isObject (value:any) {
    return value && typeof value === 'object' && value.constructor === Object;
}

import { BehaviorSubject } from "rxjs";


export const token$ = new BehaviorSubject(window.localStorage.token);

export function updateToken(newToken){
    window.localStorage.setItem("token",newToken);
    token$.next(newToken);
}
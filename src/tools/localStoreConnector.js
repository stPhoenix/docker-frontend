export  class LocalStoreConnector {
    static getItem(key){
        return localStorage.getItem(key)
    }
    static removeItem(key){
        return localStorage.removeItem(key)
    }
    static setItem(key, value){
        return localStorage.setItem(key, value)
    }
    static clear(){
        return localStorage.clear
    }
}
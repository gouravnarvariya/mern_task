export const ValidateLogin = (obj) => {
    console.log(obj)
    let error = {}
    if(!obj.email) {
        error.email = "Plaese enter email"
    }
    if(!obj.password) {
        error.password = "Plaese enter password"
    }
    error.isValid = Object.keys(error).length>0
    return error
}

export const ValidateSignUp = (obj) => {
    console.log(obj)
    let error = {}
    if(!obj.email) {
        error.email = "Plaese enter email"
    }
    if(!obj.name) {
        error.name = "Plaese enter name"
    }
    if(!obj.role) {
        error.role = "Plaese enter role"
    }
    if(!obj.password) {
        error.password = "Plaese enter password"
    }
    error.isValid = Object.keys(error).length>0
    return error
}



export const ValidateProduct = (obj) => {
    // console.log(obj)
    let error = {}
    if(!obj.name) {
        error.name = "Plaese enter name"
    }
    if(!obj.price>0) {
        error.price = "Plaese enter price"
    }
    if(!obj.category) {
        error.category = "Plaese enter category"
    }
    error.isValid = Object.keys(error).length>0
    return error
}

const baseURL = "http://localhost:8080"

export const emptyChecker = (text)=>{
    if (text===null || text.length===0){
        return {error:"Field should not be Empty"}
    }
    return {}
}

const emailChecker = (email)=>{
    return email && email.includes("@") &&  email.includes(".") && 
            email[0]!=="@" && email[email.length-1]!=="@" && email[0]!=='.'
             && email[email.length-1]!=="." ? 
            {} : 
            { error : "Invalid email" }
}

// min length = 8
const passwordChecker = (password)=>{
    return password.length < 8 ? {error:"Password should be more than 8 characters" }:{} 
}

export const getLoginProps = ()=>{
    const fieldsArr = ["email","password"]
    const fieldTypesArr = ["email","password"]
    const condictionChecksArr = [emailChecker,passwordChecker]
    const submitURL = baseURL+"/user/login"

    return{
        fieldsArr,fieldTypesArr,condictionChecksArr,submitURL
    }
}

export const getSignupProps = ()=>{
    const fieldsArr = ["name","email","password"]
    const fieldTypesArr = ["name","email","password"]
    const condictionChecksArr = [emptyChecker,emailChecker,passwordChecker]
    const submitURL = baseURL + "/user/signup"

    return{
        fieldsArr,fieldTypesArr,condictionChecksArr,submitURL
    }
}
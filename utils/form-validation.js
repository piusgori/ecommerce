export const validation = (type, input) => {
    if(type === 'email'){
        if (!input.includes('@')){
            return {validity: false, error: 'Please enter a valid E-Mail address'};
        }
        return { validity: true, error: null}
    } else if(type === 'password'){
        if (input.length < 7 ){
            return {validity: false, error: 'Please enter a strong password of at least 8 characters long'};
        }
        return { validity: true, error: null}
    } else {
        if (input.length < 1 ){
            return {validity: false, error: 'This field should not be left empty'};
        }
        return { validity: true, error: null}
    }
}



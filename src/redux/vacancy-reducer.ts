export interface ICity {
    id: number
    text: string
}

export interface IAddress {
    id: number
    address: string
    city: ICity | null
}

interface ITicketVacancy {
    title: string
    addresses: IAddress[]
    city: ICity
    description: string
    price_from: number | null
    price_to: number | null
    experience: number | null
}

const initialState: ITicketVacancy = {
    title: '',
    addresses: [],
    city: {
        id: 0,
        text: ''
    },
    description: '',
    price_from: null,
    price_to: null,
    experience: null
}

type AllActionsType = ReturnType<typeof addTitleAC>
    | ReturnType<typeof addDescriptionVacancyAC>
    | ReturnType<typeof addCityVacancyAC>
    | ReturnType<typeof changeAddressVacancyAC>
    | ReturnType<typeof removeAddressVacancyAC>
    | ReturnType<typeof addAddressVacancyAC>
    | ReturnType<typeof addPriceFromAC>
    | ReturnType<typeof addPriceToAC>
    | ReturnType<typeof addExperienceAC>

export const vacancyReducer = (state = initialState, action: AllActionsType): ITicketVacancy => {
    switch (action.type) {
        case "ADD_TITLE":
            return {
                ...state,
                title: action.title
            }

        case "ADD_DESCRIPTION_VACANCY":
            return {
                ...state,
                description: action.description
            }
        case "ADD_CITY_VACANCY": {
            const stateCopy = {...state}
            stateCopy.city = action.city
            stateCopy.addresses = state.addresses.map(a => ({...a, city: action.city}))
            return stateCopy
        }


        case "CHANGE_ADDRESS_VACANCY": {
            const stateCopy = {...state}
            stateCopy.addresses = stateCopy.addresses.map(a => a.id === action.id ? {...a, address: action.address} : a)
            return stateCopy
        }

        case "REMOVE_ADDRESS_VACANCY": {
            const stateCopy = {...state}
            stateCopy.addresses = stateCopy.addresses.filter(a => a.id !== action.id);
            return stateCopy
        }

        case "ADD_ADDRESS_VACANCY": {
            const stateCopy = {...state}
            const addressNew = {id : Date.now(), address : '', city : stateCopy.city}
            const addresses = stateCopy.addresses
            stateCopy.addresses = [...addresses, addressNew]
            return stateCopy
        }
        case "ADD_PRICE_FROM": {
            return {
                ...state,
                price_from : action.price_from
            }
        }
        case "ADD_PRICE_TO":
            return {
                ...state,
                price_to : action.price_to
            }

        case "ADD_EXPERIENCE":
            return {
                ...state,
                experience : action.experience
            }
        default :
            return state
    }
}


export const addTitleAC = (title: string) => {
    return {
        type: "ADD_TITLE",
        title
    } as const
}

export const addDescriptionVacancyAC = (description: string) => {
    return {
        type: "ADD_DESCRIPTION_VACANCY",
        description
    } as const
}

export const addCityVacancyAC = (city: ICity) => {
    return {
        type: "ADD_CITY_VACANCY",
        city
    } as const
}

export const changeAddressVacancyAC = (id : number, address : string) => {
    return {
        type: "CHANGE_ADDRESS_VACANCY",
        id,
        address
    } as const
}

export const removeAddressVacancyAC = (id : number) => {
    return {
        type: "REMOVE_ADDRESS_VACANCY",
        id
    } as const
}

export const addAddressVacancyAC = () => {
    return {
        type: "ADD_ADDRESS_VACANCY",
    } as const
}

export const addPriceFromAC = (price_from: number) => {
    return {
        type: "ADD_PRICE_FROM",
        price_from,
    } as const
}

export const addPriceToAC = (price_to: number) => {
    return {
        type: "ADD_PRICE_TO",
        price_to,
    } as const
}

export const addExperienceAC = (experience: number | null) => {
    return {
        type: "ADD_EXPERIENCE",
        experience,
    } as const
}
export interface ICity {
    id: number
    text: string
}

export interface IWorkUnit {
    id: number
    text: string
}

export interface IAddress {
    id: number
    address: string
    city: ICity | null
}

interface ITicket {
    addresses: IAddress[]
    city: ICity
    description: string
    has_photo: boolean
    has_review: boolean
    call: boolean
    price_to: number | null
    verified_only: boolean
    work_unit: IWorkUnit | null
}

const initialState: ITicket = {
    addresses: [],
    city: {
        id: 0,
        text: ''
    },
    description: '',
    has_photo: false,
    has_review: false,
    call: true,
    price_to: null,
    verified_only: false,
    work_unit: null
}

type AllActionsType = ReturnType<typeof addDescriptionAC>
    | ReturnType<typeof addCityAC>
    | ReturnType<typeof isCallAC>
    | ReturnType<typeof addPriceAC>
    | ReturnType<typeof isVerifiedOnlyAC>
    | ReturnType<typeof isHasPhotoAC>
    | ReturnType<typeof isHasReviewAC>
    | ReturnType<typeof addWorkUnitAC>
    | ReturnType<typeof addAddressAC>
    | ReturnType<typeof removeAddressAC>
    | ReturnType<typeof changeAddressAC>




export const ticketReducer = (state = initialState, action: AllActionsType): ITicket => {
    switch (action.type) {
        case "ADD_DESCRIPTION":
            return {
                ...state,
                description: action.description
            }
        case "ADD_CITY":
            // return {
            //     ...state,
            //     city: action.city
            // }
        {
            const stateCopy = {...state}
            stateCopy.city = action.city
            stateCopy.addresses = state.addresses.map(a => ({...a, city : action.city}))
            return stateCopy
        }

        case "IS_CALL":
            return {
                ...state,
                call: action.call
            }
        case "ADD_PRICE":
            return {
                ...state,
                price_to: action.price_to
            }
        case "IS_VERIFIED_ONLY":
            return {
                ...state,
                verified_only : action.verified_only
            }
        case "IS_HAS_PHOTO":
            return {
                ...state,
                has_photo : action.has_photo
            }
        case "IS_HAS_REVIEW":
            return {
                ...state,
                has_review : action.has_review
            }
        case "ADD_WORK_UNIT":
            return {
                ...state,
                work_unit : action.work_unit
            }
        case "ADD_ADDRESS":{

            const stateCopy = {...state}
            const addressNew = {id : Date.now(), address : '', city : stateCopy.city}
            const addresses = stateCopy.addresses
            stateCopy.addresses = [...addresses, addressNew]
            return stateCopy
        }

        case "REMOVE_ADDRESS": {
            const stateCopy = {...state}
            stateCopy.addresses = stateCopy.addresses.filter(a => a.id !== action.id);
            return stateCopy
        }
        case "CHANGE_ADDRESS": {
            const stateCopy = {...state}
            stateCopy.addresses = stateCopy.addresses.map(a => a.id === action.id ? {...a, address: action.address} : a)
            return stateCopy
        }

        default :
            return state
    }
}

export const addDescriptionAC = (description: string) => {
    return {
        type: "ADD_DESCRIPTION",
        description
    } as const
}

// export const addCityAC = (id: number, text: string) => {
//     return {
//         type: "ADD_CITY",
//         id,
//         text
//     } as const
// }

export const addCityAC = (city : ICity) => {
    return {
        type: "ADD_CITY",
        city
    } as const
}

export const isCallAC = (call: boolean) => {
    return {
        type: "IS_CALL",
        call
    } as const
}

export const addPriceAC = (price_to: number) => {
    return {
        type: "ADD_PRICE",
        price_to,
    } as const
}

export const isVerifiedOnlyAC = (verified_only: boolean) => {
    return {
        type: "IS_VERIFIED_ONLY",
        verified_only
    } as const
}

export const isHasPhotoAC = (has_photo: boolean) => {
    return {
        type: "IS_HAS_PHOTO",
        has_photo
    } as const
}

export const isHasReviewAC = (has_review: boolean) => {
    return {
        type: "IS_HAS_REVIEW",
        has_review
    } as const
}

export const addWorkUnitAC = (work_unit: IWorkUnit) => {
    return {
        type: "ADD_WORK_UNIT",
        work_unit,
    } as const
}

export const addAddressAC = () => {
    return {
        type: "ADD_ADDRESS",
    } as const
}

export const removeAddressAC = (id : number) => {
    return {
        type: "REMOVE_ADDRESS",
        id
    } as const
}

export const changeAddressAC = (id : number, address : string) => {
    return {
        type: "CHANGE_ADDRESS",
        id,
        address
    } as const
}


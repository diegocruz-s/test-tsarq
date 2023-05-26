import { 
    BsFillEnvelopeFill, 
    BsFillLockFill, 
    BsFillPersonFill,
    BsEnvelopeFill,
    BsIncognito,
    BsProjectorFill
} from 'react-icons/bs'

export const datasFormLogin = [
    {
        value: 'email',
        icon: BsFillEnvelopeFill
    }, 
    {
        value: 'password',
        icon: BsFillLockFill
    },
]

export const datasFormRegister = [
    {
        value: 'name',
        icon: BsFillPersonFill
    }, 
    {
        value: 'email',
        icon: BsEnvelopeFill
    },
    {
        value: 'username',
        icon: BsIncognito
    },
    {
        value: 'bios',
        icon: BsProjectorFill
    },
    {
        value: 'password',
        icon: BsFillLockFill
    },
]
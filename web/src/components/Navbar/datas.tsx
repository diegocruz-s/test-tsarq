import { BsFillHouseFill, BsFillPersonFill, BsMusicNoteBeamed, BsMusicPlayerFill } from 'react-icons/bs'

export const datasNavbar = [
    {
        name: 'Home',
        icon: BsFillHouseFill,
        redirect: '/',
    },
    {
        name: 'Profile',
        icon: BsFillPersonFill,
        redirect: '/profile',
    },
    {
        name: 'Music+',
        icon: BsMusicNoteBeamed,
        redirect: '/music',
    },
    {
        name: 'Playlists',
        icon: BsMusicPlayerFill,
        redirect: '/playlists',
    },
]
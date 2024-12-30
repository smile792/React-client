import React, { useContext } from 'react'
import { ThemeContext } from '../theme-provider'
import { Button, Navbar, NavbarBrand, NavbarContent, NavbarItem } from '@nextui-org/react'
import { FaRegMoon } from 'react-icons/fa'
import { LuSunMedium } from 'react-icons/lu'
import { useDispatch, useSelector } from 'react-redux'
import { logout, selectIsAuthenticated } from '../../features/user/userSlice'
import { useNavigate } from 'react-router-dom'
import { CiLogout } from 'react-icons/ci'
export const Header = () => {
    const { theme, toggleTheme } = useContext(ThemeContext)
    const isAuthenticated = useSelector(selectIsAuthenticated)
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handlerLogout = () => {
        dispatch(logout())
        localStorage.removeItem('token')
        navigate('/auth')
    }
    const handleClick = () => {
        navigate('/')
    }

    return (
        <Navbar>
            <NavbarBrand onClick={handleClick} >
                <p className="font-bold text-inherit cursor-pointer ">Network Social</p>
            </NavbarBrand>
            <NavbarContent justify='end'>
                <NavbarItem
                    className='lg:flex text-3xl cursor-pointer'
                    onClick={() => toggleTheme()}
                >
                    {theme === 'light' ? <FaRegMoon /> : <LuSunMedium />}
                </NavbarItem>
                <NavbarItem>
                {
                    isAuthenticated && (
                        <Button
                            color='default'
                            variant='flat'
                            className='gap-2'
                            onClick={handlerLogout}
                        >
                            <CiLogout/> <span>Выйти</span>
                        </Button>
                    )
                }
                </NavbarItem>
            </NavbarContent>
        </Navbar>
    )
}

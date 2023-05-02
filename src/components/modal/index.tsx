
import s from './style.module.css';
import { ReactElement, useEffect } from 'react';
import sel from 'classnames';
import { CloseIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import { ModalOverlay } from '../modal-overlay';
import { createPortal } from 'react-dom';


type TModal = {
    title: string;
    onClose: () => void;
    children: ReactElement;
} 

const modalDot = document.querySelector('#modals') as Element | DocumentFragment

export const Modal: React.FC<TModal> = ({title, onClose, children}) => {


    useEffect(() => {
        const closeModalEsc = (e: KeyboardEvent) => {
            if (e.key === 'Escape') {
                onClose()            
            }         
        }
        document.addEventListener('keydown', closeModalEsc)

        return () => document.removeEventListener('keydown', closeModalEsc)
    }, [])

    return (
        createPortal(
            <>
                <div className={sel(s.modal, 'pt-10', 'pl-10', 'pr-10', 'pb-15')}>
                    <div className={s.title__box}>
                        <h2 className={sel(s.title, 'text text_type_main-large')}>{title}</h2>
                        <button className={s.close} type='button' ><CloseIcon onClick={onClose} type='primary' /></button>
                    </div>                   
                    {children}
                </div>
                <ModalOverlay onClick={onClose} />
            </>, 
            modalDot)
    )
}

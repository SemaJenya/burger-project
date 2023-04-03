import PropTypes from 'prop-types';
import s from './style.module.css';
import { useEffect } from 'react';
import sel from 'classnames';
import { CloseIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import { ModalOverlay } from '../modal-overlay';
import { createPortal } from 'react-dom';


const modalDot = document.querySelector('#modals')

export const Modal = ({title, onClose, children}) => {


    return (
        createPortal(
            <>
                <div className={sel(s.modal, 'pt-10', 'pl-10', 'pr-10', 'pb-15')}>
                    <div className={s.title__box}>
                        <h2 className={sel(s.title, 'text text_type_main-large')}>{title}</h2>
                        <button className={s.close} type='button' onClick={onClose}><CloseIcon onClick={onClose} /></button>
                    </div>                   
                    {children}
                </div>
                <ModalOverlay onClick={onClose} />
            </>, 
            modalDot)
    )
}


Modal.propTypes = {
    onClose: PropTypes.func.isRequired,
    title: PropTypes.string.isRequired,
    children: PropTypes.node.isRequired,
}
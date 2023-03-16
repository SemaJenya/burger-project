import s from './style.module.css';
import sel from 'classnames';
import { CloseIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import { ModalOverlay } from '../modal-overlay';
import { createPortal } from 'react-dom';

const modalDot = document.querySelector('#modals')

export const Modal = ({title, onClose}) => {
    return (
        createPortal(
            <>
                <div className={s.modal}>
                    <h2 className={s.title}>{title}</h2>
                    <CloseIcon onClick={onClose} />
                </div>
                <ModalOverlay onClick={onClose} />
            </>, 
            modalDot)
    )
}


import s from './style.module.css';
import sel from 'classnames';
import { ModalOverlay } from '../modal-overlay';
import { createPortal } from 'react-dom';
import preloader from '../../images/preloader.gif';



type TModal = {
    onClose: () => void;
} 

const modalDot = document.querySelector('#modals') as Element | DocumentFragment

export const Loader: React.FC<TModal> = ({onClose}) => {

    return (
        createPortal(
            <>
                <div className={sel(s.modal, 'pt-10', 'pl-10', 'pr-10', 'pb-15')}>
                    <div className={s.title__box}>
                        <h2 className={sel(s.title, 'text text_type_main-large')}>Отправляем заказ...</h2>
                        <img className={s.preloader} src={preloader} alt='preloader'/>
                    </div>                   
                </div>
                <ModalOverlay onClick={onClose} />
            </>, 
            modalDot)
    )
}

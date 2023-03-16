import s from './style.module.css';
import sel from 'classnames';


export const ModalOverlay = ({onClick}) => {
    return (
        <div className={s.overlay} onClick={onClick}>

        </div>
    )
}
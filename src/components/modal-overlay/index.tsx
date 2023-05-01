import PropTypes from 'prop-types';
import s from './style.module.css';

type TModalOverlay = {
    onClick: () => void;
} 

export const ModalOverlay: React.FC<TModalOverlay> = ({onClick}) => {
    return (
        <div className={s.overlay} onClick={onClick}>

        </div>
    )
}

ModalOverlay.propTypes = {
    onClick: PropTypes.func.isRequired
}
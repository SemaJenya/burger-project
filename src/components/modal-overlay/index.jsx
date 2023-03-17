import PropTypes from 'prop-types';
import s from './style.module.css';



export const ModalOverlay = ({onClick}) => {
    return (
        <div className={s.overlay} onClick={onClick}>

        </div>
    )
}

ModalOverlay.propTypes = {
    onClick: PropTypes.func.isRequired
}
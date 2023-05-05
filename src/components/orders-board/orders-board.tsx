
import sel from 'classnames';
import s from './style.module.css';



export const OrdersBoard = () => {


    return (
       <div className={s.board__conteiner}>
            <div className={sel(s.order__status)}>
                <div className={s.ready__orders}>
                    <p className={sel(s.ready__text, 'text text_type_main-medium', 'mb-6')}>Готовы:</p>
                    <div className={sel(s.number__box)}>
                        <p className={sel(s.order__number, s.redy__number, 'text text_type_digits-default')}>3939393993</p>
                        <p className={sel(s.order__number, s.redy__number,'text text_type_digits-default')}>3939393993</p>
                        <p className={sel(s.order__number, s.redy__number,'text text_type_digits-default')}>3939393993</p>
                        <p className={sel(s.order__number, s.redy__number,'text text_type_digits-default')}>3939393993</p>
                    </div>
                </div>
                <div className={sel(s.in__work)}>
                    <p className={sel(s.work__text, 'text text_type_main-medium', 'mb-6')}>В работе:</p>
                    <div className={sel(s.number__box)}>
                            <p className={sel(s.order__number, 'text text_type_digits-default')}>39393</p>
                            <p className={sel(s.order__number, 'text text_type_digits-default')}>39393</p>
                    </div>
                </div>
            </div>
            <div className={s.done__all}>
                <p className={sel(s.done__title, 'text text_type_main-medium')}>Выполнено за все время:</p>
                <p className={sel(s.done__number, 'text text_type_digits-large')}>28765</p>
            </div> 
            <div className={s.done__today}>
                <p className={sel(s.done__title, 'text text_type_main-medium')}>Выполнено за сегодня:</p>
                <p className={sel(s.done__number, 'text text_type_digits-large')}>138</p>
            </div>         
       </div>
    )
}
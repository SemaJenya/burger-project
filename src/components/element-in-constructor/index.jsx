import s from './style.module.css';
import PropTypes from 'prop-types';
import { ConstructorElement, DragIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import { useDrag, useDrop } from 'react-dnd';
import { removeConstructor, reorder } from '../../services/reducers/constructor';
import { useDispatch } from 'react-redux';
import { useRef } from 'react';
import { reduceCounter } from '../../services/reducers/counter';


export const ElementInConctructor = ({data, index}) => {
    const itemID = data._id;
    const dispatch = useDispatch();

    const ref = useRef(null);
    const [{handlerId}, drop] = useDrop({
        accept: 'listReorder',
        collect(monitor) {
            return {
              handlerId: monitor.getHandlerId(),
            }
        },
        hover(item, monitor){
            if (!ref.current) {
                return
            }
            const dragIndex = item.index;
            const hoverIndex = index;

            if (dragIndex === hoverIndex) {
                return
            };
            const hoverBoundingRect = ref.current?.getBoundingClientRect()

            const hoverMiddleY =
                (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2
            // позиция мыши 
            const clientOffset = monitor.getClientOffset()
            const hoverClientY = clientOffset.y - hoverBoundingRect.top

            if (dragIndex < hoverIndex && hoverClientY < hoverMiddleY) {
                return
            }
            // Dragging upwards
            if (dragIndex > hoverIndex && hoverClientY > hoverMiddleY) {
                return
            }
            dispatch(reorder({from: dragIndex, to: hoverIndex}))
            item.index = hoverIndex;
        }
    });

    const [{ isDragging }, drag] = useDrag({
        type: 'listReorder',
        item: () => {
            return {index, itemID}
        },
        collect: (monitor) => ({
            isDragging: monitor.isDragging(),
          }),       
    })

    const handleRemoveIngredient = (e) => {
        dispatch(removeConstructor(data.randomId));
        dispatch(reduceCounter(data));

    }

    const opacity = isDragging ? 0 : 1;
    drag(drop(ref))
    return (
        <div className={s.inside__item} key={data.randomId} ref={ref} style={{opacity}}>
        <DragIcon type="primary" key={`${data.randomId} icon`} />                       
        <ConstructorElement
          text={data.name}
          price={data.price}
          thumbnail={data.image}
          key={data.randomId}
          handleClose={handleRemoveIngredient}/> 
    </div>
    )
}

ElementInConctructor.propTypes = {
    data: PropTypes.object.isRequired,
    index: PropTypes.string.isRequired,
}
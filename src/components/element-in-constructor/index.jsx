import s from './style.module.css';
import { ConstructorElement, DragIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import { useDrag, useDrop } from 'react-dnd';
import { reorder } from '../../services/reducers/constructor';
import { useDispatch } from 'react-redux';
import { useRef } from 'react';


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
            // Get vertical middle
            const hoverMiddleY =
                (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2
            // Determine mouse position
            const clientOffset = monitor.getClientOffset()
            // Get pixels to the top
            const hoverClientY = clientOffset.y - hoverBoundingRect.top
            // Only perform the move when the mouse has crossed half of the items height
            // When dragging downwards, only move when the cursor is below 50%
            // When dragging upwards, only move when the cursor is above 50%
            // Dragging downwards
            if (dragIndex < hoverIndex && hoverClientY < hoverMiddleY) {
                return
            }
            // Dragging upwards
            if (dragIndex > hoverIndex && hoverClientY > hoverMiddleY) {
                return
            }
            dispatch(reorder({from: dragIndex, to: hoverIndex}))
            item.index = hoverIndex;
            console.log('dhhdhdh');

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

    const opacity = isDragging ? 0.5 : 1;
    drag(drop(ref))
    return (
        <div className={s.inside__item} key={data.randomId} ref={ref} >
        <DragIcon type="primary" key={`${data.randomId} icon`} />                       
        <ConstructorElement
          text={data.name}
          price={data.price}
          thumbnail={data.image}
          key={data.randomId}/> 
    </div>
    )
}
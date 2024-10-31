import { useDispatch } from "react-redux"
import Button from "../../ui/Button"
import { deleteItem } from "./cartSlice"

function DeleteItem({children, pizzaId}) {
    const dispatch = useDispatch()

    return (
        <Button type="warning" onClick={() => dispatch(deleteItem(pizzaId))}>
            {children}
        </Button>
    )
}

export default DeleteItem

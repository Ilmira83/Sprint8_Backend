import { Router } from "express"
import { deleteBooking, getBooking, getBookings, postBooking, updateBooking } from "../controllers/booking";

const router = Router();

router.get('/', getBookings);
router.get('/:id', getBooking);
router.delete('/:id', deleteBooking);
router.post('/', postBooking);
router.put('/:id', updateBooking);



export default router;
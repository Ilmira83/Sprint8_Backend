import { Request, Response } from "express"
import Booking from "../models/booking"

export const getBookings = async (req:Request, res:Response) => {
  const listBookings = await Booking.findAll();
  res.json(listBookings)
}

export const getBooking = async (req:Request, res:Response) => {
  const {id} = req.params;
  const booking = await Booking.findByPk(id);

  if(booking){
    res.json(booking)
  } else {
    res.status(404).json({
    msg: `Booking with id ${id} doesn't exist`    
  })
  }
}

export const deleteBooking = async (req:Request, res:Response) => {
  const {id} = req.params;
  const booking = await Booking.findByPk(id);

  if(booking){
    await booking.destroy();
    res.json({
      msg: `Booking with id ${id} deleted`
    })
  } else {
    res.status(404).json({
    msg: `Booking with id ${id} doesn't exist`    
  })
  }
}
export const postBooking = async (req:Request, res:Response) => {
  const {body} = req;

  try {
    await Booking.create(body);
    res.json({
      msg: 'Booking was created',
      body
    })
  } catch (error) {
    console.log(error)
    res.json({
      msg: 'Mistake occured, communicate with support team.',
    })
  }
  
}

export const updateBooking = async (req:Request, res:Response) => {
  const {body} = req;
  const {id} = req.params;

  const booking = await Booking.findByPk(id);

  try {
    if(booking) {
      await booking.update(body);
      res.json({
        msg: `Booking with id ${id} was updated`,
      });
    } else {
      res.status(404).json({
        msg: `Booking with id ${id} doesn't exist`
      })
    }
  } catch (error) {
    console.log(error)
    res.json({
      msg: 'Mistake occured, communicate with support team.',
    })
  }


}
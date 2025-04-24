import { DataTypes } from 'sequelize';
import db from '../db/connection';

const Booking = db.define('Booking', {
  name:{
    type: DataTypes.STRING
  },
  type:{
    type: DataTypes.STRING
  },
  days:{
    type: DataTypes.NUMBER
  },
  price:{
    type: DataTypes.DOUBLE
  }
}, {
  createdAt: false,
  updatedAt: false
})

export default Booking;

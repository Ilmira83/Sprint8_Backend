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
    type: DataTypes.INTEGER
  },
  price:{
    type: DataTypes.DOUBLE
  },
  startDate:{
    type: DataTypes.DATEONLY
  },
})

export default Booking;

import express, {Request, Response} from 'express';
import cors from 'cors';
import routesBooking from '../routes/booking_routes';
import db from '../db/connection';

class Server {
  private app: express.Application;
  private port: string;

  constructor(){
    this.app = express();
    this.port = process.env.PORT || '3001';
    this.listen();
    this.midlewares();
    this.routes();
    this.dbConnect();
  }

  listen(){
    this.app.listen(this.port, ()=>{
      console.log(`App is running at port ${this.port}`)
    })
  }

  routes(){
    this.app.get('/', (req:Request, res:Response)=> {
      res.json({
        msg:'API working'
      })
    })
    this.app.use('/api/bookings', routesBooking)
  }

  midlewares() {
    this.app.use(cors({
      origin: ['http://localhost:4200'],
      }));
    //parse the body
    this.app.use(express.json());
  }

  async dbConnect() {
    try {
      await db.authenticate();
      console.log('DB connected')
    } catch (error) {
      console.log('DB connection error')
    }

  }

}

export default Server;
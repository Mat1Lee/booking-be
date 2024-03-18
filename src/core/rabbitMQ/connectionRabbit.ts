// import amqb from 'amqplib'
// import { RABBITMQ_URL } from '../config'
// import loggerHelper from '@utils/logger.util';
// const logger = loggerHelper.getLogger('rabbit-connection');

// class RabbitMQConnection {
//   connection: amqb.Connection;
//   #channel: {[key:string]: amqb.Channel };
//   constructor (){
//     this.connection = null;
//     this.#channel={};
//   }
//   async connect() {
//     try {
//       if (!this.connection) {
//       this.connection = await amqb.connect(RABBITMQ_URL)
//         .then((res)=>{
//           logger.info('--Connected to Rabbit--')
//           return res
//         })
//         }
//         // this.channel = await this.connection.createChannel();
//     } catch (error) {
//       logger.error('Error connecting to Rabbit: ',error)
//       throw new Error(error)
//     }
//   }
//   async createChannel (key:string): Promise<amqb.Channel> {
//     if(!this.#channel[key]){
//       this.#channel[key] = await this.connection.createChannel() ;
//     }
//     this.#channel[key].assertQueue(key,{durable:true})
//     return this.#channel[key]
//   }
//   async createExchangeChannel (key:string) {
//     if(!this.#channel[key]){
//       this.#channel[key] = await this.connection.createChannel() ;
//     }
//     this.#channel[key].assertExchange(key,'topic',{durable:false,})
//     return this.#channel[key]
//   }

//   getConnection() {
//     if (!this.connection) {
//       throw new Error('No connection established.');
//     }
//     return this.connection;
//   }
// }
 
// export default new RabbitMQConnection();

import express from 'express'
import { AppDataSource } from './src/data-source'
import userRouter from './src/Routers/userRouter'; 
AppDataSource.initialize().then(()=>{
    const app = express()
    app.use(express.json())
    app.use("/teste", userRouter);
    
    app.listen(3000, () => {
        return console.log('o servidor está rodando na porta 3000');
    })
})


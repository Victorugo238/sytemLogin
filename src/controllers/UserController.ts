import { Request, Response} from "express";
import { userRepository } from "../repository/userRepository";
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'

type JwtPayload = {
    id: number
}
class userController {
     async index (req: Request, res:Response){
        return res.json({message: "Funcionou perfeitamente"})
    }
    async create (req: Request, res: Response){
        const {name, email, password} = req.body
        const userExists = await userRepository.findOneBy({email})
        if(userExists){
            return res.status(400).json({message:"Email já cadastrado"})
        }
        const hashPassword = await bcrypt.hash(password,10)
        console.log(name,email,password)
        const newUser = userRepository.create({name,email,password: hashPassword})

        await userRepository.save(newUser)

        const { password:_, ...user } = newUser

        return res.status(201).json(user)
    }

    async login (req: Request, res: Response){
        const { email, password } = req.body
        const user = await userRepository.findOneBy({email})
        if(!user){
            return res.status(400).json({message:"Email ou senha invalidaos!!!"})
        }

        const verifyPass = await bcrypt.compare(password,user.password)
        if(!verifyPass){
            return res.json({message: "Email ou senha invalidos"})
        }
        const token = jwt.sign({id: user.id}, process.env.JWT_PASS ?? '', {expiresIn: '2h'})
       

        const {password:_, ...userLogin} = user
        return res.json({
            user: userLogin,
            token: token
        })
    }

    async getProfile(req: Request, res: Response){
        const {authorization} = req.headers
        if(!authorization){
            return res.status(401).json({message:"Não Autorizado"})
        }
        const token = authorization.split(' ')[1]
        const { id } = jwt.verify(token, process.env.JWT_PASS ?? '') as JwtPayload
        const user = await userRepository.findOneBy({id})
        if(!user){
            return res.status(400).json({message:"Não Permitido"})
        }   

        const {password: _, ...loginUser} = user

        return res.json(loginUser)


    }   

}

export default new userController();
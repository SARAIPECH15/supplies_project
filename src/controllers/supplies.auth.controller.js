import { tan } from "color-name";
import { getConnection } from "../database/database.js";
const LogIn = async (req, res) => {
    try {
        const {email, password} = req.body;
        const connection = await getConnection();
        const result = await connection.query(`SELECT p.id, u.email, p.name  FROM person as p inner join users as u  on p.user_id=u.id WHERE u.email="${email}" AND u.password="${password}";`);
        if(result==""){
            res.status(500);
            res.json({ message: "Usuario inválido" });
        
        }
        res.json(result);
    } catch (error) {
        res.status(500);
        res.send(error.message);
    }
};
export const methods = {
    LogIn
};

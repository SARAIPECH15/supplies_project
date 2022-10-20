import { tan } from "color-name";
import { getConnection } from "./../database/database.js";

const getAll = async (req, res) => {
    try {
        const { table} = req.params;
        const connection = await getConnection();
        const result = await connection.query("SELECT *FROM "+table);
        res.json(result);
        console.log(id);
    } catch (error) {
        res.status(500);
        res.send(error.message);
    }
};

const getAny = async (req, res) => {
    try {
        const { id } = req.params;
        const {table } = req.body;
        const connection = await getConnection();
        const result = await connection.query("SELECT  *FROM  "+table+" WHERE id="+id);
        res.json(result);
    } catch (error) {
        res.status(500);
        res.send(error.message);
    }
};

const addAny = async (req, res) => {
    try {
        const { table, values} = req.body;
        
        if (table === undefined || values === undefined) {
            res.status(400).json({ message: "Bad Request. Please fill all field." });
        }
        let sentencia= "";

        //console.log(values);
        let keys;
         for (keys of values){
            let params;
            let subvalues="";
            for (params of Object.keys(keys)){
               subvalues +=`"${keys[params]}",`;

            }
          sentencia += ` INSERT INTO ${table} (${Object.keys(keys).join(",")}) VALUES (${subvalues.slice(0, -1)}); `; 
        
        }
    
        console.log(sentencia);
        const connection = await getConnection();
        await connection.query(sentencia);
       res.json({ message: "Success Added" });
       //res.json({message: "success"});
     
    } catch (error) {
        res.status(500);
        res.send(error.message);
    }
};

const updateAny = async (req, res) => {
    try {
        const { id } = req.params;
        const { name, programmers } = req.body;

        if (id === undefined || name === undefined || programmers === undefined) {
            res.status(400).json({ message: "Bad Request. Please fill all field." });
        }

        const language = { name, programmers };
        const connection = await getConnection();
        const result = await connection.query("UPDATE language SET ? WHERE id = ?", [language, id]);
        res.json(result);
    } catch (error) {
        res.status(500);
        res.send(error.message);
    }
};

const deleteAny = async (req, res) => {
    try {
        const { id } = req.params;
        const { table } = req.body;
        const connection = await getConnection();
        const result = await connection.query("DELETE FROM "+table+" WHERE id="+id);
        res.json(result);
    } catch (error) {
        res.status(500);
        res.send(error.message);
    }
};

export const methods = {
    getAll,
    getAny,
    addAny,
    updateAny,
    deleteAny
};
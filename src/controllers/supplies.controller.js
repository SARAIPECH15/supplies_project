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
        //const params={};
        //for(let i=0; i<values.length; i++) {
         //   console.log(`Element at index ${i} is ${values[i]}`);  
          //  Array.push(params,values[i]);
        //}
        
       // const connection = await getConnection();
       // await connection.query("INSERT INTO "+table+" SET ?", params);
       // res.json({ message: "Success Added" });
       res.json({message: "success"});
       console.log(values);
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
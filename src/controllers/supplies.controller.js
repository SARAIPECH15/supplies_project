import { tan } from "color-name";
import objectKeys from "object-keys";
import { getConnection } from "./../database/database.js";
const getAll = async (req, res) => {
    try {
        const { table} = req.params;
        const connection = await getConnection();
        const result = await connection.query("SELECT *FROM "+table);
        res.json(result);
        //console.log(id);
    } catch (error) {
        res.status(500);
        res.send(error.message);
    }
};

const getAny = async (req, res) => {
    try {
        //const { id } = req.params;
        const {table,id } = req.body;
        const connection = await getConnection();
        const result = await connection.query("SELECT  *FROM  "+table+" WHERE id="+id);
        res.json(result);
    } catch (error) {
        res.status(500);
        res.send(error.message);
    }
};
const addAnyBulk = async (req, res) => {
    try {
        const {data} = req.body;
        let ress2;
        if (data=== undefined) {
            res.status(400).json({ message: "Bad Request. Please fill all field." });
        }
        let sentencia= "";
        //console.log(values);
        let keys;
       let Fk=0;
        for (keys of data){
            let params;
            let subvalues="";
            let table ="";
            let atFk="";
            for (params of Object.keys(keys)){
                if(params=="table"){
                    console.log(keys);
                   table=keys[params];
                   delete keys['table'];

                }else{
               
                    if(params=="FK"){
                        atFk=keys[params];
                        delete keys['FK'];
                        keys[atFk]=Fk;
                        subvalues +=`"${keys[atFk]}",`;
                        
                    }else{
                        subvalues +=`"${keys[params]}",`;
                    }
                }
            }
            if(Fk==0){
                sentencia = `INSERT INTO ${table} (${Object.keys(keys).join(",")}) VALUES (${subvalues.slice(0, -1)}); `; 
                console.log(sentencia);
                const connection = await getConnection();
                const result=await connection.query(sentencia);
                ress2=result;
                 Fk = result["insertId"];
            }else{
                sentencia = ` INSERT INTO ${table} (${Object.keys(keys).join(",")}) VALUES (${subvalues.slice(0, -1)}); `; 
                const connection = await getConnection();
                const result=await connection.query(sentencia);
                ress2=result;
                 Fk = result["insertId"];
            }
          
        }

      
       
      // res.json({ message: "Success Added" });
       res.json(ress2);
     
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
            console.log(params);
          sentencia += ` INSERT INTO ${table} (${Object.keys(keys).join(",")}) VALUES (${subvalues.slice(0, -1)}); `; 
        }
        console.log(sentencia);
        const connection = await getConnection();
        const result=await connection.query(sentencia);
      // res.json({ message: "Success Added" });
       res.json(result["insertId"]);
     
    } catch (error) {
        res.status(500);
        res.send(error.message);
    }
};

const updateAny = async (req, res) => {
    try {
        //const { id } = req.params;
        const { table , values } = req.body;

        if ( table === undefined || values === undefined) {
            res.status(400).json({ message: "Bad Request. Please fill all field." });
        }
        let sentencia="";
        //console.log(values);
        let keys;
        for (keys of values){
           let params;
           let subvalues="";
           let id=0;
           for (params of Object.keys(keys)){
            if (params=='id'){
                id= keys[params];
            }else{

                subvalues +=`${params}="${keys[params]}",`;
            }
           }
         sentencia += ` UPDATE ${table} SET ${subvalues.slice(0, -1)}  WHERE id=${id}; `; 
       }
           console.log(sentencia);
        const connection = await getConnection();
        const result = await connection.query(sentencia);
        res.json(result);
    } catch (error) {
        res.status(500);
        res.send(error.message);
    }
};

const deleteAny = async (req, res) => {
    try {
       // const { id } = req.params;
        const { table,id} = req.body;
        const connection = await getConnection();
        const result = await connection.query("DELETE FROM "+table+" WHERE id="+id);
       // res.json(result);
       res.json({ message: "Success Deleted" });
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
    deleteAny,
    addAnyBulk
};
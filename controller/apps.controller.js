const pool = require("../database/index")
const appsController = {
  getAll : async (req,res) => {
    try {
      const [rows, feild] = await pool.query("SELECT * FROM apps")
      res.status(200).json({msg: rows.length == 0 ? "No Data To Get" : "Get All Data Succsessfuly",data:rows.length == 0 ? null : rows})
    } catch (error) {
      console.log(error)
      res.status(400).json({state: "error"})
    }
  },
  getById : async (req,res) => {
    const { id } = req.params
    try {
      const [rows, feild] = await pool.query("SELECT * FROM apps WHERE id=?", [id])
      if (rows != ""){
        res.status(200).json({msg: `Get App By ID ${id} Succsessfuly`,data:rows})
      }
      else{
        res.status(404).json({msg: `No data found for ID ${id}`})
      }
    } catch (error) {
      console.log(error)
      res.status(400).json({state: "error"})
    }
  },
  create : async (req,res) => {
    const { title, href, logo } = req.body
    if (title == undefined || href == undefined || logo == undefined) {
      let missingParams = [];
      if (title == undefined) missingParams.push('title');
      if (href == undefined) missingParams.push('href');
      if (logo == undefined) missingParams.push('logo');
      res.status(404).json({msg: `Error With Params`, missingParams: missingParams})
    }else{
      try {
        const [rows, feild] = await pool.query("INSERT INTO `apps` (`title`, `href`, `logo`) VALUES (?, ?, ?);", [title, href, logo])
        if (rows != ""){
          res.status(201).json({msg: `Add App Is Succsessfuly`})
        }
        else{
          res.status(404).json({msg: `No data To Added`})
        }
      } catch (error) {
        console.log(error)
        res.status(400).json({state: "error"})
      }
    }
    
  },
  edit : async (req,res) => {
    const { id } = req.params
    const { title, href, logo } = req.body
    if (+id >= 0 && +id != null ) {
        if (title == undefined || href == undefined || logo == undefined) {
            let missingParams = [];
            if (title == undefined) missingParams.push('title');
            if (href == undefined) missingParams.push('href');
            if (logo == undefined) missingParams.push('logo');
            res.status(403).json({msg: `No data To Edit`, requiredInBody: missingParams})
        }else{
            try {
                const [rows, feild] = await pool.query("UPDATE `apps` SET `title` = ?, `href` = ?, `logo` = ? WHERE `apps`.`id` = ?", [title, href, logo, id])
                if (rows.affectedRows != 0){
                  res.status(200).json({msg: `Edit App Is Succsessfuly`})
                }
                else{
                  res.status(400).json({msg: `No data With ID ${id} To Edit`})
                }
            } catch (error) {
                console.log(error)
                res.status(400).json({state: "error"})
            }
        }
    }else{
      res.status(404).json({msg: `No ID App To Edit`})
    }
    
  },
  delete : async (req,res) => {
    const { id } = req.params
    if (id >= 0) {
      try {
        const [rows, feild] = await pool.query("DELETE FROM apps WHERE `apps`.`id` = ?", [id])
        if (rows.affectedRows != 0){
          res.status(200).json({msg: `Delete App Via ID ${id} Is Succsessfuly`})
        }
        else{
          res.status(404).json({msg: `No data To Delete App Via ID ${id}`})
        }
      } catch (error) {
        console.log(error)
        res.status(400).json({state: "error"})
      }
    }else{
      res.status(404).json({msg: `No ID App To Delete`})
    }
    
  },
  deleteAll : async (req,res) => {
    try {
      const [rows, feild] = await pool.query("DELETE FROM apps")
      if (rows.affectedRows != 0){
        res.status(200).json({msg: `Delete All App Is Succsessfuly`})
      }
      else{
        res.status(404).json({msg: `No data To Delete`})
      }
    } catch (error) {
      console.log(error)
      res.status(400).json({state: "error"})
    }
    
  },
}
module.exports = appsController
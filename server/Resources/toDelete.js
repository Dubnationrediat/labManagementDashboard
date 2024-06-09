import fs from 'fs';
import { fileURLToPath } from 'url';
import path, { dirname,relative } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
let parsedDir = path.parse(__dirname).base

import connectionInfo from '../schema/database.config.js'

let deleteImage =(req,res)=>{
    let book_id = req.params.book_id

    let deleteImage = `DELETE FROM booktable WHERE book_id=${book_id}`;
    let getBookName = `SELECT book_title FROM booktable WHERE book_id=${book_id}`
    connectionInfo.query(getBookName,(err,data,field)=>{
         if(err){
            console.log(err.message)
         }else{
           let imageName =  data[0]?.book_title
           if(data[0]){
           
             fs.unlink(`${parsedDir}/${imageName}`,(err)=>{
                 if(err){
                     console.log(err)
                 }else{      
               connectionInfo.query(deleteImage,(err,data,field)=>{
                if(err){
                    console.log(err.message)
                }else{
                   
                }
               })
                 }
                })
            }
           return res.send({
                message : 'book Deleted successfully',
                redirect :'/home',
                redirectMessage:'Click here to go to home page'
            })


           }
        
         }
    )
}

export default deleteImage
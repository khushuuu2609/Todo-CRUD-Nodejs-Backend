import { HttpError } from "../../class/httpError.js";
import Todo from "../models/todos.model.js"
import mongoose from "mongoose";

const addTodo=async(req,res,next) => {
    try {
        const {title,description,status}  = req.body;
        if(!title){
            throw new HttpError("Title is required",400)
        }
        const newTodo = await Todo.create({title,description,status})
        return res.status(201).send({message:"Todo added sucessfully",data:newTodo}) 

    } catch (error) {
        next(error)
    }
}

const getAllTodos = async(req,res,next) => {
    try {
        let {page=1,limit=3} = req.query
        const totalTodos = await Todo.countDocuments()
        if(page < 1) page=1;
        if(limit < 3) limit=3
        const todos = await Todo.find().limit(limit).skip((page-1)*limit)
        const metadata = {page,limit,totalPages:Math.ceil(totalTodos/limit),totalTodos}
        return res.status(200).send({message:"Todos sent sucessfully",data:todos,metadata})
    } catch (error) {
        next(error)
    }
}

const getTodoById = async(req,res,next) => {
    try {
        const {id} = req.params
        if(!mongoose.Types.ObjectId.isValid(id)){
            throw new HttpError("Invalid todo id",400)
        }
        const todo = await Todo.findById(id)

        if(!todo){
            throw new HttpError("Todo not found",404)
        }

        return res.status(200).json({data:todo})
        
    } catch (error) {
        next(error)
    }
}

const deleteTodo = async(req,res,next)=>{
    try {
        const {id} = req.params;
        if(!mongoose.Types.ObjectId.isValid(id)){
            throw new HttpError("Invalid todo id",400)
        }
        const todo = await Todo.findByIdAndDelete(id);
        if(!todo){
            throw new HttpError("Todo not found",404)
        }
        return res.status(200).json({message:"Todo deleted sucessfully"})
    } catch (error) {
        next(error)
    }
}

const updateTodo = async(req,res,next)=>{
    try {
        const {id} = req.params
        const {title,description,status} = req.body 
        if(!mongoose.Types.ObjectId.isValid(id)){
            throw new HttpError("Invalid todo Id",400)
        }
        const todo = await Todo.findByIdAndUpdate(id,{title,description,status})
        if(!todo){
            throw new HttpError("Todo not found",404)
        }
        return res.status(200).send({message:"Todo updated",data:todo})

    } catch (error) {
        
    }
}
export default {addTodo,getAllTodos,getTodoById,deleteTodo,updateTodo}


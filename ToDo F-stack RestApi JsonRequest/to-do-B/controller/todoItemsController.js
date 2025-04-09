const ToDo = require('../models/todoItems')

exports.getTodoItems=async (req,res,next)=>{
    const todoItems = await ToDo.find();
    res.json(todoItems);
}   

exports.createTodoItem= async (req,res,next)=>{

    const todoItem = new ToDo({task:req.body.task,date:req.body.date});

    await todoItem.save();

    res.status(201).json(todoItem);
}

exports.deleteTodoItems = async (req,res,next)=>{

    const itemToDelete = req.params.id;

    await ToDo.findByIdAndDelete(itemToDelete);

    res.status(204).json({_id:itemToDelete});
}

exports.markCompleted=async (req,res,next)=>{

    const itemId = req.params.id;

    const itemToMark = await ToDo.findById(itemId);

    itemToMark.completed=true; 

    await itemToMark.save();

    res.json(itemToMark);
}

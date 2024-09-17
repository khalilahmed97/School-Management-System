const Course = require("../models/Course.js")
const User = require("../models/User.js")
const cloudinary = require("cloudinary").v2

const getAllCourses = async (req, res) => {
    
    try{

        const courses = await Course.find()
        if(courses){
            res.status(200).json({message: "Courses Data Fetch Successfully", data:courses})
        }
        else{
            res.status(400).json({message: "No Courses Found", data: []})
        }
    }

    catch(error){
        res.status(500).json({message: "Error Occured", data: error})
    }
   

}

const deleteCourse = async (req, res) => {
    const id = req.params.id

    try{
        const course = await Course.deleteOne({id:id})
        if(course.deletedCount===1){
            res.status(200).json({message: "Course Delete Successfully", data:course})
        }
        else{
            res.status(200).json({message: "No Courses Found", data: []})
        }
    }

    catch(error){
        res.status(500).json({message: "Error Occured", data: error})
    }
   

}
function generateID() {
    var length = 3
    charset=[1,2,3,4,5, 6,7, 8, 9, 0]
    var retVal =""
    for (var i = 0; i < length; i++) {
        retVal += charset[(Math.floor(Math.random() * 10))];
    }
    return retVal;
}
const addCourse = async (req, res) => {
    const { name,abbreviation, teacher, picture } = req.body
    const teacherID=teacher  
    try {
        let courseID ="SWE-"+generateID()
        const searchCourse = await Course.findOne({name: name, abbreviation: abbreviation})
        
        if (searchCourse) {
            res.status(200).json({ message: 'Course with given name already exists' });
        }
        else {
            const searchTeacher = await User.findOne({id:teacherID})
            // Upload an image

            await cloudinary.uploader
                .upload(
                    picture
                )
                .then(async (result) => {
                    const image = result.url
                    const newCourse = {
                       id:courseID, name:name, abbreviation:abbreviation, picture: image,
                    }
                    const course = await Course(newCourse).populate(
                    {
                        path: "tutor"
                    })
                    console.log(course)
                    await course.save()
                    res.status(200).json({ message: 'Course Registered Successfully' });
                })
                .catch((error) => {
                    res.status(500).json({ message: error.message });
                });

        }


    }
    catch (err) {
        res.status(500).json({ message: err.message });
    }
}

const getCourse = async (req, res) => {
    const {id} = req.params
    try{
        const course = await Course.findOne({id})
        if(course){
            res.status(200).json({message: "Courses Data Fetch Successfully", data:course})
        }
        else{
            res.status(404).json({message: "No Courses Found", data: []})
        }
    }

    catch(error){
        res.status(500).json({message: "Error Occured", data: error})
    }
}

const editCourse = async (req, res) => {
    const {id} = req.params
    const {coursename, abbreviation, picture, teacher} = req.body.course
    console.log(coursename, abbreviation)
   
    try{
        const course = await Course.findOneAndUpdate({id}, { name:coursename, abbreviation:abbreviation, picture:picture, tutor:teacher}, {new:true})
        console.log(course)
        if(course){
            res.status(200).json({message: "Courses Data Updated Successfully", data:course})
        }
        else{
            res.status(400).json({message: "No Courses Found", data: []})
        }
    }

    catch(error){
        res.status(500).json({message: "Error Occured", data: error.message})
    }
   

}

module.exports = {getAllCourses, getCourse, addCourse, deleteCourse, editCourse}
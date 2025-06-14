import express from "express";
const  userRouter = express.Router();
import zod from "zod"
import {users} from "../db.js";
import jwt from "jsonwebtoken"
import JWT_SECRET  from "./config.js";
import authMiddleware from "../middleware.js";
import { exec } from "child_process";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename); 

const signupSchema = zod.object({
    userName:zod.string(),
    email : zod.string().email(),
    password:zod.string()
})
userRouter.post("/signup",async(req,res)=>{
    console.log("in signup backend")

    const succ = signupSchema.safeParse(req.body);
    if(!succ){
        return res.json({
            message : "Inputs are Invalid"
        })
    }
    const user = await users.findOne({
        email : req.body.email
    })
    if(user){
        return res.json({
            message : "User already Exist"
        })
    }

    const dbUser = await users.create({
        userName : req.body.userName,
        email : req.body.email,
        password : req.body.password
    })

    const userId = dbUser._id;
    const token = jwt.sign({
        userId : dbUser._id
    },JWT_SECRET,{expiresIn:60*60*24*30});

    return res.json({
        token: token,
        userName: dbUser.userName
    })
})


const signinSchema = zod.object({
    email: zod.string().email(),
    password: zod.string()
});

userRouter.post("/signin", async(req, res) => {
    const succ = signinSchema.safeParse(req.body);
    if (!succ) {
        return res.status(400).json({
            message: "Incorrect inputs"
        });
    }
    const user = await users.findOne({ email: req.body.email });
    if (!user) {
        res.status(411).json({
            msg: "Invalid information"
        });
    }
    const token = jwt.sign({ userId: user._id }, JWT_SECRET);
    console.log("In middle signin backend")
    return res.json({
        token: token,
        userName:user.userName
    });
});
// Assuming you have your User model imported as:
// const User = require('./models/User');


const updateSchema = zod.object({
    userName :zod.string().optional(),
    password : zod.string().optional()
})
userRouter.put("/updateDetails", authMiddleware,async(req,res)=>{
    const succ = updateSchema.safeParse(req.body)
    if(!succ){
        res.json({
            msg:"Error while updating"
        })
    }
    await users.updateOne(
        {email : req.body.email},
        {$set : req.body}
    )
    return res.json({
        msg:"Details Updated Successfully!!"
    })
})
userRouter.get("/getContent",async(req,res)=>{
    const prompt = req.body.prompt || req.query.prompt || "";
    const scriptPath = path.resolve(__dirname, "../abc_1.py");
    
    exec(`python "${scriptPath}" "${prompt.replace(/"/g, '\\"')}"`, (error, stdout, stderr) => {
        if (error) {
        console.error(`Error: ${error.message}`);
        return res.status(500).json({ error: error.message });
        }
        if (stderr) {
            console.error(`stderr: ${stderr}`);
        }
        const trimmed = stdout.trim();
        JSON.parse(trimmed);
        res.json({ result: trimmed });
    });
})

userRouter.get("/getWebsites",async(req,res)=>{
    const prompt = req.body.prompt || req.query.prompt || "";
    const scriptPath = path.resolve(__dirname, "../websiteSugg.py");
    
    exec(`python "${scriptPath}" "${prompt.replace(/"/g, '\\"')}"`, (error, stdout, stderr) => {
        if (error) {
        console.error(`Error: ${error.message}`);
        return res.status(500).json({ error: error.message });
        }
        if (stderr) {
            console.error(`stderr: ${stderr}`);
        }
        const trimmed = stdout.trim();
        let parsed;
        try {
            parsed = JSON.parse(trimmed); // convert string to actual array
        } catch (err) {
            return res.status(500).json({ error: "Invalid JSON from Python script" });
        }
        res.json({ result: parsed }); 
    });
})

userRouter.get("/getYoutubeVid",async(req,res)=>{
    const prompt = req.body.prompt || req.query.prompt || "";
    const scriptPath = path.resolve(__dirname, "../youtubeVidSugg.py");
    
    exec(`python "${scriptPath}" "${prompt.replace(/"/g, '\\"')}"`, (error, stdout, stderr) => {
        if (error) {
            console.error(`Error: ${error.message}`);
            return res.status(500).json({ error: error.message });
        }
        if (stderr) {
            console.error(`stderr: ${stderr}`);
        }
        const trimmed = stdout.trim();
        let parsed;
        try {
            parsed = JSON.parse(trimmed);
        } catch (e) {
            return res.status(500).json({ error: "Invalid JSON from Python script" });
        }
        res.json({ result: parsed });
    });
})
userRouter.post("/addToFav", async (req, res) => {
  try {
    const { email, course } = req.body;
    console.log(email+" "+course);
    if (!email || !course) {
      return res.status(400).json({ message: "Email and course are required" });
    }

    const user = await users.findOne({ email });
    if (!user) return res.status(404).json({ message: "User not found" });

    // Add course to favoriteCourses if not present
    if (!user.favoriteCourses.includes(course)) {
      user.favoriteCourses.push(course);
      await user.save();
    }
    res.json({ message: "Course added to favorites", favoriteCourses: user.favoriteCourses });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
});

userRouter.post("/addToCom", async (req, res) => {
  try {
    const { email, course } = req.body;
    if (!email || !course) {
      return res.status(400).json({ message: "Email and course are required" });
    }

    const user = await users.findOne({ email });
    if (!user) return res.status(404).json({ message: "User not found" });

    if (!user.completedCourses.includes(course)) {
      user.completedCourses.push(course);
      await user.save();
    }

    res.json({ message: "Course marked as completed", completedCourses: user.completedCourses });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
});

userRouter.post("/addToOngoing", async (req, res) => {
  try {
    const { email, course } = req.body;
    if (!email || !course) {
      return res.status(400).json({ message: "Email and course are required" });
    }

    const user = await users.findOne({ email });
    if (!user) return res.status(404).json({ message: "User not found" });

    if (!user.ongoingCourses.includes(course)) {
      user.ongoingCourses.push(course);
      await user.save();
    }

    res.json({ message: "Course added to ongoing", ongoingCourses: user.ongoingCourses });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
});

// Route: /api/user/coursesData
userRouter.post("/coursesData", async (req, res) => {
  try {
    const email = req.body.email;
    // console.log("in cd route and fetching data"+email);
    const user = await users.findOne({ email });
    // console.log("user found"+user);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    res.json({
      favoriteCourses: user.favoriteCourses || [],
      completedCourses: user.completedCourses || [],
      ongoingCourses: user.ongoingCourses || [],
      name:user.userName || ""
    });
  } catch (err) {
    console.error("Error in /coursesData/:email:", err);
    res.status(500).json({ message: "Server error", error: err.message });
  }
});


userRouter.post('/remove-favorite', async (req, res) => {
  const { email, courseName } = req.body;
  // console.log(email+" "+courseName);
  try {
    await users.updateOne(
      { email },
      { $pull: { favoriteCourses: courseName } }
    );
    res.status(200).json({ success: true, message: 'Course removed from favorites.' });
  } catch (err) {
    res.status(500).json({ success: false, message: 'Error removing from favorites.' });
  }
});

// Remove from completed
userRouter.post('/remove-completed', async (req, res) => {
  const { email, courseName } = req.body;

  try {
    await users.updateOne(
      { email },
      { $pull: { completedCourses: courseName } }
    );
    res.status(200).json({ success: true, message: 'Course removed from completed.' });
  } catch (err) {
    res.status(500).json({ success: false, message: 'Error removing from completed.' });
  }
});

userRouter.post('/remove-ongoing', async (req, res) => {
  const { email, courseName } = req.body;
  try {
    await users.updateOne(
      { email },
      { $pull: { ongoingCourses : courseName } }
    );
    res.status(200).json({ success: true, message: 'Course removed from completed.' });
  } catch (err) {
    res.status(500).json({ success: false, message: 'Error removing from completed.' });
  }
});


userRouter.get('/getRoadmap', async (req, res) => {
  const prompt = req.body.prompt || req.query.prompt || "";

  if (!prompt) {
    return res.status(400).json({ error: "No prompt provided" });
  }

  const scriptPath = path.resolve(__dirname, "../roadmap.py");

  // Escape double quotes in prompt for safe command line passing
  const escapedPrompt = prompt.replace(/"/g, '\\"');

  exec(`python "${scriptPath}" "${escapedPrompt}"`, (error, stdout, stderr) => {
    if (error) {
      console.error(`Error executing script: ${error.message}`);
      return res.status(500).json({ error: error.message });
    }

    if (stderr) {
      console.error(`Python stderr: ${stderr}`);
    }

    const output = stdout.trim();

    let parsed;
    try {
      parsed = JSON.parse(output);
    } catch (e) {
      return res.status(500).json({ error: "Invalid JSON from Python script", rawOutput: output });
    }

    if (parsed.error) {
      // The Python script returned an error
      return res.status(500).json({ error: parsed.error, details: parsed.details || null });
    }

    // Respond with the roadmap JSON data
    // According to python code, roadmap is under parsed.roadmap
    return res.json({ roadmap: parsed.roadmap || parsed.result || parsed });
  });
});


userRouter.post('/getQuiz', async (req, res) => {
  const prompt = req.body.prompt || req.query.prompt || "";

  if (!prompt) {
    return res.status(400).json({ error: "No topic provided" });
  }

  const scriptPath = path.resolve(__dirname, "../quiz.py");  // make sure quiz.py is here

  // Escape quotes for shell safety
  const escapedPrompt = prompt.replace(/"/g, '\\"');

  exec(`python "${scriptPath}" "${escapedPrompt}"`, (error, stdout, stderr) => {
    if (error) {
      console.error(`Error executing quiz.py: ${error.message}`);
      return res.status(500).json({ error: error.message });
    }

    if (stderr) {
      console.warn(`Python stderr: ${stderr}`);
    }

    const output = stdout.trim();

    let parsed;
    try {
      parsed = JSON.parse(output);
    } catch (e) {
      return res.status(500).json({ error: "Invalid JSON from Python script", rawOutput: output });
    }

    if (parsed.error) {
      return res.status(500).json({ error: parsed.error, details: parsed.details || null });
    }
    // Return the quiz questions
    return res.json({ quiz: parsed.quiz || parsed });
  });
});
export default userRouter;
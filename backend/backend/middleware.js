import  JWT_SECRET  from "./routes/config.js";
import jwt from "jsonwebtoken"

const authMiddleware = (req,res,next)=>{
    const authHeader = req.headers["authorization"];
    console.log("AuthHeader :",authHeader);

    if(!authHeader || !authHeader.startsWith("Bearer ")){
        return res.status(403).json({
            message:"No token provided"
        })
    }

    const token = authHeader.split(" ")[1];
    console.log("Extracted token :",token);
    if(!token || token.split(".").length !== 3){
        console.error("Invalid Token Format:", token);
        return res.status(400).json({ message: "Invalid Token" });
    }

    try{
        jwt.verify(token,JWT_SECRET,(err,decoded)=>{
            if(err){
                console.error("JWT Verification Error:", err.message);
                return res.status(401).json({ message: "Invalid or expired token" });
            }

            console.log("Decoded token ",decoded);
            req.userId = decoded.userId;
            next();
        })
    }
    catch(err){
        return res.status(500).json("Unexprected Error :",err.message);
    }
}

export default authMiddleware;
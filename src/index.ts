import express from "express";
import activityRoutes from "./routes/activity.routes";

const app = express();

// Middleware để parse JSON
app.use(express.json());


app.use(express.json());
app.use("/activities", activityRoutes);


const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
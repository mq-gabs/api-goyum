import express from "express";
import cors from "cors";
import "express-async-errors";
import { router } from "./routes";
import { errorHandler } from "./utils/error-handler";

const app = express();

app.use(express.json());
app.use(cors());
app.use(router);
app.use(errorHandler);

const PORT = 5000;

app.listen(PORT, () => console.log(`Server started on PORT: ${PORT}`));

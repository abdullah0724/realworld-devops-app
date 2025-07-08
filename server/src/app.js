const express = require("express");
const app = express();
const router = express.Router();
const cors = require("cors");
const dotenv = require("dotenv");
const HTTP_STATUS = require("./constants/httpStatus");
const prisma = require("./config/database");

dotenv.config();
app.use(cors());
app.use(express.json()); // ⬅️ Important to parse JSON body

// Get all users (no pagination now)
router.get("/users/all", async (req, res) => {
    try {
        console.log(`${new Date().toISOString()} - All users request hit!`);

        const users = await prisma.user.findMany();
        const total = await prisma.user.count();

        return res.status(HTTP_STATUS.OK).send({
            success: true,
            message: "Successfully received all users",
            data: {
                users: users,
                total: total,
            },
        });
    } catch (error) {
        console.error(error);
        return res.status(HTTP_STATUS.INTERNAL_SERVER_ERROR).send({
            success: false,
            message: "Internal server error",
        });
    }
});

// Get single user by ID
router.get("/user/:id", async (req, res) => {
    try {
        const { id } = req.params;

        const result = await prisma.user.findFirst({ where: { id: Number(id) } });

        if (result) {
            return res.status(HTTP_STATUS.OK).send({
                success: true,
                message: `Successfully received user with id: ${id}`,
                data: result,
            });
        }
        return res.status(HTTP_STATUS.NOT_FOUND).send({
            success: false,
            message: "Could not find user",
            data: null,
        });
    } catch (error) {
        console.error(error);
        return res.status(HTTP_STATUS.INTERNAL_SERVER_ERROR).send({
            success: false,
            message: "Internal server error",
        });
    }
});

// Add new user
router.post("/users/add", async (req, res) => {
    try {
        const { first_name, last_name, email, gender, phone } = req.body;

        const result = await prisma.user.create({
            data: {
                first_name,
                last_name,
                email,
                gender,
                phone,
            },
        });

        return res.status(HTTP_STATUS.CREATED).send({
            success: true,
            message: "User added successfully",
            data: result,
        });
    } catch (error) {
        console.error(error);
        return res.status(HTTP_STATUS.INTERNAL_SERVER_ERROR).send({
            success: false,
            message: "Could not add user",
            data: null,
        });
    }
});

app.use("/", router);

app.listen(process.env.PORT, () => {
    console.log(`Listening to port: ${process.env.PORT}`);
});


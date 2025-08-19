import { Sequelize } from "sequelize";
import "dotenv/config";

const isProduction = process.env.NODE_ENV === "production";

// This is the crucial change. It uses the single DATABASE_URL from Render.
const sequelize = new Sequelize(process.env.DATABASE_URL, {
  dialect: "postgres",
  protocol: "postgres",
  dialectOptions: {
    // SSL is required for production connections on Render
    ssl: isProduction ? { require: true, rejectUnauthorized: false } : false,
  },
  logging: false,
});

const connectDB = async () => {
  try {
    await sequelize.authenticate();
    console.log("✅ Database connection established successfully.");
  } catch (error) {
    console.error("❌ Unable to connect to the database:", error);
    process.exit(1); // Exit the process with an error code
  }
};

export { sequelize, connectDB };

import path from 'path';
import dotenv from 'dotenv';

dotenv.config();

export const Settings = {
    PORT: process.env.PORT,
    PROXY_URL: process.env.PROXY_URL,
    PROJECT_PARENT_FOLDER: process.env.PROJECT_PARENT_FOLDER,
    PROJECT_FOLDER: process.env.PROJECT_FOLDER,
    PROJECT_FULL_PATH: path.join(process.env.PROJECT_PARENT_FOLDER, process.env.PROJECT_FOLDER),
}
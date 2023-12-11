import mongoose from "mongoose"

const UserSchema = mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true

    },
    password: {
        type: String,
        required: true
    },
    role: {
        type: String,
        enum: ['student', 'academician', 'admin'],
        default: 'student'
    }
}, { timestamps: true })

export default mongoose.model("User", UserSchema)



import mongoose from "mongoose";

const fotoSchema = new mongoose.Schema(
	{
		user: {
			type: mongoose.Types.ObjectId,
			ref: "user",
		},
		title: {
			type: String,
			required: true,
			trim: true,
		},
		price: {
			type: Number,
			required: true,
			trim: true,
		},
		description: {
			type: String,
			required: true,
		},
		image: {
			type: String,
			required: true,
		},
		category: {
			type: String,
			required: true,
		},
	},
	{ timestamps: true }
);

let Dataset = mongoose.models.foto || mongoose.model("foto", fotoSchema);
export default Dataset;

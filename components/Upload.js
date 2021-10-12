import { useState, useCallback } from "react";
import { useDropzone } from "react-dropzone";
import { Image, Transformation } from "cloudinary-react";
import { Box, Input, UnorderedList, ListItem } from "@chakra-ui/react";

export default function Upload() {
	const [uploadedFiles, setUploadedFiles] = useState([]);

	const onDrop = useCallback((acceptedFiles) => {
		const url = `https://api.cloudinary.com/v1_1/${process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME}/upload`;

		acceptedFiles.forEach(async (acceptedFile) => {
			const { signature, timestamp } = await getSignature();

			const formData = new FormData();
			formData.append("file", acceptedFile);
			formData.append("signature", signature);
			formData.append("timestamp", timestamp);
			formData.append("api_key", process.env.NEXT_PUBLIC_CLOUDINARY_KEY);

			const response = await fetch(url, {
				method: "post",
				body: formData,
			});
			const data = await response.json();

			setUploadedFiles((old) => [...old, data]);
		});
	}, []);

	const { getRootProps, getInputProps, isDragActive } = useDropzone({
		onDrop,
		accepts: "image/*",
		multiple: false,
	});

	return (
		<>
			<Box
				{...getRootProps()}
				className={`dropzone ${isDragActive ? "active" : null}`}
			>
				<Input {...getInputProps()} />
				Drop Zone
			</Box>

			<UnorderedList>
				{uploadedFiles.map((file) => (
					<ListItem key={file.public_id}>
						<Image
							cloudName={process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME}
							publicId={file.public_id}
						>
							<Transformation overlay="xfp8kxsfgdjdrjaxlojv" />
						</Image>
					</ListItem>
				))}
			</UnorderedList>
		</>
	);
}

async function getSignature() {
	const response = await fetch("/api/sign");
	const data = await response.json();
	const { signature, timestamp } = data;
	return { signature, timestamp };
}

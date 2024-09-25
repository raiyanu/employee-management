import { imagefrombuffer } from "imagefrombuffer";

const ImageProvider = ({ imageData }) => {
	return (
		<>
			{imageData.contentType && (
				<img
					src={imagefrombuffer({
						data: imageData.data.data,
						contentType: imageData.contentType,
					})}
					alt={imageData.contentType}
					className="object-cover h-full w-full"
				/>
			)}
		</>
	);
};

export default ImageProvider;

import { WindowControls } from "#components";
import WindowWrapper from "#constants/hoc/WindowWrapper.jsx";
import useWindowStore from "#store/window.js";
import { useState } from "react";

const ImageWindowContent = () => {
    const { windows } = useWindowStore();
    const data = windows.imgfile?.data;
    const [selectedImage, setSelectedImage] = useState(null);
    const [zoom, setZoom] = useState(1);

    if(!data) return null;

    const { name, imageUrl, images } = data;
    return (
        <>
            <div id="window-header">
                <WindowControls target='imgfile'/>
                <h2>{name}</h2>
            </div>

            <div className="p-5 bg-white">

                {images ? (
                    <div className="grid grid-cols-2 gap-3 p-3 max-h-[70vh] overflow-y-auto">
                        {images.map((img, index) => (
                            <img
                                key={index}
                                src={img}
                                alt={`${name}-${index}`}
                                className="w-full rounded cursor-pointer"
                                onClick={() => {
                                    setSelectedImage(img);
                                    setZoom(1);
                                }}
                            />
                        ))}
                    </div>
                ) : imageUrl ? (
                    <div className="w-full">
                        <img
                            src={imageUrl}
                            alt={name}
                            className="w-full h-auto max-h-[70vh] object-contain rounded"
                        />
                    </div>
                ) : null}

                {selectedImage && (
                    <div
                        className="fixed inset-0 bg-black/80 flex z-[9999]"
                        onClick={() => {
                            setSelectedImage(null);
                            setZoom(1);
                        }}
                    >
                        
                        <div
                            className="w-full h-full overflow-auto"
                            onMouseDown={(e) => e.stopPropagation()}
                        >
                            <div className="min-w-full min-h-full flex items-center justify-center p-10">
                                <img
                                    src={selectedImage}
                                    alt="Preview"
                                    draggable={false}
                                    onClick={(e) => e.stopPropagation()}
                                    style={{
                                        transform: `scale(${zoom})`,
                                        transformOrigin: "top left",
                                    }}
                                    className="select-none"
                                    onWheel={(e) => {
                                        e.preventDefault();

                                        if (e.deltaY < 0) {
                                            setZoom((prev) => Math.min(prev + 0.2, 10));
                                        } else {
                                            setZoom((prev) => Math.max(prev - 0.2, 1));
                                        }
                                    }}
                                />
                            </div>
                        </div>

                    </div>
                )}
                
                
            </div>
        </>
    );
};

const ImageWindow = WindowWrapper(ImageWindowContent, "imgfile");

export default ImageWindow;

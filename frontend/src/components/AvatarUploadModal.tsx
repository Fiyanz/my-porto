import React, { useState, useCallback } from 'react';
import Cropper from 'react-easy-crop';
import 'react-easy-crop/react-easy-crop.css';
import getCroppedImg from '@/lib/cropImage';

interface Props {
  imageSrc: string;
  onClose: () => void;
  onCropComplete: (croppedBlob: Blob) => void;
}

export default function AvatarUploadModal({ imageSrc, onClose, onCropComplete }: Props) {
  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);
  const [croppedAreaPixels, setCroppedAreaPixels] = useState<any>(null);
  const [isProcessing, setIsProcessing] = useState(false);

  const onCropCompleteHandler = useCallback((_croppedArea: any, croppedAreaPixels: any) => {
    setCroppedAreaPixels(croppedAreaPixels);
  }, []);

  const handleSave = async () => {
    try {
      setIsProcessing(true);
      const croppedImage = await getCroppedImg(imageSrc, croppedAreaPixels);
      if (croppedImage) {
        onCropComplete(croppedImage);
      }
    } catch (e) {
      console.error(e);
      alert('Error cropping image');
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4">
      <div className="bg-white border-2 border-black rounded-2xl w-full max-w-md overflow-hidden flex flex-col">
        <div className="p-4 border-b-2 border-black flex items-center justify-between">
          <h3 className="font-black text-sm">Crop Profile Picture</h3>
          <button onClick={onClose} className="w-8 h-8 flex items-center justify-center border-2 border-black rounded-lg hover:bg-gray-100">
            <i className="fa-solid fa-xmark text-xs"></i>
          </button>
        </div>
        
        <div className="relative w-full h-80 bg-gray-100">
          <Cropper
            image={imageSrc}
            crop={crop}
            zoom={zoom}
            aspect={1}
            cropShape="rect"
            onCropChange={setCrop}
            onZoomChange={setZoom}
            onCropComplete={onCropCompleteHandler}
          />
        </div>

        <div className="p-4 flex flex-col gap-4">
          <div className="flex items-center gap-3">
            <i className="fa-solid fa-magnifying-glass-minus text-xs"></i>
            <input 
              type="range" 
              value={zoom} 
              min={1} 
              max={3} 
              step={0.1} 
              aria-labelledby="Zoom" 
              onChange={(e) => setZoom(Number(e.target.value))} 
              className="flex-1 accent-black" 
            />
            <i className="fa-solid fa-magnifying-glass-plus text-xs"></i>
          </div>

          <div className="flex gap-2 justify-end">
            <button onClick={onClose} className="px-4 py-2 border-2 border-black rounded-lg text-xs font-bold hover:bg-gray-50">
              Cancel
            </button>
            <button 
              onClick={handleSave} 
              disabled={isProcessing}
              className="px-4 py-2 bg-gray-900 text-white border-2 border-black rounded-lg text-xs font-bold hover:bg-gray-800 flex items-center gap-2"
            >
              {isProcessing ? <><i className="fa-solid fa-spinner fa-spin"></i> Processing...</> : <><i className="fa-solid fa-check"></i> Crop & Save</>}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

/* eslint-disable @typescript-eslint/explicit-function-return-type */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable prettier/prettier */
import { FileInput, Label } from 'flowbite-react';
import { useState } from 'react';
import { ModalUpload } from './modal/index';

export function Upload() {
  const [message, setMessage] = useState('');
  const [openModal, setOpenModal] = useState(false);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setSelectedFile(file);
      setOpenModal(true);
    }
  };

  const handleConfirmUpload = async (fileType: string, fileName: string) => {
    if (!selectedFile) return;

    const reader = new FileReader();
    reader.onload = async () => {
      const arrayBuffer = reader.result as ArrayBuffer;
      setOpenModal(false);

      try {
        const result = await (window as any).api.uploadFile(fileType, fileName, arrayBuffer, selectedFile.name);
        setMessage(result.message);
        console.log(result);
      } catch (error) {
        setMessage('Error uploading file');
        console.error(error);
      }
      setSelectedFile(null);
    };
    reader.readAsArrayBuffer(selectedFile);
  };

  return (
    <div className="flex w-[40%] pl-[5%] items-center justify-center">
      <Label
        htmlFor="dropzone-file"
        className="flex h-[20rem] w-full cursor-pointer flex-col items-center justify-center rounded-3xl border-linha border-2 bg-white hover:bg-gray-100 dark:border-gray-600"
      >
        <div className="px-[15.5%] py-[11%] border-dashed rounded-3xl border-2 border-linha">
          <div className="flex flex-col items-center justify-center pb-6 pt-5">
            <svg
              className="mb-4 h-8 w-8 text-gray-500 dark:text-gray-400"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 20 16"
            >
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"
              />
            </svg>
            <p className="mb-2 text-sm text-gray-500 dark:text-gray-400">
              <span className="font-semibold">Clique para fazer upload</span> ou arraste aqui
            </p>
            <p className="text-xs text-gray-500 dark:text-gray-400"></p>
          </div>
        </div>
        <FileInput id="dropzone-file" className="hidden" onChange={handleFileChange} />
      </Label>
      <ModalUpload
        openModal={openModal}
        onCloseModal={() => setOpenModal(false)}
        onConfirmUpload={handleConfirmUpload}
        highContrast={false}
      />
    </div>
  );
}

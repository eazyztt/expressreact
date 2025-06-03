import { useRef } from "react";

export default function UploadForm({ files, setFiles }) {
  const inputRef = useRef(null); // 👈 ref для input

  const onChange = (e) => {
    const newFiles = Array.from(e.target.files);

    // Удаляем дубликаты по имени
    const fileNames = new Set(files.map((file) => file.name));
    const uniqueNewFiles = newFiles.filter((file) => !fileNames.has(file.name));

    // Ограничиваем общее количество файлов до 6
    const availableSlots = 6 - files.length;
    if (availableSlots <= 0) {
      alert("Можно загрузить максимум 6 файлов");
      return;
    }

    const filesToAdd = uniqueNewFiles.slice(0, availableSlots);
    setFiles((prevFiles) => [...prevFiles, ...filesToAdd]);

    if (uniqueNewFiles.length > filesToAdd.length) {
      alert("Некоторые файлы не были добавлены — превышен лимит 6");
    }
  };

  const removeFile = (indexToRemove) => {
    const updatedFiles = files.filter((_, i) => i !== indexToRemove);
    setFiles(updatedFiles);

    // 🧼 Очистим <input type="file">, если список стал пуст
    if (updatedFiles.length === 0 && inputRef.current) {
      inputRef.current.value = "";
    }
  };

  return (
    <>
      <div className="flex flex-col mt-20 pl-4 pt-5 ml-2">
        <p className="pt-10 text-gray-200">
          Drag all your screenshots from any app and click
          <span className="font-bold text-sky-500"> submit</span>
        </p>
        <p className="pt-2 text-gray-200">
          Our app will analyze it and return you the best way to start
          <span className="font-bold text-sky-500"> conversation</span>
        </p>
      </div>

      <div className="flex items-center justify-center w-full pt-6 px-5">
        <label
          htmlFor="dropzone-file"
          className="flex flex-col items-center justify-center w-dvw h-[15dvh] border-2 border-gray-400 border-dashed rounded-lg cursor-pointer bg-gray-300 hover:bg-gray-100 dark:bg-gray-700 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600"
        >
          <div className="flex flex-col items-center justify-center pt-5 pb-6">
            <svg
              className="w-8 h-8 mb-4 text-gray-500 dark:text-gray-400"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 20 16"
            >
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5A5.5 5.5 0 0 0 5.2 5a4 4 0 0 0 0 8h2.2M10 15V6m0 0L8 8m2-2 2 2"
              />
            </svg>
            <p className="mb-2 text-sm text-gray-500 dark:text-gray-400">
              <span className="font-semibold">Click to upload</span> or drag and
              drop
            </p>
          </div>
          <input
            ref={inputRef}
            id="dropzone-file"
            type="file"
            className="hidden"
            multiple
            onChange={onChange}
          />
        </label>
      </div>

      {files.length > 0 && (
        <div className="mt-4 px-4 w-[98dvw]">
          <p className="text-sm text-white font-semibold mb-2">
            Selected files:
          </p>
          <div className="flex flex-row flex-wrap w-[90dvw] gap-6 text-sm text-gray-700 dark:text-gray-200 space-y-1">
            {files.map((file, index) => (
              <div
                key={index}
                className=" flex  bg-gray-100 dark:bg-gray-800 px-1 py-1 rounded-lg"
              >
                <span className="truncate">
                  <img
                    class="w-[20dvw] h-20 border border-red-500"
                    src={URL.createObjectURL(file)}
                  />
                </span>
                <button
                  onClick={() => removeFile(index)}
                  className=" font-bold text-2xl"
                >
                  ✖️
                </button>
              </div>
            ))}
          </div>
        </div>
      )}
    </>
  );
}

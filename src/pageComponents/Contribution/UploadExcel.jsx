import { useState } from "react";
import { Link } from "react-router-dom";
import { useUploadexcelMutation } from "../../services/Contribution";
import LoadingPage from "../../components/LoadingPage";

function UplaodExcel() {
  const [file, setFile] = useState(null);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);

  const [UploadAPI, {isLoading}] = useUploadexcelMutation()
  const FileUpload = async(e) => {
    e.preventDefault();
      const formData = new FormData();
      formData.append("excel_contribute", file); 
      try {
        const result = await UploadAPI(formData).unwrap();
        if(result.message){
            setSuccess("File successfully uploaded and is under review");
            setTimeout(() => {
              setSuccess(null);
            }, 180000);
        }
        // console.log("Upload successful:", result);
        setFile(null);
      } catch (error) {
        setError(error?.data?.error_message || "Failed to upload file. Please try again.");
      }
  }

  const handleFileUpload = async (e) => {
    const selectedFile = e.target.files[0];
    if (!selectedFile) {
      setError("No file selected.");
      return;
    }
  
    const allowedTypes = [
      "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
      "application/vnd.ms-excel",
      "text/csv",
    ];
    if (!allowedTypes.includes(selectedFile.type)) {
      setError("Invalid file type. Please upload an Excel or CSV file.");
      return;
    }
  
    if (selectedFile.size > 5 * 1024 * 1024) {
      setError("File size exceeds 5MB.");
      return;
    }
  
    setFile(selectedFile);
    setError(null); 
  };

  const removeFile = () => {
    if(file) setFile(null);
    if(error) setError(null)
  }
  

  return ( 
        <>
        <div className="rounded-sm dark:border-strokedark dark:bg-boxdark">
            <div className="p-7 lg:w-1/2 mx-auto">

              {success && <div className="p-6 border-l-4 border-green-500 rounded-r-xl bg-green-50">
                <div className="flex">
                  <div className="flex-shrink-0">
                    <svg className="w-5 h-5 text-green-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"></path>
                    </svg>
                  </div>
                  <div className="ml-3">
                    <div className="text-sm text-green-600">
                      <p>{success}😍</p>
                    </div>
                  </div>
                </div>
              </div>}

              {isLoading && <LoadingPage />}
                <div className="mb-4 flex justify-between items-center gap-3">                
                    <div className="flex align-middle items-center gap-4">
                      <button onClick={removeFile} className={`text-sm border p-2 bg-gray-50 rounded-md ${file ? 'text-red-700': 'hover:text-indigo-700'}`}>
                          Delete
                      </button>
                      
                    </div>
                    {file? <p className="text-red-400 underline underline-offset-2 p-1 text-[12px]">{file.name}</p> : <p className="text-gray-500 text-sm">No file Selected</p>}
                </div>
              <form action="#" onSubmit={FileUpload} >
  
                <div id="FileUpload" className={`relative mb-5.5 block w-full cursor-pointer appearance-none rounded border border-dashed border-blue-600 ${file? 'bg-gray-100 text-gray-400': 'bg-sky-200/10'} py-4 px-4 sm:py-7.5`} >
                      <input type="file" name="file" disabled={file} onChange={handleFileUpload} accept=".csv, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/vnd.ms-excel" 
                      className={`absolute inset-0 z-50 m-0 h-full w-full cursor-pointer p-0 opacity-0 outline-none`} />
                      
                      <div className="flex flex-col items-center justify-center space-y-3">
                        <span className="flex h-10 w-10 items-center justify-center rounded-full border border-stroke bg-white dark:border-strokedark dark:bg-boxdark">
                          <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg" > <path fillRule="evenodd" clipRule="evenodd" d="M1.99967 9.33337C2.36786 9.33337 2.66634 9.63185 2.66634 10V12.6667C2.66634 12.8435 2.73658 13.0131 2.8616 13.1381C2.98663 13.2631 3.1562 13.3334 3.33301 13.3334H12.6663C12.8431 13.3334 13.0127 13.2631 13.1377 13.1381C13.2628 13.0131 13.333 12.8435 13.333 12.6667V10C13.333 9.63185 13.6315 9.33337 13.9997 9.33337C14.3679 9.33337 14.6663 9.63185 14.6663 10V12.6667C14.6663 13.1971 14.4556 13.7058 14.0806 14.0809C13.7055 14.456 13.1968 14.6667 12.6663 14.6667H3.33301C2.80257 14.6667 2.29387 14.456 1.91879 14.0809C1.54372 13.7058 1.33301 13.1971 1.33301 12.6667V10C1.33301 9.63185 1.63148 9.33337 1.99967 9.33337Z" fill="#3C50E0" /> <path fillRule="evenodd" clipRule="evenodd" d="M7.5286 1.52864C7.78894 1.26829 8.21106 1.26829 8.4714 1.52864L11.8047 4.86197C12.0651 5.12232 12.0651 5.54443 11.8047 5.80478C11.5444 6.06513 11.1223 6.06513 10.8619 5.80478L8 2.94285L5.13807 5.80478C4.87772 6.06513 4.45561 6.06513 4.19526 5.80478C3.93491 5.54443 3.93491 5.12232 4.19526 4.86197L7.5286 1.52864Z" fill="#3C50E0" /> <path fillRule="evenodd" clipRule="evenodd" d="M7.99967 1.33337C8.36786 1.33337 8.66634 1.63185 8.66634 2.00004V10C8.66634 10.3682 8.36786 10.6667 7.99967 10.6667C7.63148 10.6667 7.33301 10.3682 7.33301 10V2.00004C7.33301 1.63185 7.63148 1.33337 7.99967 1.33337Z" fill="#3C50E0" /> </svg>
                        </span>
                        <p>
                          <span className="text-primary">Click to upload</span> or
                          drag and drop
                        </p>
                        <p className="mt-1.5">SVG, PNG, JPG or GIF</p>
                        <p>(max, 800 X 800px)</p>
                      </div>
                </div>
  
                <div className="flex justify-end gap-5 mt-4">
                      <Link to={'/contribution'} className="rounded border px-3 py-2 font-medium text-gray-400 hover:bg-gray-200 hover:text-gray-700" type="submit" >
                        Cancel
                      </Link>
                      <button className="border rounded bg-indigo-200/50 py-2 px-6 font-medium text-gray hover:bg-indigo-200" type="submit" >
                        Upload
                      </button>
                </div>
              </form>
            </div>
        </div>
        {error && <div className="mt-10 p-4 bg-white rounded-md">
          <h2 className="text-lg font-semibold mb-2">Error Output</h2>
          <div className="bg-gray-200 text-slate-800 p-3 rounded-md">
            <p className="font-mono text-sm">
              <span className="text-red-500">{'> '}{error}</span> 
            </p>
           
          </div>
        </div>}
        </>
  );
}

export default UplaodExcel;
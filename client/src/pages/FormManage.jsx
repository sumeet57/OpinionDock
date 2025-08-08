import React, { useEffect } from "react";
import { useLocation, useParams } from "react-router-dom";
const apiUrl = import.meta.env.VITE_SERVER_URL;
const FormManage = () => {
  const params = useParams();
  const [data, setData] = React.useState();
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          `${apiUrl}/api/submissions/${params.formId}/views`,
          {
            method: "GET",
            credentials: "include",
            params: JSON.stringify({
              formId: params.formId,
            }),
          }
        );
        if (!response.ok) {
          throw new Error("Failed to fetch form data");
        }
        const data = await response.json();

        setData(data);
      } catch (error) {
        console.error("Error fetching form data:", error);
      }
    };
    fetchData();
  }, [params.formId]);
  return (
    <>
      <div className="min-h-screen w-full bg-gray-50 px-6 pt-20 text-gray-800">
        {data ? (
          <div className="min-h-screen bg-gray-50 px-6 pt-20 text-gray-800">
            <h1 className="text-3xl font-bold text-gray-900 mb-4">
              Form Submissions
            </h1>
            <h2 className="text-xl font-semibold mb-4">
              Total Submissions : {data.length}
            </h2>
            <div className="bg-white shadow-md rounded-lg p-6 flex flex-wrap gap-2">
              {data.length > 0 ? (
                data.map((submission, index) => (
                  <div
                    key={index}
                    className="p-2 border-2 border-gray-200 mb-4 rounded-lg"
                  >
                    <p>Name : {submission?.userInfo?.name}</p>
                    <p>Email : {submission?.userInfo?.email}</p>
                    <p>Phone : {submission?.userInfo?.phone}</p>
                  </div>
                ))
              ) : (
                <p className="text-gray-600">No submissions found.</p>
              )}
            </div>
          </div>
        ) : (
          <p>Loading...</p>
        )}
      </div>
    </>
  );
};

export default FormManage;

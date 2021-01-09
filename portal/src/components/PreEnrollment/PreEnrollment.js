import React, {useEffect, useState} from 'react';
import UploadCSV from '../UploadCSV/UploadCSV';
import {useAxios} from "../../utils/useAxios";
import {CustomTable} from "../CustomTable";
import {TotalRecords} from "../TotalRecords";
import {SampleCSV} from "../../utils/constants";
import UploadHistory from "../UploadHistory/UploadHistory";

function PreEnrollment() {
    /* const [enrollments, setEnrollments] = useState([]);
     const fileUploadAPI = '/divoc/admin/api/v1/enrollments';
     const axiosInstance = useAxios('');
     useEffect(() => {
         fetchEnrollment()
     }, []);

     function fetchEnrollment() {
         axiosInstance.current.get(fileUploadAPI)
             .then(res => {
                 setEnrollments(res.data)
             });
     }

     return (
         <div>
             <div className="d-flex mt-3">
                 <UploadCSV fileUploadAPI={fileUploadAPI}
                            onUploadComplete={fetchEnrollment}
                 />
                 <TotalRecords
                     title={"Total # of Enrollments in the\nDIVOC Enrollments Registry"}
                     count={enrollments.length}
                 />
             </div>
             <CustomTable data={enrollments} fields={["name", "phone", "enrollmentScopeId"]}/>
         </div>
     );*/

    const fileUploadAPI = '/divoc/admin/api/v1/enrollments';
    const fileUploadHistoryAPI = '/divoc/admin/api/v1/enrollments/uploads'
    const fileUploadErrorsAPI = '/divoc/admin/api/v1/enrollments/uploads/:id/errors'

    return <UploadHistory
        fileUploadAPI={fileUploadAPI}
        fileUploadHistoryAPI={fileUploadHistoryAPI}
        fileUploadErrorsAPI={fileUploadErrorsAPI}
        infoTitle={"Total # of Enrollments in the\nDIVOC Enrollments Registry"}
    />
}

export default PreEnrollment;

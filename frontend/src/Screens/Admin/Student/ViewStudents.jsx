import React, { useEffect } from "react";
import axios from "axios";
import { useState } from "react";
import { baseApiURL } from "../../../baseUrl";
import toast from "react-hot-toast";

const ViewStudents = () => {

  const [students, setStudents] = useState([]);
  const semesterArray = [
    {id: 1, name: '1st Semester'},
    {id: 2, name: '2nd Semester'},
    {id: 3, name: '3rd Semester'},
    {id: 4, name: '4th Semester'},
    {id: 5, name: '5th Semester'},
    {id: 6, name: '6th Semester'},
    {id: 7, name: '7th Semester'},
    {id: 8, name: '8th Semester'},
  ];

  const getStudents = () => {
    let data = {};
    // if (router.pathname.replace("/", "") === "student") {
    //   data = {
    //     type: ["student", "both"],
    //   };
    // } else {
    //   data = {
    //     type: ["student", "both", "faculty"],
    //   };
    // }
    const headers = {
      "Content-Type": "application/json",
    };
    axios
      .post(`${baseApiURL()}/student/details/getDetails`, data, {
        headers: headers,
      })
      .then((response) => {
        if (response.data.success) {
          setStudents(response.data.user);
        } else {
          toast.error(response.data.message);
        }
      })
      .catch((error) => {
        toast.dismiss();
        toast.error(error.response.data.message);
      });
  };

  useEffect(() => {
    getStudents();
  }, []);

  return (
    <div className="my-12 mx-auto w-full">
      <form className="flex justify-center items-center border-2 border-blue-500 rounded w-[100%] mx-auto">
        <div className="mt-2 mb-2 ml-2 mr-2 w-full">
          <table className="w-full">
            <thead>
              <tr>
                <th className="border border-gray-400 py-2 px-4">ID</th>
                <th className="border border-gray-400 py-2 px-4">Full Name</th>
                <th className="border border-gray-400 py-2 px-4">Email</th>
                <th className="border border-gray-400 py-2 px-4">Phone Number</th>
                <th className="border border-gray-400 py-2 px-4">Semester</th>
                <th className="border border-gray-400 py-2 px-4">Department</th>
                <th className="border border-gray-400 py-2 px-4">Gender</th>
              </tr>
            </thead>
            {/* You'd have multiple <tr> with dynamic data in a real scenario */}
            <tbody>
            {students &&
            students.map((item, index) => {
              const foundSemester = semesterArray.find(itm => itm.id == item.semester);
              
              return (
                <tr>
                  <td className="border border-gray-400 py-2 px-4">{item.enrollmentNo}</td>
                  <td className="border border-gray-400 py-2 px-4">{item.firstName + ' ' + item.middleName + ' ' + item.lastName}</td>
                  <td className="border border-gray-400 py-2 px-4">{item.email}</td>
                  <td className="border border-gray-400 py-2 px-4">{item.phoneNumber}</td>
                  <td className="border border-gray-400 py-2 px-4">{foundSemester.name}</td>
                  <td className="border border-gray-400 py-2 px-4">{item.branch}</td>
                  <td className="border border-gray-400 py-2 px-4">{item.gender}</td>
                </tr>
              );
            })}
              {/* More rows here */}
            </tbody>
          </table>
        </div>
      </form>
    </div>
  );
};

export default ViewStudents;

import React, { useState, useEffect } from 'react';
import { useCollege } from '../utils/GlobalContext';
import api from '../utils/api';

const StudentAttendanceCalendar = () => {
  const [attendanceData, setAttendanceData] = useState([]);
  const [selectedMonth, setSelectedMonth] = useState('January');
  const [selectedYear, setSelectedYear] = useState('2024');
  const [daysInMonth, setDaysInMonth] = useState([]);
  const { bearerHeader, currentUser } = useCollege();

  // Fetch attendance data from backend
  const getAttendanceById = async () => {
    try {
      const res = await api.get(`/college/student/get/his/attendance`, bearerHeader);
      if (res.data.success) {
        const formattedData = res.data.attendance.map((entry) => {
          const dateStr = new Date(entry.date).toISOString().split('T')[0]; // Format date as 'YYYY-MM-DD'
          return {
            date: dateStr,
            status: entry.present ? 'Present' : 'Absent',
          };
        });
        setAttendanceData(formattedData);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getAttendanceById();
  }, []); // Ensure it re-fetches when bearerHeader changes

  const lastFiveYears = Array.from({ length: 5 }, (_, i) => new Date().getFullYear() - i);
  const months = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];

  useEffect(() => {
    const daysInSelectedMonth = new Date(selectedYear, months.indexOf(selectedMonth) + 1, 0).getDate();
    const daysArray = Array.from({ length: daysInSelectedMonth }, (_, index) => index + 1);
    setDaysInMonth(daysArray);
    
    // Filter attendance data based on selected month/year
    const filteredData = attendanceData.filter(
      (entry) => entry.date.startsWith(`${selectedYear}-${(months.indexOf(selectedMonth) + 1).toString().padStart(2, '0')}`)
    );
    setAttendanceData(filteredData);
  }, [selectedMonth, selectedYear]);

  const getAttendanceStatus = (day) => {
    const dateStr = `${selectedYear}-${(months.indexOf(selectedMonth) + 1).toString().padStart(2, '0')}-${day.toString().padStart(2, '0')}`;
    const attendanceRecord = attendanceData.find((entry) => {
      const entryDate = new Date(entry.date).toISOString().split('T')[0];
      return entryDate === dateStr;
    });

    return attendanceRecord ? (attendanceRecord.status === 'Present' ? 'Present' : 'Absent') : 'No Data';
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-semibold text-gray-800 mb-6">My Attendance Calendar</h1>

      <div className="flex space-x-4 mb-4">
        <select
          value={selectedMonth}
          onChange={(e) => setSelectedMonth(e.target.value)}
          className="p-2 border rounded-md"
        >
          {months.map((month, index) => (
            <option key={index} value={month}>
              {month}
            </option>
          ))}
        </select>

        <select
          value={selectedYear}
          onChange={(e) => setSelectedYear(e.target.value)}
          className="p-2 border rounded-md"
        >
          {lastFiveYears.map((year) => <option value={year} key={year}>{year}</option>)}
        </select>
      </div>

      <div className="calendar grid grid-cols-7 gap-4 mt-6">
        <div className="col-span-7 text-center font-bold text-xl text-green-600">
          {`${selectedMonth} ${selectedYear}`}
        </div>

        <div className="col-span-7 grid grid-cols-7 gap-4">
          {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map((day, index) => (
            <div key={index} className="text-center font-semibold">{day}</div>
          ))}

          {daysInMonth.map((day) => {
            const status = getAttendanceStatus(day);
            return (
              <div key={day} className="border p-2 relative">
                <div className="absolute top-0 left-0 right-0 text-center font-semibold">
                  {day}
                </div>
                <div className="mt-6 text-center">
                  <div className={`py-1 px-2 text-sm rounded ${status === 'Present' ? 'bg-green-200' : status === 'Absent' ? 'bg-red-200' : 'bg-gray-200'}`}>
                    {status}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default StudentAttendanceCalendar;

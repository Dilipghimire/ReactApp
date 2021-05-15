import React, { useState, useCallback, useEffect } from "react";
import { BiCalendar } from "react-icons/bi";
import Search from "../../Component/Search/Search";
import AddAppointment from "../../Component/AddAppointment/AddAppointment";
import AppointmentInfo from "../../Component/AppointmentInfo/AppointmentInfo";


const AppointmentApp = () => {
  let [appointmentList, setAppointmentList] = useState([]);
  let [query, setQuery] = useState("");
  let [sortBy, setSortBy] = useState("petName");
  let [orderBy, setOrderBy] = useState("asc");

  let filterAppointmentList = appointmentList.filter((item) => {
      return (
        item.petName.toLowerCase().includes(query.toLowerCase()) ||
        item.ownerName.toLowerCase().includes(query.toLowerCase()) ||
        item.aptNotes.toLowerCase().includes(query.toLowerCase())
      );
    })
    .sort((a, b) => {
      let order = orderBy === "asc" ? 1 : -1;
      return a[sortBy].toLowerCase() < b[sortBy].toLowerCase()
        ? -1 * order
        : 1 * order;
    });

  const fetchData = useCallback(() => {
    fetch("../../data.json")
      .then((response) => response.json())
      .then((data) => {
        setAppointmentList(data);
      });
  }, []);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  return (
    <div className="App container mx-auto mt-3 mb-5 font-thin">
      <h1 className="text-5xl">
        <BiCalendar className="inline-block text-red-400 align-top" /> Your
        Appointment
      </h1>
      <AddAppointment
        onSendAppointmentInfo={(myappointment) =>
          setAppointmentList([...appointmentList, myappointment])
        }
        lastId={appointmentList.reduce((max, item) =>
          Number(item.id) > max ? Number(item.id) : max , 0
        )}
      />

      <Search
        query={query}
        onQueryChange={(myquery) => setQuery(myquery)}
        orderBy={orderBy}
        onOrderByChange={(mySort) => setOrderBy(mySort)}
        sortBy={sortBy}
        onSortByChange={(mySort) => setSortBy(mySort)}
      />

      <ul className="divide-y divide-gray-200"></ul>
      {filterAppointmentList.map((appointment) => (
        <AppointmentInfo
          key={appointment.id}
          appointment={appointment}
          onDeleteAppointment={(appointmentId) =>
            setAppointmentList(
              appointmentList.filter(
                (appointment) => appointment.id !== appointmentId
              )
            )
          }
        />
      ))}
    </div>
  );
};

export default AppointmentApp;

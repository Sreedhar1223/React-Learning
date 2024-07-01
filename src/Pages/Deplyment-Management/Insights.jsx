import React, { useEffect, useState } from "react";
import { getApiData } from "./Api";
import '../../App.css';
const Insights = () => {
  const [data, setData] = useState(null);
  const [selectedCompany, setSelectedCompany] = useState(null);
  const [selectedPlant, setSelectedPlant] = useState(null);
  const [selecteApplication, setSelecteApplication] = useState(null);
  const [selectedUnit, setSelectedUnit] = useState(null);
  const [selectedZone,setSelectedZone] = useState(null)
  useEffect(() => {
    getDataFromServer();
  }, []);
  const getDataFromServer = async () => {
    try {
      const result = await getApiData();
      setData(result);
      setSelectedCompany(result.companies[0]);
      setSelectedPlant(result?.companies[0]?.plants[0]);
      setSelecteApplication(result?.companies[0]?.plants[0]?.applications?.[0]);
      setSelectedUnit(result?.companies[0]?.plants[0]?.applications?.[0]?.units?.[0]);
      setSelectedZone(result?.companies[0]?.plants[0]?.applications?.[0]?.units[0]?.zones?.[0]);
      console.log(
      //  'companies',result.companies[0],
      //  'plants', result?.companies[0]?.plants[0],
      //  'applications',result?.companies[0]?.plants[0]?.applications?.[0],
       'units',result?.companies[0]?.plants[0]?.applications?.[0]?.units[0]
      );
    } catch (error) {
      // Handle error
      console.error("Error fetching data:", error);
    }
  };
  const getPlantData = (selected,data) => {
    console.log(data)
   if(selected == 'selectedCompany'){
    setSelectedCompany(data)
    setSelectedPlant(data?.plants?.[0])
    setSelecteApplication(data?.plants?.[0]?.applications?.[0])
    setSelectedUnit(data?.plants[0]?.applications?.[0]?.units?.[0]);
    setSelectedZone(data?.plants[0]?.applications?.[0]?.units[0]?.zones?.[0]);
   }
   else if(selected == 'selectedPlant'){
    setSelectedPlant(data)
    setSelecteApplication(data?.applications?.[0])
    setSelectedUnit(data?.applications?.[0]?.units?.[0]);
    // setSelectedZone(data?.applications?.[0]?.units[0]?.zones?.[0]?data?.applications?.[0]?.units[0]?.zones?.[0]:null);
   }
  
  };
  return (
    <div>
      {/* part-1 */}
      <div style={{ height: "10vh" }}></div>
      {/* part-2 */}
      <div
        className="shadow-sm d-flex align-items-center"
        style={{ height: "10vh" }} 
      >
        {data?.companies?.map((data, index) => {
          return (
            <div className={data.id == selectedCompany.id?'selected ms-2':'ms-2'}
              key={index}
              onClick={() => getPlantData('selectedCompany',data)}
            >
              {data.companyName}
            </div>
          );
        })}
      </div>
      {/* part-3 */}
      <div className="d-flex m-2">
        {/* plant table */}
        <div className="shadow-sm" style={{ height: "70vh", width: "15%" }}>
          {selectedCompany?.plants?.map((data, index) => {
            return (
              <div
                key={index}
                className={data.id == selectedPlant.id?'selected ms-2':'ms-2'}
                onClick={(event) => getPlantData('selectedPlant',data)}
              >
                {data.plantName}
              </div>
            );
          })}
        </div>
        {/* appllication table */}
        <div
          className="shadow-sm ms-2"
          style={{ height: "70vh", width: "35%" }}
        >
          {selectedPlant?.applications?.map((data, index) => {
            return (
              <div
                key={index}
                className={data?.id == selecteApplication?.id?'selected ms-2':'ms-2'}
                onClick={(event) => getPlantData(event)}
              >
                {data.applicationName}
              </div>
            );
          })}
        </div>
        {/* units and zones table */}
        <div style={{ height: "70vh", width: "25%" }}>
          <div className="shadow-sm ms-2" style={{ height: "40vh", width: "100%" }} >
          <div className="d-flex">
            {selecteApplication?.units?.map((data, index) => {
              return (
                <div
                  key={index}
                  className={data?.id == selectedUnit?.id?'selected ms-2':'ms-2'}
                  onClick={(event) => getPlantData(event)}
                >
                  {data.unitName}
                </div>
              );
            })}
          </div>
          <div>
            {selectedUnit?.zones?.map((data, index) => {
              return (
                <div
                  key={index}
                  className={data?.id == selectedZone?.id?'selected ms-2':'ms-2'}
                  onClick={(event) => getPlantData(event)}
                >
                  {data.zoneName}
                </div>
              );
            })}
          </div>
          </div>
          <div className="shadow-sm ms-2" style={{ height: "30vh", width: "100%" }}>
           {data?.companies[0]?.users.map((data,index) =>{
            return(
              <div>{data.email}</div>
            )
           })}
          </div>
        </div>

        {/* infra table */}
        <div 
          className="shadow-sm ms-2"
          style={{ height: "70vh", width: "25%" }}
        >
          {selectedPlant?.infraDetials?.map((data, index) => {
              return (
                <div
                  key={index}
                  className="ms-2"
                  onClick={(event) => getPlantData(event)}
                >
                  {data.infraName}
                </div>
              );
            })}
        </div>
      </div>
    </div>
  );
};

export default Insights;

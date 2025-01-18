import { useEffect } from "react";

const useGeoJsonLoader = (setGeojsonData, setClinicData, setFilteredData) => {
  useEffect(() => {
    fetch("/spitale.json") // Calea către fișierul JSON
      .then((response) => response.json()) // Convertim răspunsul în format JSON
      .then((data) => {
        if (setGeojsonData) setGeojsonData(data); // Setăm datele JSON în state-ul geojsonData

        if (setClinicData && setFilteredData) {
          const clinics = data.map((item) => ({
            name: item.name,
            address: item.adress, // Corectăm proprietatea "address" în cazul în care e necesar
            latitude: item.latitude,
            longitude: item.longitude,
          }));

          setClinicData(clinics); // Setăm datele în state-ul clinicData
          setFilteredData(clinics); // Setăm aceleași date și în filteredData
        }
      })
      .catch((error) => console.error("Error loading GeoJSON data:", error)); // Gestionăm erorile
  }, [setGeojsonData, setClinicData, setFilteredData]); // Folosim efectul pentru a rula la montarea componentei
};

export default useGeoJsonLoader;

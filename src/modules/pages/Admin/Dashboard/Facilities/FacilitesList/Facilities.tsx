import { useEffect, useState } from "react";
import { axiosInstance, Facilities_URL } from "../../../../../services/Urls.ts";
import SharedTable from "../../../../../shared/SharedTable/SharedTable.tsx";
import { Box, CircularProgress } from "@mui/material";
import { toast } from "react-toastify";
import ViewModel from "../ViewFacilitesModel/ViewModel.tsx";
import Header from "../../../../../shared/Header/Header.tsx";

export default function Facilities() {
  const [Facilities, setFacilities] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [viewModalOpen, setViewModalOpen] = useState(false);
  const [selectedFacilities, setSelectedFacilities] = useState<any>(null);


  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(5);
  const [totalResults, setTotalResults] = useState(0);


  const fetchFacilities = async (page = 1, size = 5) => {
    setLoading(true);
    try {
      const res = await axiosInstance.get(
        `${Facilities_URL.GET_facilities}?page=${page}&size=${size}`
      );
      const { facilities, totalCount } = res.data.data;
      setFacilities(facilities);
      setTotalResults(totalCount);
    } catch (err) {
      toast.error("Error fetching facilities data");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (row: any) => {
    setLoading(true);
    try {
      let res = await axiosInstance.delete(Facilities_URL.DELETE_facilities(row._id));
      toast.success(res.data.message || "facilities deleted successfully");
      fetchFacilities(currentPage, itemsPerPage);
    } catch (error: any) {
      toast.error(error.response?.data?.message || "Error deleting facilities");
    }
    finally {
      setLoading(false);
    }
  };


  const handleView = (row: any) => {
    setSelectedFacilities(row);
    setViewModalOpen(true);
  };


  useEffect(() => {
    fetchFacilities(currentPage, itemsPerPage);
  }, [currentPage, itemsPerPage]);


  const handleAddRoom = () => {
      console.log("Redirect to Add Room form");
    };

  const columns = [
    {
      id: "Name",
      label: "Name",
      align: "center" as "center",
      render: (row: any) => row.name,
    },
    {
      id: "Created By",
      label: "Created By",
      align: "center" as "center",
      render: (row: any) => `${row.createdBy.userName}`,
    },

    {
      id: "createdAt",
      label: "createdAt",
      align: "center" as "center",
      render: (row: any) => new Date(row.createdAt).toLocaleDateString(),
    },
  
  ];

  return (
    <Box p={2}>
    <Header
         title="Facilities Table Details"
         description="You can check all details"
              buttonText="Add New Facilities"
          onButtonClick={handleAddRoom}
       />
      {loading ? (
        <Box
          display="flex"
          justifyContent="center"
          alignItems="center"
          minHeight="300px"
        >
          <CircularProgress />
        </Box>
      ) :
        <>

          <SharedTable
            columns={columns}
            rows={Facilities}
            totalResults={totalResults}
            currentPage={currentPage}
            itemsPerPage={itemsPerPage}
            onPageChange={(newPage) => setCurrentPage(newPage)}
            onPageSizeChange={(newSize) => setItemsPerPage(newSize)}
            onDelete={handleDelete}
            onView={handleView}
                onEdit={(row) => console.log("Edit", row)}
          />


          <ViewModel
            open={viewModalOpen}
            onClose={() => setViewModalOpen(false)}
            facilitie={selectedFacilities}
          
          />

        </>}
    </Box>
  );
}

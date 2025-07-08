import { useEffect, useState } from "react";
import { ADS_URL, axiosInstance } from "../../../../../services/Urls.ts";
import SharedTable from "../../../../../shared/SharedTable/SharedTable.tsx";
import { Box, CircularProgress } from "@mui/material";
import { toast } from "react-toastify";
import ViewModel from "../ViewAddModel/ViewModel.tsx";
import Header from "../../../../../shared/Header/Header.tsx";

export default function Ads() {
  const [Ads, setAds] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [viewModalOpen, setViewModalOpen] = useState(false);
  const [selectedAds, setSelectedAds] = useState<any>(null);

  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(5);
  const [totalResults, setTotalResults] = useState(0);

  const fetchAds = async (page = 1, size = 5) => {
    setLoading(true);
    try {
      const res = await axiosInstance.get(
        `${ADS_URL.GET_ads}?page=${page}&size=${size}`
      );
      const { ads, totalCount } = res.data.data;
      setAds(ads);
      setTotalResults(totalCount);
    } catch (err) {
      toast.error("Error fetching ad data");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (row: any) => {
    setLoading(true);
    try {
      let res = await axiosInstance.delete(ADS_URL.DELETE_ads(row._id));
      toast.success(res.data.message || "Ad deleted successfully");
      fetchAds(currentPage, itemsPerPage);
    } catch (error: any) {
      toast.error(error.response?.data?.message || "Error deleting ad");
    } finally {
      setLoading(false);
    }
  };

  const handleView = (row: any) => {
    setSelectedAds(row);
    setViewModalOpen(true);
  };

  useEffect(() => {
    fetchAds(currentPage, itemsPerPage);
  }, [currentPage, itemsPerPage]);

  const handleAddRoom = () => {
    console.log("Redirect to Add ad form");
  };

  const columns = [
    {
      id: "Room Number",
      label: "Room Number",
      align: "center" as const,
      render: (row: any) => row.room?.roomNumber,
    },
    {
      id: "Price",
      label: "Price",
      align: "center" as const,
      render: (row: any) => `$${row.room?.price}`,
    },
    {
      id: "Capacity",
      label: "Capacity",
      align: "center" as const,
      render: (row: any) => row.room?.capacity,
    },
    {
      id: "Created By",
      label: "Created By",
      align: "center" as const,
      render: (row: any) => row.createdBy?.userName,
    },
    {
      id: "Created At",
      label: "Created At",
      align: "center" as const,
      render: (row: any) => new Date(row.createdAt).toLocaleDateString(),
    },
  ];
  return (
    <Box p={2}>
      <Header
        title="ADS Table Details"
        description="You can check all details"
        buttonText="Add New Ads"
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
      ) : (
        <>
          <SharedTable
            columns={columns}
            rows={Ads}
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
            Ads={selectedAds}
          />
        </>
      )}
    </Box>
  );
}

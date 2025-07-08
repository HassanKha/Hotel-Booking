  import { useEffect, useState } from "react";
  import Header from "../../../../../shared/Header/Header.tsx";
  import SharedTable from "../../../../../shared/SharedTable/SharedTable.tsx";
  import { axiosInstance, ROOMS_URLS } from "../../../../../services/Urls.ts";
  import { CircularProgress, Box } from "@mui/material"; 
  import "./Rooms.css";
import Swal from "sweetalert2";
  
  const columns = [
    { id: "name", label: "Room Number" },
    {
      id: "image",
      label: "Image",
      render: (row: any) => (
        <img
          src={row.image || "/images/placeholder.jpg"}
          alt="Room"
          style={{
            width: 50,
            height: 50,
            objectFit: "cover",
            borderRadius: 4,
          }}
        />
      ),
    },
    { id: "price", label: "Price" },
    { id: "discount", label: "Discount" },
    { id: "capacity", label: "Capacity" },
    { id: "category", label: "Category" },
  ];

  export default function Rooms() {
    const [rows, setRows] = useState<any[]>([]);
    const [loading, setLoading] = useState<boolean>(true);

    const fetchRooms = async () => {
      try {
        const response = await axiosInstance.get(ROOMS_URLS.GET_ROOMS);

        const roomList = response.data?.data?.rooms;

        if (!Array.isArray(roomList)) {
          console.warn("Unexpected API format:", response.data);
          return;
        }

        interface Facility {
          name: string;
        }

        interface Room {
          roomNumber?: string;
          images?: string[];
          price?: number | string;
          discount?: number | string;
          capacity?: number | string;
          facilities?: Facility[];
        }
interface FormattedRoom {
  _id: string;
  name: string;
  image: string;
  price: number | string;
  discount: number | string;
  capacity: number | string;
  category: string;
}

const formatted: FormattedRoom[] = (roomList as any[]).map((room) => ({
  _id: room._id, 
  name: room.roomNumber || "N/A",
  image: room.images?.[0] || "",
  price: room.price || "N/A",
  discount: room.discount || "N/A",
  capacity: room.capacity || "N/A",
  category: room.facilities?.map((f) => f.name).join(", ") || "N/A",
}));


        setRows(formatted);
      } catch (error) {
        console.error("Error fetching room data:", error);
      } finally {
        setLoading(false);
      }
    };

    const handleDelete = async (row: any) => {
  const swalWithMuiButtons = Swal.mixin({
    customClass: {
      confirmButton: "swal2-confirm",
      cancelButton: "swal2-cancel",
    },
    buttonsStyling: false,
  });

  const result = await swalWithMuiButtons.fire({
    title: "Are you sure?",
    text: `This will permanently delete the room "${row.name}".`,
    icon: "warning",
    showCancelButton: true,
    confirmButtonText: "Delete",
    cancelButtonText: "Cancel",
    reverseButtons: true,
  });

  if (result.isConfirmed) {
    setLoading(true);
    try {
      await axiosInstance.delete(ROOMS_URLS.DELETE_ROOM(row._id));
      await fetchRooms();
      swalWithMuiButtons.fire({
        title: "Deleted!",
        text: `Room "${row.name}" has been deleted successfully.`,
        icon: "success",
        timer: 2000,
        showConfirmButton: false,
      });
    } catch (error: any) {
      swalWithMuiButtons.fire({
        title: "Error!",
        text: error.response?.data?.message || "Failed to delete the room.",
        icon: "error",
      });
    } finally {
      setLoading(false);
    }
  }
};


    const handleAddRoom = () => {
      console.log("Redirect to Add Room form");
    };

    useEffect(() => {
      fetchRooms();
    }, []);

    return (
      <div>
        <Header
          title="Rooms Table Details"
          description="You can check all details"
          buttonText="Add New Room"
          onButtonClick={handleAddRoom}
        />

        {loading ? (
          <Box display="flex" justifyContent="center" alignItems="center" mt={5}>
            <CircularProgress />
          </Box>
        ) : (
          <SharedTable
          // Under Development
            columns={columns}
            rows={rows}
            onView={(row) => console.log("View", row)}
            onEdit={(row) => console.log("Edit", row)}
            onDelete={handleDelete}
          />
        )}
      </div>
    );
  }

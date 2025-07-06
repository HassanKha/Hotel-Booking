
import Header from "../../../../../shared/Header/Header";

export default function Rooms() {
  const handleAddRoom = () => {
    
  };

  return (
    <div>
      <Header
        title="Rooms Table Details"
        description="You can check all details"
        buttonText="Add New Room"
        onButtonClick={handleAddRoom}
      />

      {/* Table shared Component */}
    </div>
  );
}
